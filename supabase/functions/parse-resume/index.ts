import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.74.0";
import pdfParse from "npm:pdf-parse@1.1.1";
import mammoth from "npm:mammoth@1.8.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const requestSchema = z.object({
  filePath: z.string().min(1).max(500),
});

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawBody = await req.json();
    
    // Validate request body
    const validationResult = requestSchema.safeParse(rawBody);
    if (!validationResult.success) {
      console.error('Validation error:', validationResult.error);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid request data',
          details: validationResult.error.errors 
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { filePath } = validationResult.data;
    console.log('Parsing resume from path:', filePath);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Download file from storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('talent-resumes')
      .download(filePath);

    if (downloadError) {
      console.error('Error downloading file:', downloadError);
      throw new Error(`Failed to download file: ${downloadError.message}`);
    }

    console.log('File downloaded successfully');

    // Convert to buffer
    const arrayBuffer = await fileData.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    
    // Validate file size
    if (buffer.length > MAX_FILE_SIZE) {
      return new Response(
        JSON.stringify({ error: `File size exceeds maximum allowed size of ${MAX_FILE_SIZE / 1024 / 1024}MB` }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Determine file type and extract text
    let resumeText = '';
    const fileExtension = filePath.toLowerCase().split('.').pop();

    if (fileExtension === 'pdf') {
      console.log('Parsing PDF file...');
      const pdfData = await pdfParse(buffer);
      resumeText = pdfData.text;
    } else if (fileExtension === 'docx') {
      console.log('Parsing DOCX file...');
      const result = await mammoth.extractRawText({ buffer });
      resumeText = result.value;
    } else {
      throw new Error('Unsupported file type. Please upload PDF or DOCX.');
    }

    console.log('Text extracted, length:', resumeText.length);

    if (!resumeText || resumeText.trim().length < 50) {
      throw new Error('Unable to extract meaningful text from resume');
    }

    // Call Lovable AI to parse the resume
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const systemPrompt = `You are a resume parser. Extract structured information from resumes and return it in JSON format. Be thorough and extract all relevant information.`;

    const userPrompt = `Extract the following information from this resume and return it as valid JSON:

{
  "personal_info": {
    "first_name": "",
    "last_name": "",
    "email": "",
    "phone": "",
    "linkedin_url": "",
    "location": ""
  },
  "summary_bio": "",
  "current_title": "",
  "current_company": "",
  "employment_history": [
    {
      "company_name": "",
      "title": "",
      "start_date": "YYYY-MM or YYYY",
      "end_date": "YYYY-MM or YYYY or Present",
      "is_current_role": false,
      "responsibilities_accomplishments": "",
      "team_size_managed": null
    }
  ],
  "education": [
    {
      "school": "",
      "degree": "",
      "graduation_year": ""
    }
  ],
  "certifications": [],
  "skills": [],
  "industries_worked_in": [],
  "functional_experience": [],
  "systems_experience": [],
  "technical_skills": ""
}

Resume text:
${resumeText}

Return ONLY valid JSON, no additional text or explanation.`;

    console.log('Calling Lovable AI for parsing...');

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your Lovable AI workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      throw new Error(`AI API error: ${errorText}`);
    }

    const aiData = await aiResponse.json();
    const parsedContent = aiData.choices[0].message.content;

    console.log('AI parsing complete');

    // Parse the JSON response
    let structuredData;
    try {
      // Extract JSON from response (in case AI wrapped it in markdown)
      const jsonMatch = parsedContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        structuredData = JSON.parse(jsonMatch[0]);
      } else {
        structuredData = JSON.parse(parsedContent);
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      console.log('AI response:', parsedContent);
      throw new Error('Failed to parse AI response as JSON');
    }

    console.log('Successfully parsed resume data');

    return new Response(
      JSON.stringify(structuredData),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in parse-resume function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error instanceof Error ? error.stack : undefined
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

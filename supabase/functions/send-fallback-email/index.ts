import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const requestSchema = z.object({
  name: z.string().max(200),
  email: z.string().email().max(255),
  message: z.string().max(5000).optional(),
  companyName: z.string().max(200).optional(),
  phone: z.string().max(50).optional(),
  type: z.enum(['candidate', 'projectlead', 'contact']),
});

const emailRequestSchema = z.object({
  type: z.enum(['projectlead', 'candidate']),
  data: z.object({
    name: z.string().max(200).optional(),
    email: z.string().email().max(255).optional(),
    companyName: z.string().max(200).optional(),
    phone: z.string().max(50).optional(),
  }),
});

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawBody = await req.json();
    
    // Validate request body
    const validationResult = emailRequestSchema.safeParse(rawBody);
    if (!validationResult.success) {
      console.error('Validation error:', validationResult.error);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid request data',
          details: validationResult.error.errors 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { type, data } = validationResult.data;

    let emailContent = '';
    let subject = '';

    if (type === 'projectlead') {
      subject = 'New Project Lead Submission (Webhook Failed)';
      emailContent = `
        <h2>New Project Lead Submission</h2>
        <p><strong>Note:</strong> This submission was sent via email because the primary webhook failed.</p>
        <p><strong>Name:</strong> ${escapeHtml(data.name || 'N/A')}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email || 'N/A')}</p>
        <p><strong>Company Name:</strong> ${escapeHtml(data.companyName || 'N/A')}</p>
        <p><strong>Phone:</strong> ${escapeHtml(data.phone || 'N/A')}</p>
      `;
    } else {
      subject = 'New Candidate Submission (Webhook Failed)';
      emailContent = `
        <h2>New Candidate Submission</h2>
        <p><strong>Note:</strong> This submission was sent via email because the primary webhook failed.</p>
        <p><strong>Name:</strong> ${escapeHtml(data.name || 'N/A')}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email || 'N/A')}</p>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "Kinetic Consulting <onboarding@resend.dev>",
      to: ["info@kineticconsultingpartners.com"],
      subject: subject,
      html: emailContent,
    });

    console.log("Fallback email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-fallback-email function:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email. Please try again." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  type: 'projectlead' | 'candidate';
  data: {
    name?: string;
    email?: string;
    companyName?: string;
    phone?: string;
  };
}

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
    const { type, data }: EmailRequest = await req.json();

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
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

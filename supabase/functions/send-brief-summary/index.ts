import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BriefSummaryRequest {
  briefData: any;
  recipientEmail: string;
  sendCopy: boolean;
  convertToJobDescription: boolean;
}

const escapeHtml = (text: string | null | undefined): string => {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const formatArray = (arr: string[] | null | undefined): string => {
  if (!arr || !Array.isArray(arr) || arr.length === 0) return 'Not specified';
  return arr.join(', ');
};

const generateBriefCopyHtml = (briefData: any): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #1a1a1a; border-bottom: 3px solid #0066cc; padding-bottom: 10px; }
          h2 { color: #0066cc; margin-top: 30px; border-bottom: 1px solid #e0e0e0; padding-bottom: 5px; }
          .field { margin: 15px 0; }
          .label { font-weight: 600; color: #555; }
          .value { margin-top: 5px; color: #1a1a1a; }
          .section { margin-bottom: 30px; }
        </style>
      </head>
      <body>
        <h1>Project Brief Summary</h1>
        
        <div class="section">
          <h2>Step 1: Company Profile</h2>
          <div class="field"><span class="label">Portfolio Company Name:</span><div class="value">${escapeHtml(briefData.portfolio_company_name)}</div></div>
          <div class="field"><span class="label">Company Location:</span><div class="value">${escapeHtml(briefData.company_location)}</div></div>
          <div class="field"><span class="label">Industry Sector:</span><div class="value">${escapeHtml(briefData.industry_sector)}</div></div>
          <div class="field"><span class="label">Company Size (Revenue):</span><div class="value">${escapeHtml(briefData.company_size_revenue)}</div></div>
          <div class="field"><span class="label">Company Size (Headcount):</span><div class="value">${escapeHtml(briefData.company_size_headcount)}</div></div>
          <div class="field"><span class="label">Company Type:</span><div class="value">${escapeHtml(briefData.company_type)}</div></div>
          ${briefData.pe_firm_name ? `<div class="field"><span class="label">PE Firm Name:</span><div class="value">${escapeHtml(briefData.pe_firm_name)}</div></div>` : ''}
          ${briefData.primary_pe_contact_name ? `<div class="field"><span class="label">Primary PE Contact:</span><div class="value">${escapeHtml(briefData.primary_pe_contact_name)} - ${escapeHtml(briefData.primary_pe_contact_title)}</div></div>` : ''}
          ${briefData.family_office_name ? `<div class="field"><span class="label">Family Office:</span><div class="value">${escapeHtml(briefData.family_office_name)} - ${escapeHtml(briefData.family_office_contact)}</div></div>` : ''}
        </div>

        <div class="section">
          <h2>Step 2: Requestor & Decision Maker</h2>
          <div class="field"><span class="label">Requestor:</span><div class="value">${escapeHtml(briefData.requestor_name)} - ${escapeHtml(briefData.requestor_title)}</div></div>
          <div class="field"><span class="label">Company:</span><div class="value">${escapeHtml(briefData.requestor_company)}</div></div>
          <div class="field"><span class="label">Email:</span><div class="value">${escapeHtml(briefData.requestor_email)}</div></div>
          <div class="field"><span class="label">Phone:</span><div class="value">${escapeHtml(briefData.requestor_phone)}</div></div>
          <div class="field"><span class="label">Relationship to Search:</span><div class="value">${escapeHtml(briefData.relationship_to_search)}</div></div>
          <div class="field"><span class="label">Decision Maker:</span><div class="value">${escapeHtml(briefData.decision_maker_name)} - ${escapeHtml(briefData.decision_maker_title)}</div></div>
        </div>

        <div class="section">
          <h2>Step 3: Nature of the Need</h2>
          <div class="field"><span class="label">Engagement Type:</span><div class="value">${escapeHtml(briefData.engagement_type)}</div></div>
          <div class="field"><span class="label">Role Title:</span><div class="value">${escapeHtml(briefData.role_title)}</div></div>
          <div class="field"><span class="label">Role Summary:</span><div class="value">${escapeHtml(briefData.role_summary)}</div></div>
          <div class="field"><span class="label">Engagement Triggers:</span><div class="value">${formatArray(briefData.engagement_trigger)}</div></div>
          <div class="field"><span class="label">Top Objectives:</span><div class="value">${briefData.top_objectives ? JSON.stringify(briefData.top_objectives) : 'Not specified'}</div></div>
          <div class="field"><span class="label">Success Metrics:</span><div class="value">${escapeHtml(briefData.success_metrics)}</div></div>
        </div>

        <div class="section">
          <h2>Step 4: Timing & Urgency</h2>
          <div class="field"><span class="label">Urgency Level:</span><div class="value">${escapeHtml(briefData.urgency_level)}</div></div>
          <div class="field"><span class="label">Target Start Date:</span><div class="value">${escapeHtml(briefData.target_start_date)}</div></div>
          <div class="field"><span class="label">Expected Duration:</span><div class="value">${escapeHtml(briefData.expected_duration)}</div></div>
          <div class="field"><span class="label">Hard End Date:</span><div class="value">${escapeHtml(briefData.hard_end_date)}</div></div>
        </div>

        <div class="section">
          <h2>Step 5: Reporting & Team Structure</h2>
          <div class="field"><span class="label">Reports To:</span><div class="value">${escapeHtml(briefData.reports_to_name)} - ${escapeHtml(briefData.reports_to_title)}</div></div>
          <div class="field"><span class="label">Board Interaction:</span><div class="value">${escapeHtml(briefData.board_interaction)}</div></div>
          <div class="field"><span class="label">Direct Reports:</span><div class="value">${escapeHtml(briefData.direct_reports)}</div></div>
          <div class="field"><span class="label">Key Stakeholders:</span><div class="value">${escapeHtml(briefData.key_stakeholders)}</div></div>
          <div class="field"><span class="label">Team Dynamics Notes:</span><div class="value">${escapeHtml(briefData.team_dynamics_notes)}</div></div>
        </div>

        <div class="section">
          <h2>Step 6: Experience Requirements</h2>
          <div class="field"><span class="label">Minimum Years Experience:</span><div class="value">${escapeHtml(briefData.years_experience_min)}</div></div>
          <div class="field"><span class="label">Industry Experience:</span><div class="value">${escapeHtml(briefData.industry_experience_required)} - ${escapeHtml(briefData.industry_experience_description)}</div></div>
          <div class="field"><span class="label">PE Experience:</span><div class="value">${escapeHtml(briefData.pe_experience)}</div></div>
          <div class="field"><span class="label">Functional Expertise:</span><div class="value">${formatArray(briefData.functional_expertise)}</div></div>
          <div class="field"><span class="label">Turnaround Experience:</span><div class="value">${escapeHtml(briefData.turnaround_experience)}</div></div>
          <div class="field"><span class="label">Change Management:</span><div class="value">${escapeHtml(briefData.change_management_experience)}</div></div>
          <div class="field"><span class="label">Interim Experience:</span><div class="value">${escapeHtml(briefData.interim_experience)}</div></div>
          <div class="field"><span class="label">Education:</span><div class="value">${escapeHtml(briefData.education_requirements)}</div></div>
          <div class="field"><span class="label">Certifications:</span><div class="value">${escapeHtml(briefData.certifications)}</div></div>
          <div class="field"><span class="label">Consulting Background:</span><div class="value">${escapeHtml(briefData.consulting_background)}</div></div>
          <div class="field"><span class="label">Public Company Experience:</span><div class="value">${escapeHtml(briefData.public_company_experience)}</div></div>
          <div class="field"><span class="label">Board Experience:</span><div class="value">${escapeHtml(briefData.board_experience)}</div></div>
        </div>

        <div class="section">
          <h2>Step 7: Work Model & Travel</h2>
          <div class="field"><span class="label">Primary Location:</span><div class="value">${escapeHtml(briefData.primary_location)}</div></div>
          <div class="field"><span class="label">Onsite Expectation:</span><div class="value">${escapeHtml(briefData.onsite_expectation)}</div></div>
          ${briefData.onsite_days_per_week ? `<div class="field"><span class="label">Onsite Days per Week:</span><div class="value">${escapeHtml(briefData.onsite_days_per_week)}</div></div>` : ''}
          <div class="field"><span class="label">Travel Requirement:</span><div class="value">${escapeHtml(briefData.travel_requirement_percent)}%</div></div>
          <div class="field"><span class="label">Travel Geography:</span><div class="value">${escapeHtml(briefData.travel_geography)}</div></div>
        </div>

        <div class="section">
          <h2>Step 8: Compensation</h2>
          <div class="field"><span class="label">Budget Range:</span><div class="value">${escapeHtml(briefData.budget_range)}</div></div>
          <div class="field"><span class="label">Compensation Model:</span><div class="value">${escapeHtml(briefData.compensation_model)}</div></div>
          <div class="field"><span class="label">Equity Component:</span><div class="value">${escapeHtml(briefData.equity_component)}</div></div>
          ${briefData.equity_notes ? `<div class="field"><span class="label">Equity Notes:</span><div class="value">${escapeHtml(briefData.equity_notes)}</div></div>` : ''}
          <div class="field"><span class="label">Success Fee:</span><div class="value">${escapeHtml(briefData.success_fee)}</div></div>
          <div class="field"><span class="label">Expense Policy:</span><div class="value">${escapeHtml(briefData.expense_policy)}</div></div>
        </div>

        <div class="section">
          <h2>Step 9: Process Expectations</h2>
          <div class="field"><span class="label">Interview Steps:</span><div class="value">${escapeHtml(briefData.interview_steps)}</div></div>
          <div class="field"><span class="label">Target Decision Date:</span><div class="value">${escapeHtml(briefData.target_decision_date)}</div></div>
          <div class="field"><span class="label">References Required:</span><div class="value">${escapeHtml(briefData.references_required)}</div></div>
          <div class="field"><span class="label">Background Check:</span><div class="value">${escapeHtml(briefData.background_check_required)}</div></div>
          ${briefData.background_check_details ? `<div class="field"><span class="label">Background Check Details:</span><div class="value">${escapeHtml(briefData.background_check_details)}</div></div>` : ''}
          <div class="field"><span class="label">Confidentiality Level:</span><div class="value">${escapeHtml(briefData.confidentiality_level)}</div></div>
          <div class="field"><span class="label">Permanent Conversion:</span><div class="value">${escapeHtml(briefData.permanent_conversion)}</div></div>
        </div>
      </body>
    </html>
  `;
};

const generateJobDescriptionHtml = (briefData: any): string => {
  const objectives = briefData.top_objectives || [];
  const objectivesHtml = Array.isArray(objectives) 
    ? objectives.map((obj: any, idx: number) => `<li>${escapeHtml(obj.objective || obj)}</li>`).join('')
    : '';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #1a1a1a; border-bottom: 3px solid #0066cc; padding-bottom: 10px; }
          h2 { color: #0066cc; margin-top: 25px; }
          ul { margin-left: 20px; }
          li { margin: 10px 0; }
          .company-info { background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <h1>${escapeHtml(briefData.role_title)}</h1>
        
        <div class="company-info">
          <strong>${escapeHtml(briefData.portfolio_company_name)}</strong><br/>
          ${escapeHtml(briefData.company_location)}<br/>
          ${escapeHtml(briefData.industry_sector)}
        </div>

        <h2>Position Overview</h2>
        <p>${escapeHtml(briefData.role_summary)}</p>
        
        <h2>Engagement Type</h2>
        <p>${escapeHtml(briefData.engagement_type)}</p>
        
        <h2>Key Objectives</h2>
        <ul>${objectivesHtml}</ul>
        
        <h2>Success Metrics</h2>
        <p>${escapeHtml(briefData.success_metrics)}</p>
        
        <h2>Required Experience & Qualifications</h2>
        <ul>
          <li><strong>Years of Experience:</strong> ${escapeHtml(briefData.years_experience_min)}+ years</li>
          <li><strong>Industry Experience:</strong> ${escapeHtml(briefData.industry_experience_required)} ${briefData.industry_experience_description ? `- ${escapeHtml(briefData.industry_experience_description)}` : ''}</li>
          <li><strong>PE Experience:</strong> ${escapeHtml(briefData.pe_experience)}</li>
          <li><strong>Functional Expertise:</strong> ${formatArray(briefData.functional_expertise)}</li>
          <li><strong>Turnaround Experience:</strong> ${escapeHtml(briefData.turnaround_experience)}</li>
          <li><strong>Change Management:</strong> ${escapeHtml(briefData.change_management_experience)}</li>
          <li><strong>Interim Experience:</strong> ${escapeHtml(briefData.interim_experience)}</li>
          <li><strong>Education:</strong> ${escapeHtml(briefData.education_requirements)}</li>
          ${briefData.certifications ? `<li><strong>Certifications:</strong> ${escapeHtml(briefData.certifications)}</li>` : ''}
          <li><strong>Consulting Background:</strong> ${escapeHtml(briefData.consulting_background)}</li>
          <li><strong>Public Company Experience:</strong> ${escapeHtml(briefData.public_company_experience)}</li>
          <li><strong>Board Experience:</strong> ${escapeHtml(briefData.board_experience)}</li>
        </ul>
        
        <h2>Reporting Structure</h2>
        <p><strong>Reports To:</strong> ${escapeHtml(briefData.reports_to_name)}, ${escapeHtml(briefData.reports_to_title)}</p>
        <p><strong>Board Interaction:</strong> ${escapeHtml(briefData.board_interaction)}</p>
        ${briefData.direct_reports ? `<p><strong>Direct Reports:</strong> ${escapeHtml(briefData.direct_reports)}</p>` : ''}
        
        <h2>Work Location & Travel</h2>
        <p><strong>Primary Location:</strong> ${escapeHtml(briefData.primary_location)}</p>
        <p><strong>Onsite Expectation:</strong> ${escapeHtml(briefData.onsite_expectation)}</p>
        ${briefData.onsite_days_per_week ? `<p><strong>Onsite Days:</strong> ${escapeHtml(briefData.onsite_days_per_week)} days per week</p>` : ''}
        <p><strong>Travel Required:</strong> ${escapeHtml(briefData.travel_requirement_percent)}%</p>
        ${briefData.travel_geography ? `<p><strong>Travel Geography:</strong> ${escapeHtml(briefData.travel_geography)}</p>` : ''}
        
        <h2>Compensation & Benefits</h2>
        <p><strong>Budget Range:</strong> ${escapeHtml(briefData.budget_range)}</p>
        <p><strong>Compensation Model:</strong> ${escapeHtml(briefData.compensation_model)}</p>
        <p><strong>Equity Component:</strong> ${escapeHtml(briefData.equity_component)}</p>
        ${briefData.equity_notes ? `<p><strong>Equity Details:</strong> ${escapeHtml(briefData.equity_notes)}</p>` : ''}
        ${briefData.success_fee ? `<p><strong>Success Fee:</strong> ${escapeHtml(briefData.success_fee)}</p>` : ''}
        
        <h2>Timeline</h2>
        <p><strong>Target Start Date:</strong> ${escapeHtml(briefData.target_start_date)}</p>
        <p><strong>Expected Duration:</strong> ${escapeHtml(briefData.expected_duration)}</p>
        <p><strong>Urgency:</strong> ${escapeHtml(briefData.urgency_level)}</p>
        
        <h2>Application Process</h2>
        <p>${escapeHtml(briefData.interview_steps)}</p>
        <p><strong>Target Decision Date:</strong> ${escapeHtml(briefData.target_decision_date)}</p>
        <p><strong>References Required:</strong> ${escapeHtml(briefData.references_required)}</p>
        <p><strong>Background Check:</strong> ${escapeHtml(briefData.background_check_required)}</p>
      </body>
    </html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { briefData, recipientEmail, sendCopy, convertToJobDescription }: BriefSummaryRequest = await req.json();

    console.log("Sending brief summary emails:", { recipientEmail, sendCopy, convertToJobDescription });

    const emails = [];

    if (sendCopy) {
      emails.push({
        from: "Kinetic <onboarding@resend.dev>",
        to: [recipientEmail],
        subject: `Project Brief Copy - ${briefData.role_title}`,
        html: generateBriefCopyHtml(briefData),
      });
    }

    if (convertToJobDescription) {
      emails.push({
        from: "Kinetic <onboarding@resend.dev>",
        to: [recipientEmail],
        subject: `Job Description - ${briefData.role_title}`,
        html: generateJobDescriptionHtml(briefData),
      });
    }

    const results = await Promise.all(
      emails.map(email => resend.emails.send(email))
    );

    console.log("Emails sent successfully:", results);

    return new Response(JSON.stringify({ success: true, results }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-brief-summary function:", error);
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

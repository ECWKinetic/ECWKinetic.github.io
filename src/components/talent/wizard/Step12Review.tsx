import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TalentProfileData } from '@/types/talentProfile';
import { format } from 'date-fns';

interface Step12ReviewProps {
  data: TalentProfileData;
  onEditStep: (step: number) => void;
}

export const Step12Review = ({ data, onEditStep }: Step12ReviewProps) => {
  const EditButton = ({ step }: { step: number }) => (
    <button
      type="button"
      onClick={() => onEditStep(step)}
      className="text-sm text-primary hover:underline"
    >
      Edit
    </button>
  );

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Review Your Profile</h2>
            <p className="text-muted-foreground mt-1">
              Please review all information before submitting
            </p>
          </div>

          {/* Personal Information */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Personal Information</h3>
              <EditButton step={2} />
            </div>
            <div className="bg-muted/30 rounded-lg p-4 space-y-2 text-sm">
              <p><strong>Name:</strong> {data.full_name}</p>
              <p><strong>Email:</strong> {data.email}</p>
              <p><strong>Phone:</strong> {data.phone}</p>
              <p><strong>Location:</strong> {data.location}</p>
              {data.linkedin_url && <p><strong>LinkedIn:</strong> {data.linkedin_url}</p>}
            </div>
          </div>

          <Separator />

          {/* Professional Summary */}
          {data.bio && (
            <>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Professional Summary</h3>
                  <EditButton step={3} />
                </div>
                <div className="bg-muted/30 rounded-lg p-4 text-sm">
                  <p className="whitespace-pre-wrap">{data.bio}</p>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Employment History */}
          {data.employment_history.length > 0 && (
            <>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Employment History ({data.employment_history.length})</h3>
                  <EditButton step={4} />
                </div>
                <div className="space-y-2">
                  {data.employment_history.map((job, i) => (
                    <div key={i} className="bg-muted/30 rounded-lg p-4 text-sm">
                      <p className="font-medium">{job.title} at {job.company_name}</p>
                      <p className="text-muted-foreground">
                        {job.start_date} - {job.is_current_role ? 'Present' : job.end_date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Education ({data.education.length})</h3>
                  <EditButton step={5} />
                </div>
                <div className="space-y-2">
                  {data.education.map((edu, i) => (
                    <div key={i} className="bg-muted/30 rounded-lg p-4 text-sm">
                      <p className="font-medium">{edu.degree}</p>
                      <p className="text-muted-foreground">{edu.school} {edu.graduation_year && `• ${edu.graduation_year}`}</p>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Skills ({data.skills.length})</h3>
                  <EditButton step={6} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, i) => (
                    <Badge key={i} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Certifications ({data.certifications.length})</h3>
                  <EditButton step={7} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.certifications.filter(c => c.trim()).map((cert, i) => (
                    <Badge key={i} variant="outline">{cert}</Badge>
                  ))}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Industry Experience */}
          {data.industry_experience.length > 0 && (
            <>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Industry Experience ({data.industry_experience.length})</h3>
                  <EditButton step={8} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.industry_experience.map((ind, i) => (
                    <Badge key={i} variant="secondary">{ind}</Badge>
                  ))}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Functional Expertise */}
          {data.functional_expertise.length > 0 && (
            <>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Functional Expertise ({data.functional_expertise.length})</h3>
                  <EditButton step={9} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.functional_expertise.map((func, i) => (
                    <Badge key={i} variant="secondary">{func}</Badge>
                  ))}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Consulting & PE Experience */}
          {(data.consulting_firms?.length > 0 || data.pe_portfolio_years || data.pe_board_experience) && (
            <>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Consulting & Private Equity Experience</h3>
                  <EditButton step={10} />
                </div>
                <div className="bg-muted/30 rounded-lg p-4 space-y-2 text-sm">
                  {data.consulting_firms && data.consulting_firms.length > 0 && (
                    <div>
                      <p className="font-medium mb-2">Consulting Firms:</p>
                      <div className="flex flex-wrap gap-2">
                        {data.consulting_firms.map((firm, i) => (
                          <Badge key={i} variant="secondary">{firm}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {data.consulting_years_experience && <p><strong>Consulting Experience:</strong> {data.consulting_years_experience} years</p>}
                  {data.consulting_highest_title && <p><strong>Highest Consulting Title:</strong> {data.consulting_highest_title}</p>}
                  {data.pe_portfolio_years && <p><strong>PE Portfolio Years:</strong> {data.pe_portfolio_years}</p>}
                  {data.pe_board_experience && <p><strong>Board Experience:</strong> {data.pe_board_experience}</p>}
                  {data.pe_engagement_types && data.pe_engagement_types.length > 0 && (
                    <div>
                      <p className="font-medium mb-2">PE Engagement Types:</p>
                      <div className="flex flex-wrap gap-2">
                        {data.pe_engagement_types.map((type, i) => (
                          <Badge key={i} variant="outline">{type}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Availability */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Availability & Preferences</h3>
              <EditButton step={11} />
            </div>
            <div className="bg-muted/30 rounded-lg p-4 space-y-2 text-sm">
              {data.experience_years && <p><strong>Experience:</strong> {data.experience_years} years</p>}
              {data.availability && <p><strong>Availability:</strong> {data.availability}</p>}
              {data.preferred_engagement.length > 0 && (
                <div>
                  <p className="font-medium mb-2">Preferred Engagements:</p>
                  <div className="flex flex-wrap gap-2">
                    {data.preferred_engagement.map((eng, i) => (
                      <Badge key={i} variant="outline">{eng}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

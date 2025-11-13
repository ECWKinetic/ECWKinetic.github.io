import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { TalentProfileData } from '@/types/talentProfile';
import { CONSULTING_FIRMS_OPTIONS, PE_ENGAGEMENT_OPTIONS } from '@/types/talentProfile';

interface Step10ConsultingPEProps {
  data: TalentProfileData;
  onChange: (field: keyof TalentProfileData, value: any) => void;
}

export const Step10ConsultingPE = ({ data, onChange }: Step10ConsultingPEProps) => {
  const handleConsultingFirmToggle = (firm: string) => {
    const currentFirms = data.consulting_firms || [];
    const updatedFirms = currentFirms.includes(firm)
      ? currentFirms.filter(f => f !== firm)
      : [...currentFirms, firm];
    onChange('consulting_firms', updatedFirms);
  };

  const handlePEEngagementToggle = (engagement: string) => {
    const currentEngagements = data.pe_engagement_types || [];
    const updatedEngagements = currentEngagements.includes(engagement)
      ? currentEngagements.filter(e => e !== engagement)
      : [...currentEngagements, engagement];
    onChange('pe_engagement_types', updatedEngagements);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Consulting & Private Equity Experience</h2>
        <p className="text-muted-foreground">
          Share your consulting and private equity background
        </p>
      </div>

      {/* Consulting Experience Section */}
      <Card>
        <CardHeader>
          <CardTitle>Consulting Experience</CardTitle>
          <CardDescription>Select the consulting firms you've worked with</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base mb-3 block">Consulting Firms</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CONSULTING_FIRMS_OPTIONS.map((firm) => (
                <div key={firm} className="flex items-center space-x-2">
                  <Checkbox
                    id={`consulting-${firm}`}
                    checked={data.consulting_firms?.includes(firm)}
                    onCheckedChange={() => handleConsultingFirmToggle(firm)}
                  />
                  <label
                    htmlFor={`consulting-${firm}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {firm}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {data.consulting_firms?.includes('Other') && (
            <div>
              <Label htmlFor="consulting-other">Other Consulting Firm</Label>
              <Input
                id="consulting-other"
                value={data.consulting_firms_other || ''}
                onChange={(e) => onChange('consulting_firms_other', e.target.value)}
                placeholder="Enter consulting firm name"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="consulting-years">Total Years in Consulting</Label>
              <Input
                id="consulting-years"
                type="number"
                min="0"
                step="0.5"
                value={data.consulting_years_experience || ''}
                onChange={(e) => onChange('consulting_years_experience', e.target.value ? parseFloat(e.target.value) : null)}
                placeholder="e.g., 5"
              />
            </div>

            <div>
              <Label htmlFor="consulting-title">Highest Title in Consulting</Label>
              <Input
                id="consulting-title"
                value={data.consulting_highest_title || ''}
                onChange={(e) => onChange('consulting_highest_title', e.target.value)}
                placeholder="e.g., Partner, Principal"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Private Equity Experience Section */}
      <Card>
        <CardHeader>
          <CardTitle>Private Equity Experience</CardTitle>
          <CardDescription>Detail your experience working with PE-backed companies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="pe-portfolio-years">Years in PE Portfolio Company Roles</Label>
            <Input
              id="pe-portfolio-years"
              type="number"
              min="0"
              step="0.5"
              value={data.pe_portfolio_years || ''}
              onChange={(e) => onChange('pe_portfolio_years', e.target.value ? parseFloat(e.target.value) : null)}
              placeholder="e.g., 3"
            />
          </div>

          <div>
            <Label htmlFor="pe-board-experience">Board Reporting Experience</Label>
            <Textarea
              id="pe-board-experience"
              value={data.pe_board_experience || ''}
              onChange={(e) => onChange('pe_board_experience', e.target.value)}
              placeholder="Describe your experience reporting to boards (e.g., reported to board monthly, prepared board decks, presented quarterly results)"
              rows={3}
            />
          </div>

          <div>
            <Label className="text-base mb-3 block">Types of PE Engagements</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PE_ENGAGEMENT_OPTIONS.map((engagement) => (
                <div key={engagement} className="flex items-center space-x-2">
                  <Checkbox
                    id={`pe-${engagement}`}
                    checked={data.pe_engagement_types?.includes(engagement)}
                    onCheckedChange={() => handlePEEngagementToggle(engagement)}
                  />
                  <label
                    htmlFor={`pe-${engagement}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {engagement}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="pe-description">PE Portfolio Experience Description</Label>
            <Textarea
              id="pe-description"
              value={data.pe_portfolio_experience_description || ''}
              onChange={(e) => onChange('pe_portfolio_experience_description', e.target.value)}
              placeholder="Describe your experience working in PE-backed companies, value creation initiatives, exit strategies, etc."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

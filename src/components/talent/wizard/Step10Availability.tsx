import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiSelectCheckboxes } from '@/components/talent/MultiSelectCheckboxes';
import { TalentProfileData, ENGAGEMENT_OPTIONS } from '@/types/talentProfile';

interface Step10AvailabilityProps {
  data: TalentProfileData;
  onChange: (field: keyof TalentProfileData, value: any) => void;
}

export const Step10Availability = ({ data, onChange }: Step10AvailabilityProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Availability & Preferences</h2>
            <p className="text-muted-foreground mt-1">
              Help us understand your availability and preferences
            </p>
          </div>

          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="experience_years">Years of Experience</Label>
                <Input
                  id="experience_years"
                  type="number"
                  min="0"
                  max="50"
                  value={data.experience_years || ''}
                  onChange={(e) => onChange('experience_years', e.target.value ? parseInt(e.target.value) : null)}
                  placeholder="e.g., 15"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Current Availability</Label>
                <Input
                  id="availability"
                  value={data.availability || ''}
                  onChange={(e) => onChange('availability', e.target.value)}
                  placeholder="e.g., Immediate, 2 weeks notice, 1 month"
                />
              </div>
            </div>

            <MultiSelectCheckboxes
              label="Preferred Engagement Types"
              options={ENGAGEMENT_OPTIONS}
              selected={data.preferred_engagement}
              onChange={(selected) => onChange('preferred_engagement', selected)}
              columns={2}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

import { Card, CardContent } from '@/components/ui/card';
import { MultiSelectCheckboxes } from '@/components/talent/MultiSelectCheckboxes';
import { TalentProfileData, INDUSTRY_OPTIONS } from '@/types/talentProfile';

interface Step8IndustryProps {
  data: TalentProfileData;
  onChange: (field: keyof TalentProfileData, value: any) => void;
  aiFilledOptions?: string[];
}

export const Step8Industry = ({ data, onChange, aiFilledOptions }: Step8IndustryProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Industry Experience</h2>
            <p className="text-muted-foreground mt-1">
              Select industries where you have experience
            </p>
          </div>

          <MultiSelectCheckboxes
            label="Industries"
            options={INDUSTRY_OPTIONS}
            selected={data.industry_experience}
            onChange={(selected) => onChange('industry_experience', selected)}
            columns={3}
            aiFilledOptions={aiFilledOptions}
          />
        </div>
      </CardContent>
    </Card>
  );
};

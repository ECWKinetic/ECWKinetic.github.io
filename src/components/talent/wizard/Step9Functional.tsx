import { Card, CardContent } from '@/components/ui/card';
import { MultiSelectCheckboxes } from '@/components/talent/MultiSelectCheckboxes';
import { TalentProfileData, FUNCTIONAL_EXPERTISE_OPTIONS } from '@/types/talentProfile';

interface Step9FunctionalProps {
  data: TalentProfileData;
  onChange: (field: keyof TalentProfileData, value: any) => void;
  aiFilledOptions?: string[];
}

export const Step9Functional = ({ data, onChange, aiFilledOptions }: Step9FunctionalProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Functional Expertise</h2>
            <p className="text-muted-foreground mt-1">
              Select your areas of functional expertise
            </p>
          </div>

          <MultiSelectCheckboxes
            label="Functional Areas"
            options={FUNCTIONAL_EXPERTISE_OPTIONS}
            selected={data.functional_expertise}
            onChange={(selected) => onChange('functional_expertise', selected)}
            columns={2}
            aiFilledOptions={aiFilledOptions}
          />
        </div>
      </CardContent>
    </Card>
  );
};

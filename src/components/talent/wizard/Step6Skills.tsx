import { Card, CardContent } from '@/components/ui/card';
import { MultiSelectCheckboxes } from '@/components/talent/MultiSelectCheckboxes';
import { TalentProfileData, SKILLS_OPTIONS } from '@/types/talentProfile';

interface Step6SkillsProps {
  data: TalentProfileData;
  onChange: (field: keyof TalentProfileData, value: any) => void;
  aiFilledOptions?: string[];
}

export const Step6Skills = ({ data, onChange, aiFilledOptions }: Step6SkillsProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Skills & Expertise</h2>
            <p className="text-muted-foreground mt-1">
              Select all that apply to your skillset
            </p>
          </div>

          <MultiSelectCheckboxes
            label="Professional Skills"
            options={SKILLS_OPTIONS}
            selected={data.skills}
            onChange={(selected) => onChange('skills', selected)}
            columns={2}
            aiFilledOptions={aiFilledOptions}
          />
        </div>
      </CardContent>
    </Card>
  );
};

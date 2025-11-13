import { Card, CardContent } from '@/components/ui/card';
import { EducationRepeater } from '@/components/talent/EducationRepeater';
import { TalentProfileData } from '@/types/talentProfile';

interface Step5EducationProps {
  data: TalentProfileData;
  onChange: (field: keyof TalentProfileData, value: any) => void;
  aiFilledIds?: string[];
}

export const Step5Education = ({ data, onChange, aiFilledIds }: Step5EducationProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Education</h2>
            <p className="text-muted-foreground mt-1">
              Add your educational background
            </p>
          </div>

          <EducationRepeater
            entries={data.education}
            onChange={(entries) => onChange('education', entries)}
            aiFilledIds={aiFilledIds}
          />
        </div>
      </CardContent>
    </Card>
  );
};

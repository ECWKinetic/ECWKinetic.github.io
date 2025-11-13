import { Card, CardContent } from '@/components/ui/card';
import { EmploymentHistoryRepeater, EmploymentEntry } from '@/components/talent/EmploymentHistoryRepeater';
import { TalentProfileData } from '@/types/talentProfile';

interface Step4EmploymentProps {
  data: TalentProfileData;
  onChange: (field: keyof TalentProfileData, value: any) => void;
  aiFilledIds?: string[];
}

export const Step4Employment = ({ data, onChange, aiFilledIds }: Step4EmploymentProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Employment History</h2>
            <p className="text-muted-foreground mt-1">
              Add your professional experience
            </p>
          </div>

          <EmploymentHistoryRepeater
            entries={data.employment_history}
            onChange={(entries) => onChange('employment_history', entries)}
            aiFilledIds={aiFilledIds}
          />
        </div>
      </CardContent>
    </Card>
  );
};

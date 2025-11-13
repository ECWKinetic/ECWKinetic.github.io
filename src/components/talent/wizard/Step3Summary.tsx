import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { TalentProfileData } from '@/types/talentProfile';

interface Step3SummaryProps {
  data: TalentProfileData;
  onChange: (field: keyof TalentProfileData, value: any) => void;
}

export const Step3Summary = ({ data, onChange }: Step3SummaryProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Professional Summary</h2>
            <p className="text-muted-foreground mt-1">
              Share a brief overview of your experience and expertise
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Professional Bio</Label>
            <Textarea
              id="bio"
              value={data.bio || ''}
              onChange={(e) => onChange('bio', e.target.value)}
              placeholder="Describe your professional background, key achievements, and areas of expertise..."
              rows={8}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              {data.bio?.length || 0} characters
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

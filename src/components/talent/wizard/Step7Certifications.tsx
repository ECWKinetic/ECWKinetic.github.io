import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { TalentProfileData } from '@/types/talentProfile';

interface Step7CertificationsProps {
  data: TalentProfileData;
  onChange: (field: keyof TalentProfileData, value: any) => void;
}

export const Step7Certifications = ({ data, onChange }: Step7CertificationsProps) => {
  const addCertification = () => {
    onChange('certifications', [...data.certifications, '']);
  };

  const removeCertification = (index: number) => {
    onChange('certifications', data.certifications.filter((_, i) => i !== index));
  };

  const updateCertification = (index: number, value: string) => {
    const updated = [...data.certifications];
    updated[index] = value;
    onChange('certifications', updated);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Certifications</h2>
            <p className="text-muted-foreground mt-1">
              List any professional certifications or credentials
            </p>
          </div>

          <div className="space-y-4">
            {data.certifications.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">
                No certifications added yet. Click "Add Certification" to start.
              </p>
            )}

            {data.certifications.map((cert, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`cert-${index}`}>Certification {index + 1}</Label>
                  <Input
                    id={`cert-${index}`}
                    value={cert}
                    onChange={(e) => updateCertification(index, e.target.value)}
                    placeholder="e.g., CFA, PMP, CPA, Six Sigma Black Belt"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCertification(index)}
                  className="mt-8 text-destructive hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addCertification}
              className="w-full gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Certification
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

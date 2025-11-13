import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TalentProfileData } from '@/types/talentProfile';

interface Step2PersonalInfoProps {
  data: TalentProfileData;
  onChange: (field: keyof TalentProfileData, value: any) => void;
}

export const Step2PersonalInfo = ({ data, onChange }: Step2PersonalInfoProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Personal Information</h2>
            <p className="text-muted-foreground mt-1">
              Tell us about yourself
            </p>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                value={data.full_name}
                onChange={(e) => onChange('full_name', e.target.value)}
                placeholder="John Doe"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => onChange('email', e.target.value)}
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={data.phone}
                  onChange={(e) => onChange('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={data.location}
                onChange={(e) => onChange('location', e.target.value)}
                placeholder="New York, NY"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin_url">LinkedIn URL</Label>
              <Input
                id="linkedin_url"
                type="url"
                value={data.linkedin_url || ''}
                onChange={(e) => onChange('linkedin_url', e.target.value)}
                placeholder="https://linkedin.com/in/your-profile"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

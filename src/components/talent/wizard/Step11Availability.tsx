import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiSelectCheckboxes } from '@/components/talent/MultiSelectCheckboxes';
import { TalentProfileData, ENGAGEMENT_OPTIONS } from '@/types/talentProfile';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface Step11AvailabilityProps {
  data: TalentProfileData;
  onChange: (field: keyof TalentProfileData, value: any) => void;
}

export const Step11Availability = ({ data, onChange }: Step11AvailabilityProps) => {
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
                <Label htmlFor="availability">Available Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !data.availability && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {data.availability ? format(new Date(data.availability), "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={data.availability ? new Date(data.availability) : undefined}
                      onSelect={(date) => onChange('availability', date ? date.toISOString() : null)}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
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

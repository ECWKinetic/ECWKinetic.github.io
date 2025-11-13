import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { normalizeRepeaterData } from '@/lib/repeaterUtils';
import { useMemo } from 'react';

export interface EmploymentEntry {
  id: string;
  company_name: string;
  title: string;
  start_date: string;
  end_date: string;
  is_current_role: boolean;
  responsibilities_accomplishments: string;
  team_size_managed: number | null;
}

interface EmploymentHistoryRepeaterProps {
  entries: EmploymentEntry[];
  onChange: (entries: EmploymentEntry[]) => void;
  aiFilledIds?: string[];
}

export const EmploymentHistoryRepeater = ({ 
  entries, 
  onChange,
  aiFilledIds = []
}: EmploymentHistoryRepeaterProps) => {
  // Ensure all entries have unique IDs
  const normalizedEntries = useMemo(() => normalizeRepeaterData(entries), [entries]);
  
  const handleAdd = () => {
    const newEntry: EmploymentEntry = {
      id: crypto.randomUUID(),
      company_name: '',
      title: '',
      start_date: '',
      end_date: '',
      is_current_role: false,
      responsibilities_accomplishments: '',
      team_size_managed: null,
    };
    onChange([...entries, newEntry]);
  };

  const handleRemove = (id: string) => {
    onChange(normalizedEntries.filter(entry => entry.id !== id));
  };

  const handleUpdate = (id: string, field: keyof EmploymentEntry, value: any) => {
    onChange(normalizedEntries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">Employment History</Label>
        <Button type="button" onClick={handleAdd} size="sm" variant="outline" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Position
        </Button>
      </div>

      {normalizedEntries.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">
          No employment history added yet. Click "Add Position" to start.
        </p>
      )}

      {normalizedEntries.map((entry, index) => (
        <Card key={entry.id} className="p-4 bg-muted/20 relative">
          {aiFilledIds.includes(entry.id) && (
            <div className="absolute top-2 right-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
              AI Pre-filled
            </div>
          )}
          
          <div className="flex items-start justify-between mb-4">
            <h4 className="font-semibold text-foreground">Position {index + 1}</h4>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleRemove(entry.id)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`company-${entry.id}`}>Company Name *</Label>
                <Input
                  id={`company-${entry.id}`}
                  value={entry.company_name}
                  onChange={(e) => handleUpdate(entry.id, 'company_name', e.target.value)}
                  placeholder="Acme Inc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`title-${entry.id}`}>Job Title *</Label>
                <Input
                  id={`title-${entry.id}`}
                  value={entry.title}
                  onChange={(e) => handleUpdate(entry.id, 'title', e.target.value)}
                  placeholder="Senior Manager"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`start-${entry.id}`}>Start Date *</Label>
                <Input
                  id={`start-${entry.id}`}
                  type="month"
                  value={entry.start_date}
                  onChange={(e) => handleUpdate(entry.id, 'start_date', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`end-${entry.id}`}>End Date</Label>
                <Input
                  id={`end-${entry.id}`}
                  type="month"
                  value={entry.end_date}
                  onChange={(e) => handleUpdate(entry.id, 'end_date', e.target.value)}
                  disabled={entry.is_current_role}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`team-${entry.id}`}>Team Size</Label>
                <Input
                  id={`team-${entry.id}`}
                  type="number"
                  min="0"
                  value={entry.team_size_managed || ''}
                  onChange={(e) => handleUpdate(entry.id, 'team_size_managed', e.target.value ? parseInt(e.target.value) : null)}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id={`current-${entry.id}`}
                checked={entry.is_current_role}
                onCheckedChange={(checked) => {
                  handleUpdate(entry.id, 'is_current_role', checked);
                  if (checked) {
                    handleUpdate(entry.id, 'end_date', '');
                  }
                }}
              />
              <Label htmlFor={`current-${entry.id}`} className="font-normal cursor-pointer">
                I currently work here
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`responsibilities-${entry.id}`}>Key Responsibilities & Accomplishments</Label>
              <Textarea
                id={`responsibilities-${entry.id}`}
                value={entry.responsibilities_accomplishments}
                onChange={(e) => handleUpdate(entry.id, 'responsibilities_accomplishments', e.target.value)}
                placeholder="Describe your key responsibilities and notable accomplishments..."
                rows={4}
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

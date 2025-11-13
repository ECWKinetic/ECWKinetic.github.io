import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { normalizeRepeaterData } from '@/lib/repeaterUtils';
import { useMemo } from 'react';

export interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  graduation_year: string;
}

interface EducationRepeaterProps {
  entries: EducationEntry[];
  onChange: (entries: EducationEntry[]) => void;
  aiFilledIds?: string[];
}

export const EducationRepeater = ({ 
  entries, 
  onChange,
  aiFilledIds = []
}: EducationRepeaterProps) => {
  // Ensure all entries have unique IDs
  const normalizedEntries = useMemo(() => normalizeRepeaterData(entries), [entries]);
  
  const handleAdd = () => {
    const newEntry: EducationEntry = {
      id: crypto.randomUUID(),
      school: '',
      degree: '',
      graduation_year: '',
    };
    onChange([...entries, newEntry]);
  };

  const handleRemove = (id: string) => {
    onChange(normalizedEntries.filter(entry => entry.id !== id));
  };

  const handleUpdate = (id: string, field: keyof EducationEntry, value: string) => {
    onChange(normalizedEntries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">Education</Label>
        <Button type="button" onClick={handleAdd} size="sm" variant="outline" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Education
        </Button>
      </div>

      {normalizedEntries.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">
          No education added yet. Click "Add Education" to start.
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
            <h4 className="font-semibold text-foreground">Education {index + 1}</h4>
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
            <div className="space-y-2">
              <Label htmlFor={`school-${entry.id}`}>School/Institution *</Label>
              <Input
                id={`school-${entry.id}`}
                value={entry.school}
                onChange={(e) => handleUpdate(entry.id, 'school', e.target.value)}
                placeholder="Harvard University"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`degree-${entry.id}`}>Degree *</Label>
                <Input
                  id={`degree-${entry.id}`}
                  value={entry.degree}
                  onChange={(e) => handleUpdate(entry.id, 'degree', e.target.value)}
                  placeholder="MBA, Bachelor's in Engineering, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`year-${entry.id}`}>Graduation Year</Label>
                <Input
                  id={`year-${entry.id}`}
                  type="number"
                  min="1950"
                  max="2050"
                  value={entry.graduation_year}
                  onChange={(e) => handleUpdate(entry.id, 'graduation_year', e.target.value)}
                  placeholder="2020"
                />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

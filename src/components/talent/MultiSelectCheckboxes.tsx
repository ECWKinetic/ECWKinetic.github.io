import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface MultiSelectCheckboxesProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  columns?: 1 | 2 | 3 | 4;
  required?: boolean;
  aiFilledOptions?: string[];
}

export const MultiSelectCheckboxes = ({
  label,
  options,
  selected,
  onChange,
  columns = 2,
  required = false,
  aiFilledOptions = []
}: MultiSelectCheckboxesProps) => {
  const handleToggle = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      
      <Card className="p-4 bg-muted/20">
        <div className={`grid ${gridClass} gap-3`}>
          {options.map((option) => {
            const isAiFilled = aiFilledOptions.includes(option);
            return (
              <div key={option} className="flex items-center space-x-2 relative">
                <Checkbox
                  id={`${label}-${option}`}
                  checked={selected.includes(option)}
                  onCheckedChange={() => handleToggle(option)}
                />
                <Label
                  htmlFor={`${label}-${option}`}
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  {option}
                  {isAiFilled && (
                    <span className="ml-2 text-xs text-primary">✨</span>
                  )}
                </Label>
              </div>
            );
          })}
        </div>
      </Card>

      {selected.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {selected.length} selected
        </p>
      )}
    </div>
  );
};

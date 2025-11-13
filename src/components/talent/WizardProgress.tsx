import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

export const WizardProgress = ({ currentStep, totalSteps, stepTitles }: WizardProgressProps) => {
  return (
    <div className="mb-8">
      {/* Progress bar */}
      <div className="relative">
        <div className="absolute top-5 left-0 w-full h-0.5 bg-muted">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>

        {/* Step indicators */}
        <div className="relative flex justify-between">
          {stepTitles.map((title, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;

            return (
              <div key={stepNumber} className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors",
                    isCompleted && "bg-primary text-primary-foreground",
                    isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                    !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
                </div>
                <span className={cn(
                  "text-xs mt-2 text-center max-w-[80px] hidden sm:block",
                  isCurrent ? "font-semibold text-foreground" : "text-muted-foreground"
                )}>
                  {title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: Current step title */}
      <div className="sm:hidden text-center mt-4">
        <p className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</p>
        <p className="font-semibold">{stepTitles[currentStep - 1]}</p>
      </div>
    </div>
  );
};

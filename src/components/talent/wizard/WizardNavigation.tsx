import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSaveAndExit: () => void;
  isNextDisabled?: boolean;
  isLoading?: boolean;
}

export const WizardNavigation = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSaveAndExit,
  isNextDisabled = false,
  isLoading = false,
}: WizardNavigationProps) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex items-center justify-between gap-4 pt-6 border-t">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={isFirstStep || isLoading}
        className="gap-2"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>

      <Button
        type="button"
        variant="ghost"
        onClick={onSaveAndExit}
        disabled={isLoading}
        className="gap-2"
      >
        <Save className="w-4 h-4" />
        Save & Exit
      </Button>

      <Button
        type="button"
        onClick={onNext}
        disabled={isNextDisabled || isLoading}
        className="gap-2"
      >
        {isLastStep ? 'Submit' : 'Next'}
        {!isLastStep && <ChevronRight className="w-4 h-4" />}
      </Button>
    </div>
  );
};

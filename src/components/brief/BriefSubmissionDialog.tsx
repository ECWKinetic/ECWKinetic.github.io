import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface BriefSubmissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (sendCopy: boolean, convertToJobDescription: boolean) => void;
}

export const BriefSubmissionDialog = ({
  open,
  onOpenChange,
  onConfirm,
}: BriefSubmissionDialogProps) => {
  const [sendCopy, setSendCopy] = useState(false);
  const [convertToJobDescription, setConvertToJobDescription] = useState(false);

  const handleConfirm = () => {
    onConfirm(sendCopy, convertToJobDescription);
    setSendCopy(false);
    setConvertToJobDescription(false);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Brief Submitted Successfully!</AlertDialogTitle>
          <AlertDialogDescription>
            Your project brief has been saved. Would you like us to send you additional information?
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sendCopy"
              checked={sendCopy}
              onCheckedChange={(checked) => setSendCopy(checked as boolean)}
            />
            <Label
              htmlFor="sendCopy"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Send me a copy of this brief
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="convertToJobDescription"
              checked={convertToJobDescription}
              onCheckedChange={(checked) => setConvertToJobDescription(checked as boolean)}
            />
            <Label
              htmlFor="convertToJobDescription"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Convert this into a job description
            </Label>
          </div>
        </div>
        
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleConfirm}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

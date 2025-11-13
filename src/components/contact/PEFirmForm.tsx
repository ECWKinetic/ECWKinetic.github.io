import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { emailSchema, phoneRequiredSchema } from '@/lib/validation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const peFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: emailSchema,
  companyName: z.string().trim().min(1, "Company name is required").max(100, "Company name must be less than 100 characters"),
  phone: phoneRequiredSchema,
});

type PEFormData = z.infer<typeof peFormSchema>;

const PEFirmForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PEFormData>({
    resolver: zodResolver(peFormSchema),
  });
  const { toast } = useToast();
  const { signInWithMagicLink } = useAuth();
  const [loginChecked, setLoginChecked] = useState(false);
  const [showMagicLinkDialog, setShowMagicLinkDialog] = useState(false);
  const [showThankYouDialog, setShowThankYouDialog] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const onSubmit = async (data: PEFormData) => {
    // Send fallback email (backup in case something fails)
    try {
      await supabase.functions.invoke('send-fallback-email', {
        body: {
          type: 'projectlead',
          data: {
            name: data.name,
            email: data.email,
            companyName: data.companyName,
            phone: data.phone || '',
          },
        },
      });
    } catch (emailError) {
      console.error('Fallback email failed:', emailError);
    }

    // If login checkbox is checked, send magic link
    if (loginChecked) {
      try {
        await signInWithMagicLink(data.email);
        setSubmittedEmail(data.email);
        setShowMagicLinkDialog(true);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to send magic link. Please try again.',
        });
        return;
      }
    } else {
      // Show thank you dialog instead
      setShowThankYouDialog(true);
    }
    
    reset();
    setLoginChecked(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="pe-name" className="text-white">Name *</Label>
        <Input
          id="pe-name"
          placeholder="Your Name"
          {...register('name')}
          className="mt-1"
        />
        {errors.name && <p className="text-kinetic-copper text-sm mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <Label htmlFor="pe-email" className="text-white">Email *</Label>
        <Input
          id="pe-email"
          type="email"
          placeholder="Your Email"
          {...register('email')}
          className="mt-1"
        />
        {errors.email && <p className="text-kinetic-copper text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="pe-company" className="text-white">Company Name *</Label>
        <Input
          id="pe-company"
          placeholder="Your Company"
          {...register('companyName')}
          className="mt-1"
        />
        {errors.companyName && <p className="text-kinetic-copper text-sm mt-1">{errors.companyName.message}</p>}
      </div>
      <div>
        <Label htmlFor="pe-phone" className="text-white">Phone *</Label>
        <PhoneInput
          id="pe-phone"
          placeholder="(555) 123-4567"
          {...register('phone')}
          className="mt-1"
        />
        {errors.phone && <p className="text-kinetic-copper text-sm mt-1">{errors.phone.message}</p>}
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="pe-login"
          checked={loginChecked}
          onCheckedChange={(checked) => setLoginChecked(checked as boolean)}
        />
        <Label htmlFor="pe-login" className="text-white text-sm cursor-pointer">
          Check here to log into Kinetic's platform and access your client portal
        </Label>
      </div>
      <Button type="submit" className="w-full bg-kinetic-copper hover:bg-kinetic-copper/90">
        Submit
      </Button>

      <Dialog open={showMagicLinkDialog} onOpenChange={setShowMagicLinkDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Check Your Email</DialogTitle>
            <DialogDescription className="space-y-2">
              <p>
                We've sent a magic link to <strong>{submittedEmail}</strong>
              </p>
              <p>
                Click the link in the email to log in and access your client portal.
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={showThankYouDialog} onOpenChange={setShowThankYouDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thank You!</DialogTitle>
            <DialogDescription>
              Thanks for submitting your information, someone will be in touch soon.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </form>
  );
};

export default PEFirmForm;

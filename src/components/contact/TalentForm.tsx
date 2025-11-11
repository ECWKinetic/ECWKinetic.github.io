import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const talentFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
});

type TalentFormData = z.infer<typeof talentFormSchema>;

const TalentForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TalentFormData>({
    resolver: zodResolver(talentFormSchema),
  });
  const { toast } = useToast();

  const onSubmit = async (data: TalentFormData) => {
    // Generate SessionID
    const sessionId = crypto.randomUUID();
    
    // Send fallback email (backup in case something fails)
    try {
      await supabase.functions.invoke('send-fallback-email', {
        body: {
          type: 'candidate',
          data: {
            name: data.name,
            email: data.email,
            sessionId: sessionId,
          },
        },
      });
    } catch (emailError) {
      console.error('Fallback email failed:', emailError);
    }

    // Show success message to user
    toast({
      title: "Opening Chat",
      description: "Let's chat to learn more about your background and interests.",
    });
    
    // Always open chat with form data
    if (typeof window !== 'undefined') {
      const chatEvent = new CustomEvent('openN8nChat', {
        detail: {
          name: data.name,
          email: data.email,
          type: 'candidate',
          sessionId: sessionId,
        }
      });
      window.dispatchEvent(chatEvent);
    }
    
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="talent-name" className="text-white">Name *</Label>
        <Input
          id="talent-name"
          placeholder="Your Name"
          {...register('name')}
          className="mt-1"
        />
        {errors.name && <p className="text-kinetic-copper text-sm mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <Label htmlFor="talent-email" className="text-white">Email *</Label>
        <Input
          id="talent-email"
          type="email"
          placeholder="Your Email"
          {...register('email')}
          className="mt-1"
        />
        {errors.email && <p className="text-kinetic-copper text-sm mt-1">{errors.email.message}</p>}
      </div>
      <Button type="submit" className="w-full bg-kinetic-copper hover:bg-kinetic-copper/90">
        Submit
      </Button>
    </form>
  );
};

export default TalentForm;

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
    try {
      const response = await fetch('https://kineticconsulting.app.n8n.cloud/webhook-test/73768bb4-7a6e-4ae4-9b08-d0679279f69f', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          candidate_name: data.name,
          email: data.email,
          type: 'candidate',
        }),
      });

      if (!response.ok) {
        throw new Error('Webhook failed');
      }
    } catch (error) {
      // Webhook failed, send fallback email
      console.log('Webhook failed, sending fallback email');
      try {
        await supabase.functions.invoke('send-fallback-email', {
          body: {
            type: 'candidate',
            data: {
              name: data.name,
              email: data.email,
            },
          },
        });
      } catch (emailError) {
        console.error('Fallback email also failed:', emailError);
      }
    }

    // Always show success message to user
    toast({
      title: "Submission Received",
      description: "Thank you for your interest. Someone will be in touch soon.",
    });
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

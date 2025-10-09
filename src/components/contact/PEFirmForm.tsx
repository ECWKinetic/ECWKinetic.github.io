import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ChatWidget from '@/components/chat/ChatWidget';

const peFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  companyName: z.string().trim().min(1, "Company name is required").max(100, "Company name must be less than 100 characters"),
  phone: z.string().trim().max(20, "Phone must be less than 20 characters").optional().or(z.literal('')),
});

type PEFormData = z.infer<typeof peFormSchema>;

const PEFirmForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PEFormData>({
    resolver: zodResolver(peFormSchema),
  });
  const { toast } = useToast();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [formContext, setFormContext] = useState<any>(null);

  const onSubmit = async (data: PEFormData) => {
    let webhookSuccess = false;
    
    try {
      const response = await fetch('https://kineticconsulting.app.n8n.cloud/webhook-test/73768bb4-7a6e-4ae4-9b08-d0679279f69f', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_name: data.name,
          email: data.email,
          company_name: data.companyName,
          phone: data.phone || '',
          type: 'projectlead',
        }),
      });

      if (response.ok) {
        webhookSuccess = true;
      } else {
        throw new Error('Webhook failed');
      }
    } catch (error) {
      // Webhook failed, send fallback email
      console.log('Webhook failed, sending fallback email');
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
        console.error('Fallback email also failed:', emailError);
      }
    }

    // Always show success message to user
    toast({
      title: "Request Submitted",
      description: "Thank you for your interest. Someone will be in touch soon.",
    });
    
    // Open chat modal if webhook was successful
    if (webhookSuccess) {
      setFormContext({
        name: data.name,
        email: data.email,
        companyName: data.companyName,
        phone: data.phone || '',
        type: 'projectlead',
      });
      setIsChatOpen(true);
    }
    
    reset();
  };

  return (
    <>
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
          placeholder="Company Name"
          {...register('companyName')}
          className="mt-1"
        />
        {errors.companyName && <p className="text-kinetic-copper text-sm mt-1">{errors.companyName.message}</p>}
      </div>
      <div>
        <Label htmlFor="pe-phone" className="text-white">Phone (Optional)</Label>
        <Input
          id="pe-phone"
          type="tel"
          placeholder="Phone Number"
          {...register('phone')}
          className="mt-1"
        />
        {errors.phone && <p className="text-kinetic-copper text-sm mt-1">{errors.phone.message}</p>}
      </div>
      <Button type="submit" className="w-full bg-kinetic-copper hover:bg-kinetic-copper/90">
        Submit
      </Button>
    </form>
    
    {formContext && (
      <ChatWidget
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        webhookUrl="https://kineticconsulting.app.n8n.cloud/webhook-test/73768bb4-7a6e-4ae4-9b08-d0679279f69f"
        initialContext={formContext}
      />
    )}
    </>
  );
};

export default PEFirmForm;

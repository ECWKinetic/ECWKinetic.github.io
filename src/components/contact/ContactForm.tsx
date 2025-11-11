
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });
  const { toast } = useToast();

  const onSubmit = async (data: ContactFormData) => {
    let webhookSuccess = false;
    
    // Get SessionID from localStorage or generate a fallback
    const sessionId = localStorage.getItem('lovable-session-id') || 
                     document.cookie.split(';').find(c => c.trim().startsWith('session_id='))?.split('=')[1] ||
                     crypto.randomUUID();
    
    try {
      const response = await fetch('https://kineticconsulting.app.n8n.cloud/webhook-test/form-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          type: 'contact',
          sessionId: sessionId,
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
            type: 'contact',
            data: {
              name: data.name,
              email: data.email,
              message: data.message,
              sessionId: sessionId,
            },
          },
        });
      } catch (emailError) {
        console.error('Fallback email also failed:', emailError);
      }
    }

    // Always show success message to user
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll get back to you soon.",
    });
    
    // Open chat with context if webhook was successful
    if (webhookSuccess && typeof window !== 'undefined') {
      const chatEvent = new CustomEvent('openN8nChat', {
        detail: {
          name: data.name,
          email: data.email,
          message: data.message,
          type: 'contact',
          sessionId: sessionId,
        }
      });
      window.dispatchEvent(chatEvent);
    }
    
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      <div>
        <Label htmlFor="contact-name" className="text-kinetic-navy">Name *</Label>
        <Input
          id="contact-name"
          placeholder="Your Name"
          {...register('name')}
          className="mt-1 text-kinetic-navy"
        />
        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <Label htmlFor="contact-email" className="text-kinetic-navy">Email *</Label>
        <Input
          id="contact-email"
          type="email"
          placeholder="Your Email"
          {...register('email')}
          className="mt-1 text-kinetic-navy"
        />
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="contact-message" className="text-kinetic-navy">Message *</Label>
        <Textarea
          id="contact-message"
          placeholder="Your Message"
          className="min-h-[120px] mt-1 text-kinetic-navy"
          {...register('message')}
        />
        {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>}
      </div>
      <Button type="submit" className="w-full bg-kinetic-copper hover:bg-kinetic-copper/90">
        Send Message
      </Button>
    </form>
  );
};

export default ContactForm;


import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const { register, handleSubmit, reset } = useForm<ContactFormData>();
  const { toast } = useToast();

  const onSubmit = async (data: ContactFormData) => {
    // Create mailto link with form data
    const subject = encodeURIComponent('New Contact Form Submission');
    const body = encodeURIComponent(`
Name: ${data.name}
Email: ${data.email}

Message:
${data.message}
    `);
    
    window.location.href = `mailto:info@kineticconsultingpartners.com?subject=${subject}&body=${body}`;
    
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll get back to you soon.",
    });
    
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
      <div>
        <Input
          placeholder="Your Name"
          {...register('name', { required: true })}
        />
      </div>
      <div>
        <Input
          type="email"
          placeholder="Your Email"
          {...register('email', { required: true })}
        />
      </div>
      <div>
        <Textarea
          placeholder="Your Message"
          className="min-h-[120px]"
          {...register('message', { required: true })}
        />
      </div>
      <Button type="submit" className="w-full bg-kinetic-copper hover:bg-kinetic-copper/90">
        Send Message
      </Button>
    </form>
  );
};

export default ContactForm;

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

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

  const onSubmit = async (data: PEFormData) => {
    const subject = encodeURIComponent('PE Firm/Portfolio Company - Talent Request');
    const body = encodeURIComponent(`
Name: ${data.name}
Email: ${data.email}
Company Name: ${data.companyName}
Phone: ${data.phone || 'Not provided'}
    `);
    
    window.location.href = `mailto:info@kineticconsultingpartners.com?subject=${subject}&body=${body}`;
    
    toast({
      title: "Request Submitted",
      description: "Thank you for your interest. We'll be in touch soon.",
    });
    
    reset();
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
  );
};

export default PEFirmForm;

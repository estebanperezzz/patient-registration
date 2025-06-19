import { z } from 'zod';

export const registerPatientSchema = z.object({
  body: z.object({
    fullName: z
      .string({ required_error: 'Full name is required' })
      .min(3, 'Full name must be at least 3 characters long.')
      .regex(
        /^[a-zA-Z\s'-]+$/,
        "Full name can only contain letters and spaces."
      ),

    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email address.')
      .refine(
        (email) => email.endsWith('@gmail.com'),
        'Sorry, only @gmail.com addresses are allowed.'
      ),
    
    phoneCountryCode: z
      .string({ required_error: 'Country code is required' })
      .startsWith('+', 'Country code must start with a "+".')
      .min(2, 'Country code is too short.'),

    phoneNumber: z
      .string({ required_error: 'Phone number is required' })
      .min(7, 'Phone number must be at least 7 digits.')
      .regex(/^[0-9]+$/, 'Phone number can only contain digits.'),
  }),
});

export type RegisterPatientInput = z.infer<typeof registerPatientSchema>['body'];
import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg'];

export const patientFormSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Full name must be at least 3 characters.'),
  email: z
    .string()
    .email('Please enter a valid email address.')
    .refine(
      (email) => email.endsWith('@gmail.com'),
      'Only @gmail.com emails are allowed.'
    ),
  phoneCountryCode: z
    .string()
    .min(2, 'Required')
    .startsWith('+', 'Must start with +'),
  phoneNumber: z
    .string()
    .min(7, 'Phone number must be at least 7 digits.'),
  documentPhoto: z
    .any()
    .refine((files) => files?.length === 1, 'Document photo is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Only .jpg format is supported.'
    ),
});

export type PatientFormValues = z.infer<typeof patientFormSchema>;
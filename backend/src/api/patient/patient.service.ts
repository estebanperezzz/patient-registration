import prisma from '../../lib/prisma.js';
import { supabase } from '../../lib/supabase.js';
import { sendRegistrationConfirmationEmail } from '../../services/email.service.js';
import type { RegisterPatientInput } from './patient.schema.js';
import { v4 as uuidv4 } from 'uuid'; 
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const createPatient = async (
  data: RegisterPatientInput,
  file: Express.Multer.File
) => {
  const fullPhoneNumber = `${data.phoneCountryCode}${data.phoneNumber}`;

  const fileName = `${uuidv4()}-${file.originalname}`;
  const { error: uploadError } = await supabase.storage
    .from('document-photos')
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (uploadError) {
    console.error('Supabase upload error:', uploadError);
    throw new Error('Failed to upload document photo.');
  }

  const { data: urlData } = supabase.storage
    .from('document-photos')
    .getPublicUrl(fileName);

  const documentPhotoUrl = urlData.publicUrl;

  try {
    const newPatient = await prisma.patient.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: fullPhoneNumber,
        documentPhotoUrl: documentPhotoUrl,
      },
    });

    void sendRegistrationConfirmationEmail({ 
      email: newPatient.email,
      name: newPatient.fullName,
    });

    return newPatient;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
      const field = (error.meta?.target as string[])[0];
      throw new Error(`A patient with this ${field} already exists.`);
    }
    
    console.error('Prisma create error:', error);
    throw new Error('Failed to create patient record.');
  }
};

export const getAllPatients = async () => {
  const patients = await prisma.patient.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return patients;
};
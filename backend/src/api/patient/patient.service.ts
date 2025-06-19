import prisma from '../../lib/prisma';
import { supabase } from '../../lib/supabase';
import { sendRegistrationConfirmationEmail } from '../../services/email.service';
import { RegisterPatientInput } from './patient.schema';
import { v4 as uuidv4 } from 'uuid'; 

/**
 * Service to create a new patient, upload their document photo, and send an email.
 * @param data The validated patient data from the controller.
 * @param file The document photo file uploaded via Multer.
 */
export const createPatient = async (
  data: RegisterPatientInput,
  file: Express.Multer.File
) => {
  const fullPhoneNumber = `${data.phoneCountryCode}${data.phoneNumber}`;

  const fileName = `${uuidv4()}-${file.originalname}`;
  const { error: uploadError } = await supabase.storage
    .from('document-photos') //Name of the bucket in Supabase
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

    sendRegistrationConfirmationEmail({
      email: newPatient.email,
      name: newPatient.fullName,
    });

    return newPatient;
  } catch (error: any) {
    if (error.code === 'P2002') { 
      throw new Error(
        `A patient with this ${error.meta.target.join(', ')} already exists.`
      );
    }
    console.error('Prisma create error:', error);
    throw new Error('Failed to create patient record.');
  }
};
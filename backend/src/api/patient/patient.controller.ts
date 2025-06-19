import { Request, Response } from 'express';
import { createPatient } from './patient.service';
import { RegisterPatientInput } from './patient.schema';

export const registerPatientHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const file = req.file;

    if (!file) {
      res.status(400).json({ error: 'Document photo is required.' });
      return;
    }

    const newPatient = await createPatient(
      req.body as RegisterPatientInput,
      file
    );
    
    res.status(201).json(newPatient);
  } catch (error: any) {
    console.error('Error in registerPatientHandler:', error.message);
    res.status(409).json({ error: error.message });
  }
};
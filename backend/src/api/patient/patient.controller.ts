import type { Request, Response } from 'express'; 
import { createPatient } from './patient.service.js';
import type { RegisterPatientInput } from './patient.schema.js'; 

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
  } catch (error) { // <-- CAMBIO AQUÍ (quitamos : any)
    // Hacemos una verificación de tipo segura para el error
    if (error instanceof Error) {
      console.error('Error in registerPatientHandler:', error.message);
      res.status(409).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }
};
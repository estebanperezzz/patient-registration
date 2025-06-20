import type { Request,  Response, NextFunction } from 'express';
import express from 'express';
import { registerPatientHandler } from './patient.controller.js';
import { registerPatientSchema } from './patient.schema.js';
import validateRequest from '../../middleware/validateRequest.js';
import upload from '../../middleware/upload.js';
import { getAllPatientsHandler } from './patient.controller.js';

const router = express.Router();

router.post(
  '/',
  upload.single('documentPhoto'),

  (req: Request, res: Response, next: NextFunction) => {
    console.log('--- DEBUGGING MIDDLEWARE ---');
    console.log('Request Body:', req.body);
    console.log('Request File:', req.file ? 'File received' : 'No file received');
    if (req.file) {
      console.log('File details:', {
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
      });
    }
    console.log('--------------------------');
    next(); 
  },

  validateRequest(registerPatientSchema),
  registerPatientHandler
);

router.get('/', getAllPatientsHandler);

export default router;
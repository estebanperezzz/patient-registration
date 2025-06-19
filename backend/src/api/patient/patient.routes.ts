import express, { Request, Response, NextFunction } from 'express';
import { registerPatientHandler } from './patient.controller';
import { registerPatientSchema } from './patient.schema';
import validateRequest from '../../middleware/validateRequest';
import upload from '../../middleware/upload';

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

export default router;
import express from 'express';
import type { Request, Response, NextFunction } from 'express'; 
import cors from 'cors';
import patientRoutes from './api/patient/patient.routes.js';

const app = express();

app.use(cors());

app.use('/api/patients', patientRoutes);

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// --- Global Error Handler Corregido ---
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof Error) {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!', message: err.message });
  } else {
    console.error(err);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
});

export default app;
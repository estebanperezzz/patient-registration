import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import patientRoutes from './api/patient/patient.routes';

// Create the Express app
const app = express();

//  Global Middlewares 
app.use(cors());

//  API Routes 

app.use('/api/patients', patientRoutes);

//  Health Check Route 
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

//  Global Error Handler 
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  
  console.error(err.stack); 
  res.status(500).json({ error: 'Something broke!' });
});

export default app;
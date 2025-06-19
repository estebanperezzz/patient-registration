// src/middleware/validateRequest.ts

import type { NextFunction, Request, Response } from 'express';
import { ZodError, type AnyZodObject } from 'zod';

const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body as unknown,
        query: req.query as unknown,
        params: req.params as unknown,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: 'Validation failed',
          details: error.flatten().fieldErrors,
        });
        return;
      }
      next(error);
    }
  };

export default validateRequest;
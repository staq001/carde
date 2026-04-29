import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

function extractZodErrorMessage(errorMsg: string): string | null {
  try {
    const parsed = JSON.parse(errorMsg);
    if (Array.isArray(parsed) && parsed[0] && parsed[0].message) {
      return parsed[0].message;
    }
    return null;
  } catch (e) {
    return null;
  }
}

export const validate =
  (schema: z.ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation Failed",
        errors: extractZodErrorMessage(result.error.message),
      });
    }

    req.body = result.data;
    next();
  };

export function invalidRoute(req: Request, res: Response) {
  return res.status(404).json({
    status: 404,
    message: ` Sorry, this route ${req.method}/ ${req.protocol}://${req.get(
      "host",
    )}${req.originalUrl} doesn't exist`,
  });
}

export function errorMiddleware(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  return res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || "Internal Server Error",
  });
}

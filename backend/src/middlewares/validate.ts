import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodIssue } from "zod";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: result.error.issues.map((e: ZodIssue) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
    }

    next();
  };

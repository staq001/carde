import { Router } from "express";
import type { Request, Response, NextFunction } from "express";

const router = Router();

router.get("/health", (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ status: "OK", message: "Health check passed" });
  } catch (e: any) {
    next(e);
  }
});

export default router;

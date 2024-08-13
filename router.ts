import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Server is up and running");
});

// Health check route
router.get("/health", (req: Request, res: Response) => {
  res.status(200).send("Server is healthy");
});

export default router;

import { Router, Request, Response } from "express";
import { AdminController } from "../controllers/adminController";

const adminRoutes = Router();
const adminController = new AdminController();

adminRoutes.post("/admin-password", async (req: Request, res: Response) => {
  await adminController.handle(req, res);
});

export default adminRoutes;

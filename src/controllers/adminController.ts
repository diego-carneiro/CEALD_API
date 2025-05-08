import { Request, Response } from "express";
import { AdminRepository } from "../repositories/adminRepository";

export class AdminController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { password } = req.body;

    if (!password || typeof password !== "string") {
      return res
        .status(400)
        .json({ error: "Password is required and must be a string" });
    }

    const repository = new AdminRepository();
    const isValid = await repository.checkPassword(password);

    if (!isValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    return res.status(200).json({ success: true });
  }
}

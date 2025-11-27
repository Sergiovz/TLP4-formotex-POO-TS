import type { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";
import type { User } from "../models/User.js";
import type { IRequest } from "../interfaces/IRequest.js";

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const token = await this.authService.login(email, password);
      res.status(200).json({
        message: "Login exitoso",
        token,
      });
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  }

  async register(req: Request, res: Response): Promise<User | void> {
    try {
      const user = await this.authService.register(req.body);
      res.status(201).json({
        message: "Usuario registrado con éxito",
        user,
      });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async logout(req: IRequest, res: Response): Promise<void> {
    const { user } = req;
    try {
      if (user) {
        req.user = undefined;
      }
      res.status(204).json({
        message: "Logout exitoso",
      });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}

import type { Request, Response } from "express";
import type { UserService } from "../services/user.service.js";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await this.userService.getUserById(Number(id));
      res.status(200).json({
        message: "Usuario obtenido con éxito",
        user,
      });
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json({
        message: "Usuarios obtenidos con éxito",
        users,
      });
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json({
        message: "Usuario creado con éxito",
        user,
      });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await this.userService.updateUser(Number(id), req.body);
      res.status(200).json({
        message: "Usuario actualizado con éxito",
        user,
      });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const success = await this.userService.deleteUser(Number(id));
      res.status(200).json({
        message: "Usuario eliminado con éxito",
        success,
      });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // TODO: Implementar lógica
  // getUsers()
  // getUserById()
  // updateUser()
  // deleteUser()
  // ? metodos adicionales
  // getUserByRole()
  // ? relaciones entre usuarios y equipos
  // getUsersWithEquipment()
}

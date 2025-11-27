import type { Request, Response } from "express";
import { EquipmentService } from "../services/equipment.service.js";
import type { IRequest } from "../interfaces/IRequest.js";

export class EquipmentController {
  constructor(private equipmentService: EquipmentService) {}

  async getEquipments(req: IRequest, res: Response) {
    const { user } = req;

    if (!user) {
      return res.status(401).json({ error: "No autorizado", success: false });
    }

    try {
      const list = await this.equipmentService.findAll(user.role, user.id);
      res.status(200).json({
        message: "Equipos obtenidos con éxito",
        equipments: list,
        success: true,
      });
    } catch (error: any) {
      if (error.message && error.success !== undefined) {
        return res.status(404).json(error);
      }
      res
        .status(500)
        .json({ error: "Error interno del servidor", success: false });
    }
  }

  async getEquipmentById(req: IRequest, res: Response) {
    const { id } = req.params;
    const { user } = req;

    try {
      const equipment = await this.equipmentService.findById(
        Number(id),
        user?.role,
        user?.id
      );
      res.json(equipment);
    } catch (error: any) {
      if (error.message && error.success !== undefined) {
        return res.status(404).json(error);
      }
      if (error.message && error.message.includes("Solo puedes gestionar")) {
        return res.status(403).json(error);
      }
      res
        .status(500)
        .json({ error: "Error interno del servidor", success: false });
    }
  }

  async createEquipment(req: IRequest, res: Response) {
    try {
      const equipment = await this.equipmentService.create(req.body);
      res.status(201).json({
        message: "Equipo creado con éxito",
        equipment,
        success: true,
      });
    } catch (err: any) {
      if (err.message && err.success !== undefined) {
        return res.status(400).json(err);
      }
      res
        .status(500)
        .json({ error: "Error interno del servidor", success: false });
    }
  }

  async updateEquipment(req: IRequest, res: Response) {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ error: "No autorizado", success: false });
    }
    try {
      const updated = await this.equipmentService.update(
        Number(req.params.id),
        req.body,
        user.role,
        user.id
      );
      if (!updated)
        return res
          .status(404)
          .json({ error: "Equipo no encontrado", success: false });
      res.status(200).json({
        message: "Equipo actualizado con éxito",
        equipment: updated,
        success: true,
      });
    } catch (err: any) {
      if (err.message && err.success !== undefined) {
        if (err.message.includes("Solo puedes gestionar")) {
          return res.status(403).json(err);
        }
        return res.status(400).json(err);
      }
      res
        .status(500)
        .json({ error: "Error interno del servidor", success: false });
    }
  }

  async deleteEquipment(req: IRequest, res: Response) {
    const { user } = req;
    try {
      const deleted = await this.equipmentService.delete(
        Number(req.params.id),
        user?.role,
        user?.id
      );
      if (!deleted)
        return res
          .status(404)
          .json({ error: "Equipo no encontrado", success: false });
      res.status(200).json({
        message: "Equipo eliminado con éxito",
        success: true,
      });
    } catch (err: any) {
      if (err.message && err.success !== undefined) {
        if (err.message.includes("Solo puedes gestionar")) {
          return res.status(403).json(err);
        }
        return res.status(400).json(err);
      }
      res
        .status(500)
        .json({ error: "Error interno del servidor", success: false });
    }
  }

  // ? Métodos extra relacionados con usuarios/admin
  async assignEquipmentToUser(req: IRequest, res: Response) {
    const { id } = req.params;
    const { userId } = req.body;
    const { user } = req;
    try {
      const assigned = await this.equipmentService.assignEquipmentToUser(
        Number(id),
        user?.role,
        userId
      );
      res.status(200).json({
        message: "Equipo asignado con éxito",
        equipment: assigned,
        success: true,
      });
    } catch (error: any) {
      if (error.message && error.success !== undefined) {
        if (error.message.includes("Acceso denegado")) {
          return res.status(403).json(error);
        }
        if (error.message.includes("Equipo no encontrado")) {
          return res.status(404).json(error);
        }
        return res.status(400).json(error);
      }
      res
        .status(500)
        .json({ error: "Error interno del servidor", success: false });
    }
  }
  async unassignEquipmentFromUser(req: IRequest, res: Response) {
    const { id } = req.params;
    const { user } = req;

    try {
      const unassigned = await this.equipmentService.unassignEquipment(
        Number(id),
        user?.role
      );
      res.status(200).json({
        message: "Equipo desasignado con éxito",
        equipment: unassigned,
        success: true,
      });
    } catch (error: any) {
      if (error.message && error.success !== undefined) {
        if (error.message.includes("Acceso denegado")) {
          return res.status(403).json(error);
        }
        if (error.message.includes("Equipo no encontrado")) {
          return res.status(404).json(error);
        }
        return res.status(400).json(error);
      }
      res
        .status(500)
        .json({ error: "Error interno del servidor", success: false });
    }
  }
  async getEquipmentByUserId(req: IRequest, res: Response) {
    const { id } = req.params;
    const { user } = req;

    try {
      const equipments = await this.equipmentService.findByIdWithUserId(
        Number(id),
        user?.id
      );
      res.status(200).json({
        message: "Equipos obtenidos con éxito",
        equipment: equipments,
        success: true,
      });
    } catch (error: any) {
      if (error.message && error.success !== undefined) {
        if (error.message.includes("Solo puedes gestionar")) {
          return res.status(403).json(error);
        }
        if (error.message.includes("Equipo no encontrado")) {
          return res.status(404).json(error);
        }
        return res.status(400).json(error);
      }
      res
        .status(500)
        .json({ error: "Error interno del servidor", success: false });
    }
  }
  async getAvailableEquipment(req: IRequest, res: Response) {
    const { user } = req;

    try {
      const equipments = await this.equipmentService.findAvailable();
      res.status(200).json({
        message: "Equipos disponibles obtenidos con éxito",
        equipments,
        success: true,
      });
    } catch (error: any) {
      if (error.message && error.success !== undefined) {
        return res.status(404).json(error);
      }
      res
        .status(500)
        .json({ error: "Error interno del servidor", success: false });
    }
  }

  async getEquipmentStatus(req: IRequest, res: Response) {
    const { id } = req.params;
    const { user } = req;

    try {
      const equipment = await this.equipmentService.findById(
        Number(id),
        user?.role,
        user?.id
      );
      res.status(200).json({
        message: "Estado del equipo obtenido con éxito",
        status: equipment?.status,
        success: true,
      });
    } catch (error: any) {
      if (error.message && error.success !== undefined) {
        if (error.message.includes("Solo puedes gestionar")) {
          return res.status(403).json(error);
        }
        if (error.message.includes("Equipo no encontrado")) {
          return res.status(404).json(error);
        }
        return res.status(400).json(error);
      }
      res
        .status(500)
        .json({ error: "Error interno del servidor", success: false });
    }
  }

  async updateEquipmentStatus(req: IRequest, res: Response) {
    const { id } = req.params;
    const { status } = req.body;
    const { user } = req;

    try {
      const updated = await this.equipmentService.updateStatus(
        Number(id),
        status,
        user?.role,
        user?.id
      );
      res.status(200).json({
        message: "Estado del equipo actualizado con éxito",
        equipment: updated,
        success: true,
      });
    } catch (error: any) {
      if (error.message && error.success !== undefined) {
        if (error.message.includes("Estado de equipo inválido")) {
          return res.status(400).json(error);
        }
        if (error.message.includes("Equipo no encontrado")) {
          return res.status(404).json(error);
        }
        if (error.message.includes("Solo puedes gestionar")) {
          return res.status(403).json(error);
        }
        return res.status(400).json(error);
      }
      res
        .status(500)
        .json({ error: "Error interno del servidor", success: false });
    }
  }

  async getEquipmentBySerialNumber(req: IRequest, res: Response) {
    const { serialNumber } = req.body;
    const { user } = req;

    try {
      const equipment = await this.equipmentService.findBySerialNumber(
        serialNumber,
        user?.role,
        user?.id
      );
      res.status(200).json({
        message: "Equipo encontrado con éxito",
        equipment,
        success: true,
      });
    } catch (error: any) {
      if (error.message && error.success !== undefined) {
        if (error.message.includes("Equipo no encontrado")) {
          return res.status(404).json(error);
        }
        if (error.message.includes("Solo puedes gestionar")) {
          return res.status(403).json(error);
        }
        return res.status(400).json(error);
      }
      res
        .status(500)
        .json({ error: "Error interno del servidor", success: false });
    }
  }
}

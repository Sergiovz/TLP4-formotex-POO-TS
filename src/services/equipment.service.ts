import { ERROR_MESSAGES } from "../helpers/errors.js";
import type { IRepository } from "../interfaces/IRepository.js";
import { Equipment } from "../models/Equipment.js";
import { User } from "../models/User.js";
import type { EquipmentRepository } from "../repositories/equipment.repository.js";

export class EquipmentService {
  private equipmentRepository: EquipmentRepository;

  constructor(equipmentRepository: EquipmentRepository) {
    this.equipmentRepository = equipmentRepository;
  }

  // TODO: implementar validaciones y lógica de negocio
  // ? devuelve el equipo asignado al user, si es admin devuelve todos los equipos
  async findById(
    id: number,
    role?: string,
    userId?: number
  ): Promise<Equipment | null> {
    if (!id) {
      throw ERROR_MESSAGES.EQUIPMENT.ID_REQUIRED;
    }

    const equipment = await this.equipmentRepository.findById(id);

    if (!equipment) {
      throw ERROR_MESSAGES.EQUIPMENT.NOT_FOUND;
    }

    if (role !== "admin" && equipment.userId !== userId) {
      throw ERROR_MESSAGES.EQUIPMENT.ONLY_ASSIGNED_TO_SELF;
    }

    return equipment;
  }

  async findAll(role: string, userId?: number): Promise<Equipment[]> {
    if (role === "admin") {
      const equipments = await this.equipmentRepository.findAll({
        include: [
          { model: User, as: "user", attributes: ["id", "email", "role"] },
        ],
      });

      if (!equipments || equipments.length === 0) {
        throw ERROR_MESSAGES.EQUIPMENT.NO_EQUIPMENTS_FOUND;
      }
      return equipments;
    }

    if (!userId) {
      throw ERROR_MESSAGES.AUTH.UNAUTHORIZED;
    }

    const equipments = await this.equipmentRepository.findByUserId(userId);

    if (!equipments || equipments.length === 0) {
      throw ERROR_MESSAGES.EQUIPMENT.NO_EQUIPMENTS_FOUND;
    }
    return equipments;
  }

  async create(data: Partial<Equipment>): Promise<Equipment> {
    const { name, type, serialNumber } = data;

    if (!name || !type || !serialNumber) {
      throw ERROR_MESSAGES.EQUIPMENT.REQUIRED_FIELDS;
    }

    const exists = await this.equipmentRepository.findBySerialNumber(
      serialNumber
    );

    if (exists) {
      throw ERROR_MESSAGES.EQUIPMENT.ALREADY_ASSIGNED;
    }

    return await this.equipmentRepository.create(data);
  }
  async update(
    id: number,
    data: Partial<Equipment>,
    role?: string,
    userId?: number
  ): Promise<Equipment | null> {
    const exists = await this.equipmentRepository.findById(id);

    if (!exists) {
      throw ERROR_MESSAGES.EQUIPMENT.NOT_FOUND;
    }

    if (role !== "admin" && exists.userId !== userId) {
      throw ERROR_MESSAGES.EQUIPMENT.ONLY_ASSIGNED_TO_SELF;
    }

    return await this.equipmentRepository.update(id, data);
  }
  async delete(id: number, role?: string, userId?: number): Promise<boolean> {
    const exists = await this.equipmentRepository.findById(id);

    if (!exists) {
      throw ERROR_MESSAGES.EQUIPMENT.NOT_FOUND;
    }

    if (role !== "admin" && exists.userId !== userId) {
      throw ERROR_MESSAGES.EQUIPMENT.ONLY_ASSIGNED_TO_SELF;
    }

    return await this.equipmentRepository.delete(id);
  }

  // TODO: añadir más métodos especificos de equipment
  // ? métodos para asignar y desasignar equipos a usuarios según su rol
  // ? métodos para gestionar el estado del equipo (disponible, en uso, en mantenimiento, etc.)

  async getEquipmentsByType(type: string): Promise<Equipment[]> {
    // ? lógica para obtener equipos por tipo
    // ? no creo que haga falta validar por usuario o admin, ya que ambos pueden ver los equipos de un tipo,
    // !aunque si los tienen asignados unicamente ellos
    if (!type) {
      throw ERROR_MESSAGES.EQUIPMENT.TYPE_REQUIRED;
    }
    const equipments = await this.equipmentRepository.findAll();

    if (!equipments || equipments.length === 0) {
      throw ERROR_MESSAGES.EQUIPMENT.NO_EQUIPMENTS_FOUND;
    }
    return equipments.filter((equipment) => equipment.type === type);
  }

  async findByIdWithUserId(
    id: number,
    userId?: number
  ): Promise<Equipment | null> {
    if (!id) {
      throw ERROR_MESSAGES.EQUIPMENT.ID_REQUIRED;
    }

    const equipment = await this.equipmentRepository.findByIdWithUser(id);

    if (!equipment) {
      throw ERROR_MESSAGES.EQUIPMENT.NOT_FOUND;
    }

    if (equipment.userId !== userId) {
      throw ERROR_MESSAGES.EQUIPMENT.ONLY_ASSIGNED_TO_SELF;
    }

    return equipment;
  }

  async findAllByUserId(userId: number): Promise<Equipment[]> {
    if (!userId) {
      throw ERROR_MESSAGES.AUTH.UNAUTHORIZED;
    }
    const equipments = await this.equipmentRepository.findByUserId(userId);

    if (!equipments || equipments.length === 0) {
      throw ERROR_MESSAGES.EQUIPMENT.NO_EQUIPMENTS_FOUND;
    }
    return equipments;
  }

  async assignEquipmentToUser(id: number, role?: string, userId?: number) {
    // ? lógica para asignar equipo a usuario
    if (role !== "admin") {
      throw ERROR_MESSAGES.AUTH.ROLE.FORBIDDEN;
    }

    if (!userId) {
      throw ERROR_MESSAGES.USER.ID_REQUIRED;
    }

    const equipment = await this.equipmentRepository.findById(id);

    if (!equipment) {
      throw ERROR_MESSAGES.EQUIPMENT.NOT_FOUND;
    }

    if (equipment.userId) {
      throw ERROR_MESSAGES.EQUIPMENT.ALREADY_ASSIGNED;
    }

    return await this.equipmentRepository.update(id, {
      userId: userId,
    });
  }

  async unassignEquipment(id: number, role?: string, userId?: number) {
    if (role !== "admin") {
      throw ERROR_MESSAGES.AUTH.ROLE.FORBIDDEN;
    }

    const equipment = await this.equipmentRepository.findById(id);

    if (!equipment) {
      throw ERROR_MESSAGES.EQUIPMENT.NOT_FOUND;
    }

    if (!equipment.userId) {
      throw ERROR_MESSAGES.EQUIPMENT.NOT_ASSIGNED;
    }

    return await this.equipmentRepository.update(id, { userId: null });
  }

  async findAvailable(): Promise<Equipment[]> {
    const equipments = await this.equipmentRepository.findAll({
      where: { userId: null },
      include: [
        { model: User, as: "user", attributes: ["id", "email", "role"] },
      ],
    });

    if (!equipments || equipments.length === 0) {
      throw ERROR_MESSAGES.EQUIPMENT.NO_EQUIPMENTS_FOUND;
    }

    return equipments;
  }

  async findBySerialNumber(
    serialNumber: string,
    role?: string,
    userId?: number
  ): Promise<Equipment | null> {
    if (!serialNumber) {
      throw ERROR_MESSAGES.EQUIPMENT.INVALID_SERIAL_NUMBER;
    }

    const equipment = await this.equipmentRepository.findBySerialNumber(
      serialNumber
    );

    if (!equipment) {
      throw ERROR_MESSAGES.EQUIPMENT.NOT_FOUND;
    }

    if (role !== "admin" && equipment.userId !== userId) {
      throw ERROR_MESSAGES.EQUIPMENT.ONLY_ASSIGNED_TO_SELF;
    }

    return equipment;
  }

  async updateStatus(
    id: number,
    status: "active" | "inactive" | "maintenance",
    role?: string,
    userId?: number
  ): Promise<Equipment | null> {
    if (!id) {
      throw ERROR_MESSAGES.EQUIPMENT.ID_REQUIRED;
    }

    if (!status) {
      throw ERROR_MESSAGES.EQUIPMENT.INVALID_STATUS;
    }

    const validStatuses = ["active", "inactive", "maintenance"];
    if (!validStatuses.includes(status)) {
      throw ERROR_MESSAGES.EQUIPMENT.INVALID_STATUS;
    }

    const equipment = await this.equipmentRepository.findById(id);

    if (!equipment) {
      throw ERROR_MESSAGES.EQUIPMENT.NOT_FOUND;
    }

    if (role !== "admin" && equipment.userId !== userId) {
      throw ERROR_MESSAGES.EQUIPMENT.ONLY_ASSIGNED_TO_SELF;
    }

    return await this.equipmentRepository.update(id, { status });
  }
}

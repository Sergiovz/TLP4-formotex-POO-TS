import type { IRepository } from "../interfaces/IRepository.js";
import { Equipment } from "../models/Equipment.js";
import { User } from "../models/User.js";

export class EquipmentRepository implements IRepository<Equipment> {
  async findById(id: number): Promise<Equipment | null> {
    return await Equipment.findByPk(id);
  }
  async findAll(options?: any): Promise<Equipment[]> {
    return await Equipment.findAll(options);
  }

  async create(data: Partial<Equipment>): Promise<Equipment> {
    return await Equipment.create(data);
  }
  async update(
    id: number,
    data: Partial<Equipment>
  ): Promise<Equipment | null> {
    const equipment = await Equipment.findByPk(id);
    if (!equipment) return null;
    return await equipment.update(data);
  }
  async delete(id: number): Promise<boolean> {
    const equipment = await Equipment.findByPk(id);
    if (!equipment) return false;
    await equipment.destroy();
    return true;
  }

  // ? metodos extras

  async findBySerialNumber(serialNumber: string): Promise<Equipment | null> {
    return await Equipment.findOne({ where: { serialNumber } });
  }

  async findByUserId(userId: number): Promise<Equipment[]> {
    return await Equipment.findAll({
      where: { userId },
      include: [
        { model: User, as: "user", attributes: ["id", "email", "role"] },
      ],
    });
  }

  async findByIdWithUser(id: number): Promise<Equipment | null> {
    return await Equipment.findByPk(id, {
      include: [
        { model: User, as: "user", attributes: ["id", "email", "role"] },
      ],
    });
  }
}

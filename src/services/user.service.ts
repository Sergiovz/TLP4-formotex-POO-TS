import type { User } from "../models/User.js";
import type { UserRepository } from "../repositories/user.repositories.js";
import { ERROR_MESSAGES } from "../helpers/errors.js";
import { compareSync } from "../helpers/bcrypt.js";

export class UserService {
  // ? implementar userRepository para manejar la base de datos
  private userRepository: UserRepository;

  private ERROR = ERROR_MESSAGES;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  // ? CRUD básico

  // TODO: implementar validaciones y lógica de negocio

  async getUserById(id: number): Promise<User | null> {
    if (!id) {
      throw this.ERROR.USER.ID_REQUIRED;
    }
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw this.ERROR.USER.NOT_FOUND;
    }

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    if (!email) {
      throw this.ERROR.USER.EMAIL_REQUIRED;
    }
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw this.ERROR.USER.NOT_FOUND;
    }

    return user;
  }

  async createUser(data: Partial<User>): Promise<User> {
    if (!data.email || !data.password || !data.username) {
      throw this.ERROR.USER.CREDENTIALS_REQUIRED;
    }
    const exists = await this.userRepository.findUserByEmail(data.email);

    if (exists) {
      throw this.ERROR.USER.EMAIL_REGISTERED;
    }
    return await this.userRepository.create(data);
  }

  async updateUser(id: number, data: Partial<User>): Promise<User | null> {
    if (!id) {
      throw this.ERROR.USER.ID_REQUIRED;
    }
    const user = await this.userRepository.update(id, data);
    return user;
  }

  async deleteUser(id: number): Promise<Boolean> {
    if (!id) {
      throw this.ERROR.USER.ID_REQUIRED;
    }
    const deleted = await this.userRepository.delete(id);
    return deleted;
  }

  // TODO: añadir más métodos especificos de user

  // ? métodos para gestionar roles y permisos
  // ? métodos para gestionar autenticación y autorización
  async validatePassword(email: string, password: string): Promise<boolean> {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw this.ERROR.USER.NOT_FOUND;
    }

    const isValid = compareSync(password, user.password);

    if (!isValid) {
      throw this.ERROR.USER.PASSWORDS_DONT_MATCH;
    }

    return true;
  }

  async getUserRole(id: number): Promise<string> {
    const user = await this.getUserById(id);

    if (!user) {
      throw this.ERROR.USER.NOT_FOUND;
    }

    const role = user.role;

    if (!role) {
      throw this.ERROR.AUTH.ROLE.MISSING;
    }

    return role;
  }
}

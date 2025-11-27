import { ERROR_MESSAGES } from "../helpers/errors.js";
import { signJwt } from "../helpers/jwt.js";
import type { IRegister } from "../interfaces/IRegister.js";
import type { User } from "../models/User.js";
import type { UserService } from "./user.service.js";

export class AuthService {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userService.getUserByEmail(email);

    await this.userService.validatePassword(email, password);

    const payload = {
      id: user?.id,
      email: user?.email,
      role: user?.role,
    };

    return signJwt(payload);
  }

  async register(data: IRegister): Promise<User> {
    let { username, email, password, role } = data;

    if (!role) {
      role = "user";
    }

    const newUser = await this.userService.createUser({
      username,
      email,
      password,
      role,
    });

    return newUser;
  }

  async checkRole(role: string): Promise<void> {
    if (!role) {
      throw ERROR_MESSAGES.AUTH.ROLE.FORBIDDEN;
    }
  }

  async checkPermissions(permissions: string[]) {}
}

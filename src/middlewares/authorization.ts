import type { NextFunction, Request, Response } from "express";
import { ERROR_MESSAGES } from "../helpers/errors.js";
import { verify } from "../helpers/jwt.js";
import { User } from "../models/User.js";
import type { IRequest } from "../interfaces/IRequest.js";

export class Authorization {
  static async isAuthenticated(
    req: IRequest,
    res: Response,
    next: NextFunction
  ) {
    const authHeaders = req.headers.authorization;

    if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
      return res.status(401).json(ERROR_MESSAGES.AUTH.INVALID_TOKEN);
    }

    const token = authHeaders.split(" ")[1];

    if (!token) {
      return res.status(401).json(ERROR_MESSAGES.AUTH.NO_TOKEN);
    }

    const result = verify(token);

    if (!result.valid || !result.decoded) {
      return res.status(401).json(ERROR_MESSAGES.AUTH.INVALID_TOKEN);
    }
    const decoded = result.decoded;
    const id = decoded.id;

    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return res.status(401).json(ERROR_MESSAGES.AUTH.UNAUTHORIZED);
    }
    req.user = user;
    next();
  }
  static async isAdmin(req: IRequest, res: Response, next: NextFunction) {
    if (req.user?.role !== "admin") {
      return res.status(403).json(ERROR_MESSAGES.AUTH.ROLE.FORBIDDEN);
    }
    next();
  }
}

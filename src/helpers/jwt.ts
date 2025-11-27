import jwt from "jsonwebtoken";
import { env } from "../config/environment.js";

const config = env.jwt;

interface JwtPayload {
  id: number;
  email: string;
  role: string;
}

export const signJwt = (payload: string | object) => {
  return jwt.sign(payload, config.secret, { expiresIn: config.expiresIn });
};

export const verify = (token: string) => {
  try {
    const decoded = jwt.verify(token, config.secret) as JwtPayload;
    return { valid: true, expired: false, decoded };
  } catch (error) {
    console.error("JWT Verification Error:", {
      message: (error as Error).message,
    });
    return {
      valid: false,
      decoded: null,
    };
  }
};

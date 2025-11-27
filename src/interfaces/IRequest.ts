import type { Request } from "express";

export interface IRequest extends Request {
  user?:
    | {
        id: number;
        email: string;
        role: string;
      }
    | undefined;
}

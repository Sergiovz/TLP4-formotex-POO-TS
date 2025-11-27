import { body, validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";

export class Validator {
  static userLogin() {
    return [
      body("email").isEmail().notEmpty().withMessage("El email es requerido"),
      body("password")
        .isString()
        .notEmpty()
        .withMessage("La contraseña es requerida"),
    ];
  }
  static userRegister() {
    return [
      body("username")
        .isString()
        .notEmpty()
        .withMessage("El campo username es requerido"),
      body("email")
        .isEmail()
        .notEmpty()
        .withMessage("El campo email es requerido"),
      body("password")
        .isString()
        .isLength({ min: 6 })
        .withMessage("El campo password es requerido"),
      body("role")
        .isIn(["admin", "user"])
        .optional()
        .withMessage("Rol inválido"),
    ];
  }

  static equipmentCreate() {
    return [
      body("name")
        .isString()
        .notEmpty()
        .withMessage("El nombre del equipo es requerido"),
      body("type")
        .isString()
        .notEmpty()
        .withMessage("El tipo del equipo es requerido"),
      body("serialNumber")
        .isString()
        .notEmpty()
        .withMessage("El número de serie es requerido"),
      body("location")
        .isString()
        .notEmpty()
        .withMessage("La ubicación es requerida"),
      body("status")
        .isIn(["active", "inactive", "maintenance"])
        .withMessage("Estado inválido"),
      body("purchaseDate")
        .isDate()
        .withMessage("La fecha de compra es requerida"),
    ];
  }

  static equipmentUpdate() {
    return [
      body("name").isString().optional(),
      body("type").isString().optional(),
      body("serialNumber").isString().optional(),
      body("location").isString().optional(),
      body("status").isIn(["active", "inactive", "maintenance"]).optional(),
      body("purchaseDate").isDate().optional(),
    ];
  }

  static equipmentSerialSearch() {
    return [
      body("serialNumber")
        .isString()
        .notEmpty()
        .withMessage("El número de serie es requerido"),
    ];
  }

  static validate(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
}

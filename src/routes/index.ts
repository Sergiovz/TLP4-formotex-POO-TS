import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./users.routes.js";
import equipmentRoutes from "./equipments.routes.js";

const router = Router();

// ? Rutas de autenticación
router.use("/auth", authRoutes);

// ? Rutas de usuarios
router.use("/users", userRoutes);

// ? Rutas de equipos
router.use("/equipments", equipmentRoutes);

export default router;

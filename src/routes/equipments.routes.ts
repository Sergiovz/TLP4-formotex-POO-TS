import { Router } from "express";
import { EquipmentController } from "../controllers/equipment.controller.js";
import { Validator } from "../middlewares/validator.js";
import { EquipmentService } from "../services/equipment.service.js";
import { EquipmentRepository } from "../repositories/equipment.repository.js";
import { Authorization } from "../middlewares/authorization.js";

const router = Router();
const equipmentRepository = new EquipmentRepository();
const equipmentService = new EquipmentService(equipmentRepository);
const equipmentController = new EquipmentController(equipmentService);

router.use(Authorization.isAuthenticated);

// ? CRUD básico
router.get(
  "/",
  Authorization.isAdmin,
  equipmentController.getEquipments.bind(equipmentController)
);
router.get(
  "/:id",
  Authorization.isAdmin,
  equipmentController.getEquipmentById.bind(equipmentController)
);

router.post(
  "/",
  Authorization.isAdmin,
  Validator.equipmentCreate(),
  Validator.validate,
  equipmentController.createEquipment.bind(equipmentController)
);

router.patch(
  "/:id",
  Authorization.isAdmin,
  Validator.equipmentUpdate(),
  Validator.validate,
  equipmentController.updateEquipment.bind(equipmentController)
);

router.delete(
  "/:id",
  Authorization.isAdmin,
  equipmentController.deleteEquipment.bind(equipmentController)
);

// ? Rutas extra
router.post(
  "/:id/assign",
  Authorization.isAdmin,
  equipmentController.assignEquipmentToUser.bind(equipmentController)
);
router.post(
  "/:id/unassign",
  Authorization.isAdmin,
  equipmentController.unassignEquipmentFromUser.bind(equipmentController)
);
router.get(
  "/user/:userId",
  Authorization.isAuthenticated,
  equipmentController.getEquipmentByUserId.bind(equipmentController)
);
router.get(
  "/available",
  Authorization.isAuthenticated,
  equipmentController.getAvailableEquipment.bind(equipmentController)
);

router.get(
  "/:id/status",
  Authorization.isAdmin,
  equipmentController.getEquipmentStatus.bind(equipmentController)
);

router.put(
  "/:id/status",
  Authorization.isAdmin,
  equipmentController.updateEquipmentStatus.bind(equipmentController)
);
router.get(
  "/serial/search",
  Authorization.isAuthenticated,
  Validator.equipmentSerialSearch(),
  Validator.validate,
  equipmentController.getEquipmentBySerialNumber.bind(equipmentController)
);

export default router;

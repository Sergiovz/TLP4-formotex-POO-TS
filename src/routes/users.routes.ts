import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { UserService } from "../services/user.service.js";
import { UserRepository } from "../repositories/user.repositories.js";
import { Authorization } from "../middlewares/authorization.js";

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// ? middlewares de autorización

router.use(Authorization.isAuthenticated);

// ? CRUD básico
router.get(
  "/",
  Authorization.isAdmin,
  userController.getAllUsers.bind(userController)
);
router.get(
  "/:id",
  Authorization.isAdmin,
  userController.getUserById.bind(userController)
);
router.post(
  "/",
  Authorization.isAdmin,
  userController.createUser.bind(userController)
);
router.put(
  "/:id",
  Authorization.isAdmin,
  userController.updateUser.bind(userController)
);
router.delete(
  "/:id",
  Authorization.isAdmin,
  userController.deleteUser.bind(userController)
);

export default router;

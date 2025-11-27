import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { Validator } from "../middlewares/validator.js";
import { AuthService } from "../services/auth.service.js";
import { UserRepository } from "../repositories/user.repositories.js";
import { UserService } from "../services/user.service.js";
import { Authorization } from "../middlewares/authorization.js";

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authService = new AuthService(userService);
const authController = new AuthController(authService);

const loginValidator = Validator.userLogin();
const registerValidator = Validator.userRegister();
const validatorMiddleware = Validator.validate;

router.post(
  "/login",
  loginValidator,
  validatorMiddleware,
  authController.login.bind(authController)
);
router.post(
  "/register",
  registerValidator,
  validatorMiddleware,
  authController.register.bind(authController)
);

router.post(
  "/logout",
  Authorization.isAuthenticated,
  authController.logout.bind(authController)
);

export default router;

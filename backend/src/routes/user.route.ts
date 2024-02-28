import { UserController } from "../controller";
import { Router } from "express";
import validateToken from "../middleware/validation.token.handler";

const router = Router();

router.post("/register", UserController.registerUser);

router.post("/login", UserController.loginUser);

router.use(validateToken);

// router
//   .route("/users/:user_id")
//   .put(UserController.updateUser)
//   .delete(UserController.deleteUser);

export default router;

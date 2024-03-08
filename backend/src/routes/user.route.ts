import { UserController, AddressController } from "../controller";
import { Router } from "express";
import validateToken from "../middleware/validation.token.handler";
import { validateUserData } from "../middleware/validate.data";

const router = Router();

router.post("/register", validateUserData, UserController.registerUser);

router.post("/login", UserController.loginUser);

router.use(validateToken);

router
  .route("/user/:userId")
  .get(UserController.getUserById)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

router.route("/user/:userId/address").post(AddressController.insertAddress);

export default router;

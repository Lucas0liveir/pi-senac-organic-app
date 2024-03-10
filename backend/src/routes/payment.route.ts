import { Router } from "express";
import validateToken from "../middleware/validation.token.handler";
import * as paymentController from "../controller/payment/payment"
const router = Router();

router.use(validateToken);

router
    .route("/payment/:customerId")
    .post(paymentController.createPayment)

    
router.route("/subscription/:customerId").post(paymentController.createSubs);


export default router;
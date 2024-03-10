import { Request, Response } from "express";
import paymentService from "../../service/payment.service";


export const createPayment = async (req: Request, res: Response) => {
    const { customerId } = req.params;
    const { amount } = req.body;
    const { ephemeralkey, paymentIntent } = await paymentService.createPayment(customerId, amount)

    res.status(200).json({
        status: res.statusCode,
        data: { ephemeralkey, paymentIntent },
    });
};

export const createSubs = async (req: Request, res: Response) => {
    const { customerId } = req.params;
    const { ephemeralkey, paymentIntent } = await paymentService.createSubscription(customerId)

    res.status(200).json({
        status: res.statusCode,
        data: { ephemeralkey, paymentIntent },
    });
};
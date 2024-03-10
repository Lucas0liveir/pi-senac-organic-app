import Stripe from "stripe"
import { BadRequestError } from "../helper/api.error"

class PaymentService {

    private stripe: Stripe

    constructor() {
        const sk = process.env.STRIPE_SK as string
        this.stripe = new Stripe(sk)
    }

    private async CreateEphemeralkey(customerId: string) {
        try {
            const ephemeralKey = await this.stripe.ephemeralKeys.create(
                { customer: customerId },
                { apiVersion: '2022-11-15' }
            );

            return ephemeralKey
        } catch (error: any) {
            throw new BadRequestError(error?.message as string)
        }
    }

    async createCustomer(email: string) {
        try {
            const { id } = await this.stripe.customers.create({
                email
            })

            return id
        } catch (error) {

        }
    }

    async createSubscription(customerId: string) {
        try {

            const product = "price_1OsZXMGiMV6RYH8nEw8ifwpy"
            const ephemeralkey = await this.CreateEphemeralkey(customerId)
            const subscription = await this.stripe.subscriptions.create({
                customer: customerId,
                items: [
                    {
                        price: product,
                    }
                ],
                payment_behavior: 'default_incomplete',
                payment_settings: { save_default_payment_method: 'on_subscription' },
                expand: ['latest_invoice.payment_intent']
            });

            const paymentIntent = (subscription.latest_invoice as Stripe.Invoice).payment_intent as Stripe.PaymentIntent

            return {
                subscriptionId: subscription.id,
                paymentIntent: paymentIntent.client_secret,
                ephemeralkey
            }
        } catch (error: any) {
            throw new BadRequestError(error?.message as string)
        }
    }

    async createPayment(customerId: string, amount: number) {
        try {
            const ephemeralkey = await this.CreateEphemeralkey(customerId)
            const paymentIntent = await this.stripe.paymentIntents.create({
                amount: amount * 100,
                currency: 'brl',
                customer: customerId,
                // In the latest version of the API, specifying the `automatic_payment_methods` parameter
                // is optional because Stripe enables its functionality by default.
                automatic_payment_methods: {
                    enabled: true,
                },
            });

            return { paymentIntent: paymentIntent.client_secret, ephemeralkey }
        } catch (error: any) {
            throw new BadRequestError(error?.message as string)
        }
    }
}

export default new PaymentService()
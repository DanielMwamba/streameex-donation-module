import Stripe from "stripe"
import { createDonation } from "./donation"

type CreateStripeSessionDto = {
  currency: 'usd' | 'cdf'
  unitAmount: number
  redirectUrl: string
  userId: string
  eventId: string
}

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY ?? '')

export const createStripeIdSession = async (dto: CreateStripeSessionDto) => {
  const donation = await createDonation({
    amount: dto.unitAmount,
    userId: dto.userId,
    eventId: dto.eventId,
    method: 'stripe',
  })
  if (!donation) return null
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: dto.currency,
            product_data: {
              name: "Don",
            },
            unit_amount: dto.unitAmount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: dto.redirectUrl,
      cancel_url: dto.redirectUrl,
      metadata: {
        reference: donation.reference,
        userId: dto.userId,
        eventId: dto.eventId,
      }
    })
    return session.id
  } catch (error) {
    console.log(error)
    return null
  }
}

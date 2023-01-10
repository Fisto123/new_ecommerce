import express from "express";
import Stripe from "stripe";
import Order from "../models/order.js";
const stripe = new Stripe(
  "sk_test_51LMTFCBggtccEOr5cZZ52IoXxorG12tPwZBVgUHDatCBNORFEQcvMatBGiMKQE5BhqmY8z5GP0NhdKyD3utpmJAS008CjK8RaP"
);
export const stripePayment = async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      // cart: JSON.stringify(req.body.cartItems),
    },
  });
  const line_items = req.body.cartItems.map((item) => {
    console.log(item);
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
          description: item.desc,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.cartQuantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: { allowed_countries: ["US", "CA", "NG"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "usd" },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 5 },
            maximum: { unit: "business_day", value: 7 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
          display_name: "Next day air",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],

    phone_number_collection: { enabled: true },
    customer: customer.id,
    line_items,
    mode: "payment",
    success_url: `http://localhost:3000/checkout_success`,
    cancel_url: `http://localhost:3000/cart`,
  });

  res.send({ url: session.url });
};

export const createOrder = async (customer, data, lineItems) => {
  // const items = JSON.parse(customer.metadata.cart);
  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products: lineItems.data,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  });
  console.log(newOrder);
  try {
    const savedOrder = await newOrder.save();
    //send email

    return res.status(200).json(savedOrder);
  } catch (error) {
    console.log(error);
  }
};

let endpointSecret;
//endpointSecret = 'whsec_c8b7b415a653dfa8443ccb47c348c47e5b004893abb2f0e3152475bf1116a923'
export const webHookPayment = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let data;
  let eventType;
  if (endpointSecret) {
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log("webhook verified  ");
    } catch (error) {
      console.log(error.message);
      res.status(400).send(error.message);
      return;
    }
    data = event.data.object;
    eventType = event.type;
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }
  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then((customer) => {
        stripe.checkout.sessions.listLineItems(
          data.id,
          {},
          function (err, lineItems) {
            console.log("Line items", lineItems);
            createOrder(customer, data, lineItems);
          }
        );
      })
      .catch((err) => console.log(err.message));
  }

  res.send().end();
};

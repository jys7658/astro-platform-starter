// netlify/functions/create-checkout-session.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: '영어 온라인 강의',
                },
                unit_amount: 2000,
            },
            quantity: 1,
        }],
        mode: 'payment',
        success_url: `${process.env.URL}/success`,
        cancel_url: `${process.env.URL}/cancel`,
    });

    return {
        statusCode: 200,
        body: JSON.stringify({ id: session.id }),
    };
};

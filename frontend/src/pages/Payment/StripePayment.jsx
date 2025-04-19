//StripePayment.js
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import PaymentForm from "./PaymentForm";

const stripe = loadStripe('pk_test_51RFbFHRoY4k21AFiuaFf6ZhIUGsj32sU2dR5LKtY7Z04HG8zjCTbg7WwyQZNTkgdAB741OQgrz0LPY5aG85JZs7200xaj8tEuC');

const StripePayment = () => {
    const [clientSecret, setClientSecret] = useState(null);

    useEffect(() => {
        axios
            .post("http://localhost:8000/create-payment-intent", {
                amount: 5000,
            })
            .then((resp) => setClientSecret(resp.data.clientSecret));
    }, []);

    const options = {
        clientSecret,
        theme: "stripe",
    };

    return (
        clientSecret && (
            <Elements stripe={stripe} options={options}>
                <PaymentForm></PaymentForm>
            </Elements>
        )
    );
};

export default StripePayment;

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { PaymentFormContainer, FormContainer } from "./payment-form.styles";
import axios from "axios";
import Cookies from "js-cookie";
const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const paymentHandler = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    console.log(token);
    if (!stripe || !elements) {
      return;
    }

    let data = JSON.stringify({
      amount: 500 * 100,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:4000/api/products/checkout",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: data,
    };
    try {
      const respond = await axios.request(config);
      const {
        paymentIntent: { client_secret },
      } = respond.data;
      const paymentResult = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "lykimsour",
          },
        },
      });
      if (paymentResult.error) {
        alert(paymentResult.error);
      } else {
        if (paymentResult.paymentIntent.status === "succeeded") {
          alert("success");
        }
      }
      console.log(paymentResult);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit card payment</h2>
        <CardElement />
        <Button type={BUTTON_TYPE_CLASSES.inverted}>Pay Now</Button>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;

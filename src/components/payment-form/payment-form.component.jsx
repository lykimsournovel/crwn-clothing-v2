import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  PaymentFormContainer,
  FormContainer,
  CardContainer,
} from "./payment-form.styles";
import { axiosPost } from "../../utils/axios/axios.utils";
import "./payment.style.css";

const PaymentForm = (props) => {
  const { cardTotal } = props;
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const data = {
      amount: cardTotal * 100,
    };

    try {
      const respond = await axiosPost("api/products/checkout", data);
      const { client_secret } = respond.data.paymentIntent;

      const methodData = {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "lykimsour",
        },
      };

      const paymentResult = await stripe.confirmCardPayment(client_secret, {
        payment_method: methodData,
      });

      if (paymentResult.error) {
        alert(paymentResult.error);
      } else {
        if (paymentResult.paymentIntent.status === "succeeded") {
          alert("success");
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit card payment</h2>
        <CardElement />
        <br />
        <Button type={BUTTON_TYPE_CLASSES.inverted}>Pay Now</Button>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;

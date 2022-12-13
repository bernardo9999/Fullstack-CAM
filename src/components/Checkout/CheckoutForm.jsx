import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { ref, update } from "firebase/database";
import { useEffect, useState } from "react";

import styled from "@emotion/styled";
import axios from "axios";
import Router from "next/router";
import { auth, db } from "../../../firebase";
import BillingDetailsFields from "./prebuilt/BillingDetailsFields";
import CheckoutError from "./prebuilt/CheckoutError";
import Row from "./prebuilt/Row";
import SubmitButton from "./prebuilt/SubmitButton";

const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;

  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

const CheckoutForm = ({ price, name, setIsBuying, photo, data, id }) => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  const [mintTickets, setMintTickets] = useState(0);
  const [eventTickets, setEventTickets] = useState(0);

  const eventId = id;
  useEffect(() => {
    const getTickets = async () => {
      await fetch(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/events/` + eventId + ".json"
      )
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setEventTickets(data.quantity);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getTickets();
  }, [eventId]);

  useEffect(() => {
    if (data) {
      setMintTickets(data.mintTickets);
    }
  }, [data]);

  const stripe = useStripe();
  const elements = useElements();

  const onSuccessfulCheckout = async () => {
    async function writeUserData() {
      const user = auth.currentUser;
      const randomId = Math.floor(Math.random() * 1000000);
      await update(ref(db, "users/" + user.uid + "/entradas/" + randomId), {
        name: name,
        image: photo,
        price: price,
        isMinted: false,
        id: randomId,
      });
      const userData = await axios(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/users/${user?.uid}.json`
      );
      await update(ref(db, "users/" + user.uid), {
        mintTickets: (userData?.data?.mintTickets || 0) + 1,
      });
      await update(ref(db, "events/" + eventId), {
        quantity: eventTickets - 1,
      });
    }
    await writeUserData();
    Router.push("/success");
  };

  const handleCardDetailsChange = (ev) => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  const handleFormSubmit = async (ev) => {
    try {
      ev.preventDefault();
      const billingDetails = {
        name: ev.target.name.value,
        email: ev.target.email.value,
        address: {
          city: ev.target.city.value,
          line1: ev.target.address.value,
          state: ev.target.state.value,
          postal_code: ev.target.zip.value,
        },
      };
      setProcessingTo(true);
      const { data: clientSecret } = await axios.post(
        "https://stripe-payment-createpi.herokuapp.com/",
        {
          amount: price * 100,
          currency: "brl",
        }
      );
      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: billingDetails,
      });

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);

        return;
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id,
      });

      if (error) {
        setCheckoutError(error.message);
        return;
      }

      await onSuccessfulCheckout();
    } catch (err) {
      setCheckoutError(err.message);
    } finally {
      setProcessingTo(false);
    }
  };

  useEffect(() => {
    //deactivate scroll
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const iframeStyles = {
    base: {
      color: "#fff",
      fontSize: "16px",
      iconColor: "#fff",
      "::placeholder": {
        color: "var(--branco)",
      },
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE",
    },
    complete: {
      iconColor: "#cbf4c9",
    },
  };

  const cardElementOpts = {
    iconStyle: "solid",
    style: iframeStyles,
    hidePostalCode: true,
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      style={{ position: "relative", padding: "0rem 1rem" }}
    >
      <span
        style={{
          color: "var(--rosa)",
          fontSize: "1.5rem",
          fontWeight: "bold",
          textAlign: "center",
          top: "-22px",
          right: "16px",
          position: "absolute",
          background: "var(--azul)",
          borderRadius: "14px",
          padding: "0.5rem 1rem",
          cursor: "pointer",
        }}
        onClick={() => {
          setIsBuying(false);
        }}
      >
        X
      </span>
      <Row>
        <BillingDetailsFields />
      </Row>
      <Row>
        <CardElementContainer>
          <CardElement
            options={cardElementOpts}
            onChange={handleCardDetailsChange}
          />
        </CardElementContainer>
      </Row>
      {checkoutError && <CheckoutError>{checkoutError}</CheckoutError>}
      <Row>
        <SubmitButton disabled={isProcessing || !stripe}>
          {isProcessing ? (
            <span
              style={{
                color: "black",
              }}
            >
              Processando...
            </span>
          ) : (
            <span
              style={{
                color: "black",
               
              }}
            >
              Pagar R${price} para entrada
            </span>
          )}
        </SubmitButton>
      </Row>
    </form>
  );
};

export default CheckoutForm;

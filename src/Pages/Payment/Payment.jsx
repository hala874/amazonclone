import React, { useContext, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import styles from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormatter from "../../Components/CurrencyFormatter/CurrencyFormatter";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payment() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);

  const totalPrice = basket?.reduce( // ADD OPTIONAL CHAINING
    (amount, item) => item.price * item.amount + amount,
    0
  );

  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    // ADD VALIDATION CHECKS
    if (!stripe || !elements) {
      setCardError("Stripe is not loaded yet. Please wait a moment.");
      return;
    }

    if (!basket || basket.length === 0) {
      setCardError("Your basket is empty. Add items before payment.");
      return;
    }

    try {
      //1. backend contacting || functions --> to get the contact secret
      setProcessing(true);
      setCardError(""); // Clear previous errors
      
      // FIXED API ENDPOINT - changed from '/payment/create' to '/payments/create'
      const response = await axiosInstance({
        method: "POST",
        url: `/payments/create?total=${totalPrice * 100}`, // FIXED ENDPOINT
      });
      
      console.log(response.data);
      const clientSecret = response.data?.clientSecret;
      
      if (!clientSecret) {
        throw new Error("No client secret received from server");
      }

      // 2. client side(react based) confirmation
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        setCardError(error.message);
        setProcessing(false);
        return;
      }

      console.log(paymentIntent);
      
      // 3. after the confirmation --> order firestore database save, then clear basket
      await setDoc(
        doc(collection(db, "users", user.uid, "orders"), paymentIntent.id),
        {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        }
      );
      
      // Empty the basket
      dispatch({
        type: Type.EMPTY_BASKET,
      });
      setProcessing(false);

      // Navigation to Orders page done
      navigate("/orders", { state: { msg: "You have placed a new order" } });
    } catch (error) {
      console.log(error);
      setCardError(error.message || "Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/* header */}
      <div className={styles.payment__header}>Checkout ({totalItem}) items</div>
      {/* payment method */}
      <section className={styles.payment}>
        {/* address */}
        <div className={styles.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>React Lane</div> {/* FIXED: removed extra backtick */}
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />

        {/* product */}
        <div className={styles.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item, index) => (
              <ProductCard product={item} key={index} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* card form */}
        <div className={styles.flex}>
          <h3>Payment methods</h3>
          <div className={styles.payment__card__container}>
            <div className={styles.payment__details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red", display: "block", marginBottom: "10px" }}>{cardError}</small>
                )}
                {/* card elemet */}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={styles.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order</p> |{" "}
                      <CurrencyFormatter amount={totalPrice} />
                    </span>
                  </div>
                  <button 
                    type="submit"
                    disabled={processing || !stripe || !basket || basket.length === 0} // ADD DISABLED STATE
                  >
                    {processing ? (
                      <div className={styles.loading}>
                        <ClipLoader size={15} />
                        <p>Please wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
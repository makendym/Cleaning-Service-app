import React from "react";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import "./styles.css";

const PaymentComponent = ({prices, onPaymentSuccess }) => {
  const total = prices.total || 0;
  const handleCardTokenizeResponse = async (token, verifiedBuyer) => {
    try {
      const response = await fetch("http://localhost:8000/process-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sourceId: token.token,
          amount: Math.round(total * 100),
        }),
        credentials: "include", // Ensure cookies are included in cross-site requests
      });
      const responseData = await response.json();
      alert(JSON.stringify(responseData, null, 2));
      if (response.ok) {
        onPaymentSuccess();
      } else {
        console.error("Payment failed");
      }
    } catch (error) {
      console.error("Payment processing error:", error);
    }
  };

  return (
    <div className="container">
      <PaymentForm
        applicationId={process.env.REACT_APP_SQUARE_APPLICATION_ID}
        locationId={process.env.REACT_APP_SQUARE_LOCATION_ID}
        cardTokenizeResponseReceived={handleCardTokenizeResponse}
        createPaymentRequest={() => ({
          countryCode: "US",
          currencyCode: "USD",
          total: {
            amount: total.toFixed(2),
            label: "Total",
          },
        })}
      >
        <CreditCard />
      </PaymentForm>
    </div>
  );
};

export default PaymentComponent;

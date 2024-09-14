import React from "react";
import ReactDOM from "react-dom";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

export default class Payment extends React.Component {
  createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "0.01",
          },
        },
      ],
    });
  }

  onApprove(data, actions) {
    return actions.order.capture();
  }

  render() {
    return (
      <PayPalScriptProvider
        options={{
          "client-id":
            "AS565exCyACTZ2LRBmae5mLOvS8legvXTuOBvf3BbeLIzgQb-L5Klgo9CmG6XAXdOvdVyaAqkRjfcLMj",
        }}
      >
        <PayPalButtons style={{ layout: "horizontal" }} />
      </PayPalScriptProvider>
      //   <PayPalButton
      //     createOrder={(data, actions) => this.createOrder(data, actions)}
      //     onApprove={(data, actions) => this.onApprove(data, actions)}
      //   />
    );
  }
}
// export default Payment;

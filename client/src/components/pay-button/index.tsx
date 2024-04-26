
import { PayPalButtons } from "@paypal/react-paypal-js";
import api from "@utils/api";

export function PayButton({amount, fundId, receiverEmail}) {
  const handleApprove = async (details) => {
   // details.payer.name.given_name;
    //await api.post('/transaction/create-payout')
    console.log(details)
  };

  return (
      <PayPalButtons 
          style={{ layout: "vertical" }}
          createOrder={(data, actions) => {
              return actions.order.create({
                  purchase_units: [{
                      amount: {
                        currency_code: 'USD',
                        value: String(200)
                      },
                      payee: {
                          email_address: receiverEmail
                      }
                  }],
                  intent: "CAPTURE",
                  application_context: {
                      shipping_preference: "NO_SHIPPING" 
                  }
              });
          }}
          onApprove={(data, actions) => {
              return actions.order.capture().then(details => {
                  handleApprove(details);
              });
          }}
          onError={(err) => {
              console.error("Payment Error: ", err);
              
          }}
          onCancel={() => {
              console.log("Payment cancelled.");
              
          }}
      />
  );
}
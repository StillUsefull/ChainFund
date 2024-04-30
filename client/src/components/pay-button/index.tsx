import { notifySuccess } from "@components/notifications";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import api from "@utils/api";
import { useAuth } from "@utils/auth";
import { useState, useEffect } from "react";
import { Alert, Col, Form, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

export function PayButton({ fundId, receiverEmail}) {
    const initialOptions = {
        'clientId': import.meta.env.VITE_PAYPAL_CLIENTID,
        currency: "USD",
        intent: "capture",
    };
    const [amount, setAmount] = useState(0);
    const [showButtons, setShowButtons] = useState(false);
    const { user } = useAuth(); 
    useEffect(() => {
        if (amount > 0) {
            setShowButtons(true);
        } else {
            setShowButtons(false);
        }
    }, [amount]);

    const handleApprove = async (details) => {
        console.log('Transaction details:', details);
        await api.post(`/transaction/payout/${fundId}`, { amount: amount.toFixed(2) });
        notifySuccess('Thanks for your donation');
    };

    const createOrder = (data, actions) => {
        console.log('Order amount:', amount.toFixed(2));
        return actions.order.create({
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: amount.toFixed(2)
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
    };


    if (!user) {
        
        return (
            <Alert variant="warning" style={{fontSize: '25px'}}>
                Only logged in users can make donations.
            </Alert>
        );
    }

    return (
        <>  
            <ToastContainer />
            <PayPalScriptProvider options={initialOptions}>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="donationAmount">
                                <Form.Label>Enter Donation Amount (USD)</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0.01"
                                    step="0.01" 
                                    style={{width: '750px'}}
                                    value={amount}
                                    onChange={e => {
                                        const inputVal = e.target.value;
                                        const newValue = parseFloat(inputVal);
                                        console.log('Raw input:', inputVal); 
                                        if (!isNaN(newValue) && newValue >= 0.01) {
                                            setAmount(newValue);
                                        } else if (inputVal === "") {
                                            setAmount(0); 
                                        }
                                    }}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <br/>
                {showButtons && (
                    <PayPalButtons 
                        key={amount}
                        style={{ layout: "vertical" }}
                        createOrder={createOrder}
                        onApprove={(data, actions) => {
                            return actions.order.capture().then(handleApprove);
                        }}
                        onError={(err) => {
                            console.error("Payment Error: ", err);
                        }}
                        onCancel={() => {
                            console.log("Payment cancelled.");
                        }}
                    />
                )}
            </PayPalScriptProvider>
        </>
    );
}

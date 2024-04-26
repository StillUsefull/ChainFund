import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import api from '@utils/api';
import { PayButton } from '@components/pay-button';

export function OneFundPage() {
  const { id } = useParams();
  const [fund, setFund] = useState(null);
  const [amount, setAmount] = useState(0);
  const initialOptions = {
    'clientId': import.meta.env.VITE_PAYPAL_CLIENTID,
    currency: "USD",
    intent: "capture",
};

  useEffect(() => {
    const fetchFundData = async () => {
      try {
        const response = await api.get(`/cash-collection/findOne/${id}`);
        setFund(response.data);
      } catch (err) {
        console.error('Error fetching fund:', err);
      }
    };

    fetchFundData();
  }, [id]);

  if (!fund) {
    return <Container>Loading...</Container>;
  }
  
  return (
    <Container className="mt-5">
      <Row>
        <Col md={8}>
          <h1>{fund.title}</h1>
          <p>{fund.text}</p>
        </Col>
        <Col md={4}>
          <img src={fund.photo} alt={fund.title} style={{ width: '100%', height: 'auto' }} />
        </Col>
      </Row>
      <PayPalScriptProvider options={initialOptions}>
        <Row className="mt-4">
          <Col md={6}>
            <Form>
              <Form.Group controlId="donationAmount">
                <Form.Label>Enter Donation Amount</Form.Label>
                <Form.Control
                  type="number"
                  min="0.01"
                  step="0.01" 
                  value={amount}
                  onChange={e => {
                    const newValue = e.target.value ? parseFloat(e.target.value) : 0;
                    setAmount(newValue >= 0.01 ? newValue : 0);
                  }}
                  placeholder="Amount in USD"
                />
              </Form.Group>
              {amount > 0 && (
                <PayButton amount={amount} receiverEmail={fund.payPalEmail} fundId={id}/>
              )}
            </Form>
          </Col>
        </Row>

      </PayPalScriptProvider>
      
    </Container>
  );
}
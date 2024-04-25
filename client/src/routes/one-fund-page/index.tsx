import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';

import api from '@utils/api';
import { PayButton } from '@components/pay-button';

export function OneFundPage() {
  const { id } = useParams();
  const [fund, setFund] = useState(null);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const fetchFundData = async () => {
      try {
        console.log(id)
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
      <Row className="mt-4">
        <Col md={6}>
          <Form>
            <Form.Group controlId="donationAmount">
              <Form.Label>Enter Donation Amount</Form.Label>
              <Form.Control
                type="text"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="Amount in USD"
              />
            </Form.Group>
            <PayButton amount={amount} projectId={id} />
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import api from '@utils/api';
import { PayButton } from '@components/pay-button';

export function OneFundPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fund, setFund] = useState(null);
  
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

  const handlePromote = () => {
    
    console.log('Promoting fund:', id);
    
  };

  if (!fund) {
    return <Container>Loading...</Container>;
  }

  const progress = Math.min((fund.state / fund.goal) * 100, 100);

  return (
    <Container className="mt-5">
      <Row>
        <Col md={8}>
          <h1>{fund.title}</h1>
          <p>{fund.text}</p>
          <h5>Collected: ${fund.state} of ${fund.goal}</h5>
          <ProgressBar now={progress} label={`${progress.toFixed(0)}%`} />
          <Button className="mt-3" onClick={handlePromote}>Promote</Button>
        </Col>
        <Col md={4}>
          <img src={fund.photo} alt={fund.title} style={{ width: '100%', height: 'auto' }} />
        </Col>
      </Row>
    
        <PayButton receiverEmail={fund.payPalEmail} fundId={id}/>
        
    </Container>
  );
}
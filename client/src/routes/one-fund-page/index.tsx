import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import api from '@utils/api';
import { PayButton } from '@components/pay-button';
import { notifyError, notifySuccess } from '@components/notifications';
import { ToastContainer } from 'react-toastify';
import { CreatorCard } from '@components/creator-card';  


export function OneFundPage() {
  const { id } = useParams();
  const [fund, setFund] = useState(null);
  const [creator, setCreator] = useState(null);

  

  useEffect(() => {
    const fetchFundData = async () => {
      try {
        const response = await api.get(`/cash-collection/findOne/${id}`);
        setFund(response.data);

        
        if (response.data.authorId) {
          const creatorResponse = await api.get(`/user/getOne/${response.data.authorId}`);
          setCreator(creatorResponse.data);
        }
      } catch (err) {
        console.error('Error fetching fund:', err);
      }
    };

    fetchFundData();
  }, [id]);

  const handlePromote = () => {
    api.get(`/cash-collection/promote/${id}`)
      .then(() => {
        notifySuccess('You promoted this fund');
      })
      .catch(() => {
        notifyError('You are not logged in or have already promoted this fund');
      });
  };

  if (!fund) {
    return <Container>Loading...</Container>;
  }

  const progress = Math.min((fund.state / fund.goal) * 100, 100);
  const promotersCount = fund.rating ? fund.rating.length : 0;

  return (
    <Container className="mt-5" style={{ fontFamily: 'cursive', color: '#2F45FF' }}>
      <ToastContainer />
      <Row>
        <Col md={8} className="text">
          <h1 style={{ textAlign: 'center' }}>{fund.title}</h1>
          <p style={{ textAlign: 'justify' }}>{fund.text}</p>
        </Col>
        <Col md={4}>
          <img src={fund.photo} alt={fund.title} style={{ width: '100%', height: 'auto' }} />
          <h6 className="mt-2">Number of promoters: {promotersCount}</h6>
          <Button variant='outline-success' size='lg' className="mt-3 w-100" onClick={handlePromote}>
            Promote
          </Button>
          <br/>
          {creator && (
            <CreatorCard
              id={creator.id}
              name={creator.name}
              semi={creator.semi}
              photo={creator.photo}
            />
          )}
        </Col>
      </Row>
    
      <h5>Collected: ${fund.state} of ${fund.goal}</h5>
      <ProgressBar striped variant="success" style={{ height: '40px', fontSize: '20px' }} now={progress} label={`${progress.toFixed(0)}%`} />
      <PayButton receiverEmail={fund.payPalEmail} fundId={id} />
      
      
    </Container>
  );
}

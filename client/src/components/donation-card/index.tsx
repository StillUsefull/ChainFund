import api from '@utils/api';
import { useEffect, useState } from 'react';
import { Card, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function DonationCard({ fundId, amount }) {
    const [fund, setFund]: [any, any] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        api.get(`/cash-collection/findOne/${fundId}`)
            .then((response) => {
                setFund(response.data);
            });
    }, [fundId]); 

    return (
        <Card style={{ width: '18rem', margin: '10px' }}>
            <Card.Body>
                <Card.Title>{fund.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    Fund: <Badge bg="secondary" onClick={() => navigate(`/funds/one/${fundId}`)} style={{ cursor: 'pointer' }}>{fundId}</Badge>
                </Card.Subtitle>
                <Card.Text>
                    Donation amount: {amount} $.
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default DonationCard;

import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

export function CreatorCard({ id, name, semi, photo }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/creator/${id}`);
  };

  return (
    <Card  style={{ width: '18rem', margin: '30px'}}>
      <Card.Img variant="top" src={photo} style={{ height: '250px', width: '100%', objectFit: 'cover' }}/>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {semi}
        </Card.Text>
        <Button variant="primary" onClick={handleClick} style={{background: '#88FCE2', color: '#D53F13'}}>Look profile</Button>
      </Card.Body>
    </Card>
  );
}


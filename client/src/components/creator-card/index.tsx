import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

export function CreatorCard({ id, name, semi, photo }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${id}`);
  };

  return (
    <Card  style={{ width: '18rem', margin: '30px'}}>
      <Card.Img variant="top" src={photo} />
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


import Card from 'react-bootstrap/Card';
import {useNavigate} from 'react-router-dom'
export function CashCollectionCard({ id, title, description, goal, category, photo }) {
  const navigate = useNavigate()
  const handlerCardClick = () => {
    navigate(`/funds/one/${id}`);
  }
  
  const textStyle = {
    color: '#FFF148',
    fontFamily: 'cursive',
  }

  return (
    <Card className="bg-dark text-white" onClick={handlerCardClick} style={{ width: '40rem', cursor: 'pointer', margin: '15px'}}>
      <Card.Img src={photo} alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title style={{...textStyle, fontSize: '25px'}}>{title}</Card.Title>
        <Card.Text style={textStyle}>
          Category: {category}
        </Card.Text>
        <Card.Text style={textStyle}>
          Description: {description}
        </Card.Text>
        <Card.Text style={textStyle}>
          Goal: {goal}
        </Card.Text>
        
      </Card.ImgOverlay>
    </Card>
  );
}
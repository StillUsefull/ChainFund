import Card from 'react-bootstrap/Card';
import {useNavigate} from 'react-router-dom'
export function CashCollectionCard({ id, title, description, goal, category, photo, admin }) {
  const navigate = useNavigate()
  const handlerCardClick = () => {
    if (!!admin){
      navigate(`/profile/funds/${id}`)
    } else {
      navigate(`/funds/one/${id}`);
    }
  }
  
  const textStyle = {
    color: '#FFF148',
    fontFamily: 'cursive',
  }
  const defaultPhoto = "https://via.placeholder.com/600x600";
  
  return (
    <Card 
    className="bg-dark text-white" 
    onClick={handlerCardClick} 
    style={{ width: '600px', height: '600px', cursor: 'pointer', margin: '15px', overflow: 'hidden' }}
  >
      <Card.Img src={photo || defaultPhoto} alt="Card image" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
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
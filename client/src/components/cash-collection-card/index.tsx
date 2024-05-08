import { truncateText } from '@utils/truncateText';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

export function CashCollectionCard({fund, admin}) {
  const navigate = useNavigate();

  const handlerCardClick = () => {
    if (admin) {
      navigate(`/profile/funds/${fund.id}`);
    } else {
      navigate(`/funds/one/${fund.id}`);
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const defaultPhoto = "https://via.placeholder.com/600x600";
  const promotersCount = fund.rating ? fund.rating.length : 0;


  const overlayStyle = promotersCount > 0 ? { color: '#7DFF53', fontFamily: 'cursive' } : { fontFamily: 'cursive', color: '#FFF148' };
  const textBackgroundStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    padding: '10px',
    borderRadius: '5px'
  };


  
  return (
    <Card 
      className="bg-dark text-white" 
      onClick={handlerCardClick} 
      style={{ width: '600px', height: '600px', cursor: 'pointer', margin: '15px', overflow: 'hidden' }}
    >
      <Card.Img src={fund.photo || defaultPhoto} alt="Card image" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
      <Card.ImgOverlay style={overlayStyle}>
        <div style={textBackgroundStyle}>
          <Card.Title style={{fontSize: '25px'}}>{fund.title}</Card.Title>
          <Card.Text>
            Category: {fund.category}
          </Card.Text>
          <Card.Text>
            Description: {truncateText(fund.text, 20)}
          </Card.Text>
          <Card.Text>
            Goal: {fund.goal}
          </Card.Text>
          <Card.Text>
            Rating: {promotersCount}
          </Card.Text>
          <Card.Text style={{position: 'absolute', bottom: '10px', right: '10px'}}>
            {formatDate(fund.createdAt)}
          </Card.Text>
        </div>
      </Card.ImgOverlay>
    </Card>
  );
}

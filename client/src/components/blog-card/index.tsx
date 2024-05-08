import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { truncateText } from '@utils/truncateText';

export function BlogCard({ post, admin }) {
  const { id, title, text, photo, socialLink } = post;
  const navigate = useNavigate();
  const defaultPhoto = "https://via.placeholder.com/600x600";

  const handleCardClick = () => {
    if (admin) {
      navigate(`/profile/posts/${id}`);
    } else {
      navigate(`/blog/one/${id}`);
    }
  };


  return (
    <Card className="mb-4" style={{ width: '600px', height: '600px', cursor: 'pointer' }} onClick={handleCardClick}>
      <motion.div whileHover={{ scale: 1.05 }} style={{ height: '100%', overflow: 'hidden' }}>
        <Card.Img variant="top" src={photo || defaultPhoto} style={{ height: '100%', objectFit: 'cover' }} />
        <Card.ImgOverlay style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Card.Body style={{ position: 'absolute', top: 0, left: 0, right: 0, background: 'rgba(255, 255, 255, 0.8)', padding: '10px' }}>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{truncateText(text)}</Card.Text>
          </Card.Body>
          {socialLink && (
            <motion.div whileHover={{ scale: 1.1 }} style={{ position: 'absolute', right: '40px', bottom: '40px' }}>
              <Button variant="primary" href={socialLink} target="_blank" onClick={(e) => e.stopPropagation()}>
                Social link
              </Button>
            </motion.div>
          )}
        </Card.ImgOverlay>
      </motion.div>
    </Card>
  );
}
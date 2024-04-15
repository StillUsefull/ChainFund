import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function BlogCard({ post }) {
  const { id, title, text, photo, socialLink } = post;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/blog/one/${id}`);
  };

  const truncateText = (text, limit = 30) => {
    return text.split(' ').slice(0, limit).join(' ') + '...';
  };

  return (
    <div className="card mb-4" style={{ width: '1000px', cursor: 'pointer' }} onClick={handleCardClick}>
      <motion.div style={{ position: 'relative' }}
        whileHover={{ scale: 1.05 }}
      >
        <img
          src={photo}
          alt="Blog Post"
          className="card-img"
          style={{ width: '100%' }}
        />
        <div className="card-img-overlay" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '10px' }}>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{truncateText(text)}</p>
          </div>
          {socialLink && (
            <motion.a
              href={socialLink}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.1 }}
              style={{
                position: 'absolute',
                right: '40px',
                bottom: '40px',
                width: '150px',
                display: 'inline-block',
                padding: '0.375rem 0.75rem',
                fontSize: '1rem',
                lineHeight: '1.5',
                textAlign: 'center',
                border: '1px solid transparent',
                borderRadius: '0.25rem',
                color: '#fff',
                backgroundColor: '#007bff',
                borderColor: '#007bff',
                transition: 'background-color 0.2s, border-color 0.2s, color 0.2s'
              }}
            >
              Social link
            </motion.a>
          )}
        </div>
      </motion.div>
    </div>
  );
}
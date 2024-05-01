import { useState, useEffect } from 'react';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';
import api from '@utils/api';
import { useAuth } from '@utils/auth';
import { OneCommentCard } from '@components/one-comment-card';


export function CommentsSection({ collectionId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const {user} = useAuth()

  useEffect(() => {
    fetchComments();
  }, [collectionId]);

  const fetchComments = async () => {
    try {
      const response = await api.get(`/comment/${collectionId}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await api.post(`/comment`, {
        fund: collectionId,
        text: newComment
      });
      setComments([...comments, response.data]);
      setNewComment(""); 
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

  return (
    <Container style={{margin: '20px', fontFamily: 'cursive', fontSize: '15px'}}>
      <ListGroup>
        {comments.map((comment) => (
          <ListGroup.Item key={comment.id}>
            <OneCommentCard comment={comment} />
          </ListGroup.Item>
        ))}
      </ListGroup>
      {user && (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="commentForm">
            <Form.Label style={{fontSize: '30px', marginTop: '20px'}}>Add a Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Type your comment here..."
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Container>
  );
}
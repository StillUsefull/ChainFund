import { useState, useEffect } from "react";
import { Card, Row, Col, Image, Button, Form } from "react-bootstrap";
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa'; 
import { notifySuccess, notifyError } from "@components/notifications";
import api from "@utils/api";
import { useAuth } from "@utils/auth";
import { ToastContainer } from "react-toastify";
import { ConfirmationDialog } from "@components/confirmation-dialog";

export function OneCommentCard({ comment, onRemove }) {
    const [author, setAuthor] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedText, setEditedText] = useState(comment.text);
    const [showConfirm, setShowConfirm] = useState(false);
    const { user } = useAuth(); 

    useEffect(() => {
      if (comment.authorId) {
        fetchAuthorData();
      }
    }, [comment.authorId]);

    const fetchAuthorData = async () => {
      try {
        const response = await api.get(`/user/getOne/${comment.authorId}`);
        setAuthor(response.data);
      } catch (error) {
        console.error('Failed to fetch author data:', error);
      }
    };

    const handleEdit = () => {
        setEditMode(true);
    }

    const handleCancel = () => {
        setEditedText(comment.text);
        setEditMode(false);
    }

    const handleSave = async () => {
        try {
            await api.put(`/comment/${comment.id}`, { text: editedText });
            notifySuccess('Comment updated successfully');
            setEditMode(false);
    
        } catch (error) {
            notifyError('Failed to update comment');
            console.error('Failed to update comment:', error);
        }
    }

    const handleDelete = async () => {
        try {
            await api.delete(`/comment/${comment.id}`);
            notifySuccess('Comment deleted successfully');
            onRemove(comment.id)
        } catch (error) {
            notifyError('Failed to delete comment');
            console.error('Failed to delete comment:', error);
        }
    }

    const isMyComment = user && comment.authorId === user.id;

    return (
      <>
        <ToastContainer />
        <ConfirmationDialog
          show={showConfirm}
          handleClose={() => setShowConfirm(false)}
          handleConfirm={handleDelete}
          title="Confirm Deletion"
          message="Are you sure you want to delete this comment?"
        />
        <Card className="mb-3" style={{fontSize: '20px'}}>
            <Card.Body>
                <Row>
                    <Col xs={3} md={2}>
                        {author && author.photo ? (
                            <Image src={author.photo} roundedCircle style={{ width: '100%' }} />
                        ) : (
                            <div style={{ width: '40px', height: '40px', backgroundColor: '#ccc', borderRadius: '50%' }}></div>
                        )}
                    </Col>
                    <Col xs={9} md={10}>
                        <div>
                            {author ? <strong>{author.name}</strong> : <strong>Loading...</strong>}
                            {!editMode ? (
                                <p>{comment.text}</p>
                            ) : (
                                <Form.Control as="textarea" value={editedText} onChange={e => setEditedText(e.target.value)} />
                            )}
                        </div>
                        {isMyComment && !editMode && (
                            <div style={{ textAlign: 'right' }}>
                                <Button variant="link" onClick={handleEdit}><FaEdit /></Button>
                                <Button variant="link" onClick={() => setShowConfirm(true)}><FaTrash /></Button>
                            </div>
                        )}
                        {isMyComment && editMode && (
                            <div style={{ textAlign: 'right' }}>
                                <Button variant="link" onClick={handleSave}><FaSave /></Button>
                                <Button variant="link" onClick={handleCancel}><FaTimes /></Button>
                            </div>
                        )}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
      </>
    );
}

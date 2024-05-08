import { useState, ChangeEvent, FormEvent } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { notifyError, notifySuccess } from '@components/notifications';
import { ToastContainer } from 'react-toastify';
import api from '@utils/api';
import { useNavigate } from 'react-router';



export function CreatePostForm() {
    const [fundData, setFundData]: [any, any] = useState({});
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setFile(file);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFundData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (loading) return;
    
        const formData = new FormData();
        Object.entries(fundData).forEach(([key, value]) => {
            formData.append(key, `${value}`);
        });
        if (file) {
            formData.append('file', file, file.name);
        }
    
        try {
            setLoading(true);
            
            const response = await api.post('/post/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            notifySuccess('Post created successfully!');
            setTimeout(() => {navigate(`/profile/posts/${response.data.id}`)}, 2000)
        } catch (err) {
            notifyError(err.response.data.message[0] || 'Failed to create fund');
            console.error(err);
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <Container style={{ marginTop: '20px', fontFamily: 'cursive' }}>
                <h2>Create Post</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title </Form.Label>
                        <Form.Control type="text" name="title" value={fundData.title} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Text</Form.Label>
                        <Form.Control as="textarea" rows={3} name="text" value={fundData.text} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Link to a publication or account on another social network</Form.Label>
                        <Form.Control type="url" name="socialLink" value={fundData.socialLink} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>File (.jpg only)</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} accept=".jpg" />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Post'}
                    </Button>
                </Form>
            </Container>
        </>
    );
}
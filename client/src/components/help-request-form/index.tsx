import { notifyError, notifySuccess } from "@components/notifications";
import api from "@utils/api";
import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";


export function HelpRequestForm(){

    const [request, setRequest] = useState({
        title: '',
        text: ''
    })
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRequest(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (loading) return;
        try {
            setLoading(true);
            
            await api.post('/help-request/send', request).then(() => {
                notifySuccess('Request was succesfully sent');
            });
            

            
        } catch (err) {
            
            notifyError('Failed to send request for help');
            console.error(err);
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <Container style={{ marginTop: '20px', fontFamily: 'cursive', marginBottom: "30px" }}>
                <h2>Create Post</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="title" value={request.title} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Text</Form.Label>
                        <Form.Control as="textarea" rows={3} name="text" value={request.text} onChange={handleInputChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Sending...' : 'Send request for help'}
                    </Button>
                </Form>
            </Container>
        </>
    )
}
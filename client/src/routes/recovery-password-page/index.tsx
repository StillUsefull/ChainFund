import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { notifyError, notifySuccess } from '@components/notifications';
import { useNavigate } from 'react-router-dom';
import api from '@utils/api';


export function RecoveryPasswordPage(){
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleRecovery = async (event) => {
        event.preventDefault();
        try {
            await api.post('/user/password-recovery', { 'email': email });
            notifySuccess('If an account with that email exists, we have sent instructions to reset your password.');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            console.error(error);
            notifyError(error.response?.data?.message || 'An unexpected error occurred');
        }
    };

    return (
        <>
            <ToastContainer />
            <Container style={{
                display: 'flex',
                flexDirection: 'column', 
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: "cursive",
                backgroundColor: '#0061FF',
                padding: '20px',
                marginTop: '50px',
                borderRadius: '5px',
                maxWidth: '600px'
            }}>
                <Form onSubmit={handleRecovery} style={{ width: '100%' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Password Recovery</h2>
                    <Form.Group controlId="recoveryEmail" style={{ marginBottom: '15px' }}>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">Send Recovery Email</Button>
                </Form>
            </Container>
        </>
    );
}
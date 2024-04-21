import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { notifyError, notifySuccess } from '@components/notifications';
import { useNavigate } from 'react-router';
import api from '@utils/api';
import { useAuth } from '@utils/auth';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const { setIsLoggedIn, fetchUser } = useAuth();
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/auth/login', {
                email,
                password
            });

            localStorage.setItem('accessToken', response.data.accessToken);
            setIsLoggedIn(true);
            await fetchUser();  
            notifySuccess('Login successful');
            setTimeout(() => {
                navigate('/');
            }, 2000);
        
        } catch (error) {
            console.log(error);
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
                <Form onSubmit={handleLogin} style={{ width: '100%' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
                    <Form.Group controlId="loginEmail" style={{ marginBottom: '15px' }}>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="loginPassword" style={{ marginBottom: '20px' }}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            required
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}"
                            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                    />
                    </Form.Group>

                    <Button variant="primary" type="submit">Login</Button>
                </Form>
            </Container>
        </>
    );
};
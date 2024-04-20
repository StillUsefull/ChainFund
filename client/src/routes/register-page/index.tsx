import { notifyError, notifySuccess } from '@components/notifications';
import { baseUrl } from '@utils/baseUrl';
import axios from 'axios';
import  { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({} as any);
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors: any = {};
        if (!email) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';
        if (!name) newErrors.name = 'Name is required';
        if (name.length > 32) newErrors.name = 'Name must be no longer than 32 characters';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                await axios.post(`${baseUrl}/auth/registration`, {
                email,
                password, 
                name
            }, {
                withCredentials: true
            });
                notifySuccess('Registration completed successfully!'); 
                setTimeout(() => {
                    navigate('/login');
                }, 2000)
                
            } catch (error){
                notifyError(error.response?.data?.message || 'An unexpected error occurred');
            }
        }
    };

    return (
        <>
            <ToastContainer />
            <Container style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: "cursive",
            backgroundColor: '#0061FF',
            padding: '20px',
            marginTop: '50px', 
            flexDirection: 'column',
            borderRadius: '5px',
            maxWidth: '600px'
        }}>
            <Form onSubmit={handleSubmit} style={{ width: '100%' }}> 
                <h2 style={{ textAlign: 'center' }}>Registration</h2>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <Alert variant="danger">{errors.email}</Alert>}
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label style={{marginTop: '5px'}}>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        required
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}"
                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <Alert variant="danger">{errors.password}</Alert>}
                </Form.Group>

                <Form.Group controlId="formBasicName">
                    <Form.Label style={{marginTop: '5px'}}>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name"
                        required
                        maxLength={32}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <Alert variant="danger">{errors.name}</Alert>}
                </Form.Group>

                <Button style={{marginTop: '20px'}} variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </Container>
        </>
        
    );
};
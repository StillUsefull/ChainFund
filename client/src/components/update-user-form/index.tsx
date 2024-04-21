import  { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import api from '@utils/api';
import { notifyError, notifySuccess } from '@components/notifications';
import { ToastContainer } from 'react-toastify';

export function UpdateUserForm() {
    const [user, setUser] = useState({
        id: '',
        email: '',
        name: '',
        semi: '',
        telegram: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await api.get('/user/iam');
                setUser({
                    id: response.data.id || '',  
                    email: response.data.email || '',
                    name: response.data.name || '',
                    semi: response.data.semi || '',
                    telegram: response.data.telegram || ''
                });
                setLoading(false);
            } catch (err) {
                notifyError('Failed to load user data');
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            await api.put(`/user/update/${user.id}`, user);
            setLoading(false);
            notifySuccess('User updated successfully!');
        } catch (err) {
            notifyError('Failed to update user');
            console.log(err)
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <Container style={{ marginTop: '20px' }}>
                <h2>Update Profile</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={user.email} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={user.name} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Semi-name</Form.Label>
                        <Form.Control type="text" name="semi" value={user.semi} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Telegram</Form.Label>
                        <Form.Control type="text" name="telegram" value={user.telegram} onChange={handleInputChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Updating...' : 'Update'}
                    </Button>
                </Form>
            </Container>
        </>
    );
}
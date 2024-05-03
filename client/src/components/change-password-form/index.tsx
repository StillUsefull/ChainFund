import { useState } from 'react';
import { Container, Form, Button} from 'react-bootstrap';
import api from '@utils/api';
import { ToastContainer } from 'react-toastify';
import { notifyError, notifySuccess } from '@components/notifications';

export function ChangePasswordForm() {
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: ''
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPasswords(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[*/@."']).*$/;
        if (!passwordRegex.test(passwords.newPassword)) {
            notifyError('New password must contain at least one lowercase letter, one uppercase letter, and one special character (*/@."');
            return;
        }
        if (passwords.newPassword.length < 7) {
            notifyError('New password must be at least 7 characters long.');
            return;
        }
        try {
            setLoading(true);
            await api.put(`/user/change-password`, passwords);
            setLoading(false);
            notifySuccess('Password changed successfully!');
        } catch (err) {
            console.log(err)
            notifyError(err.data.message);
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <Container style={{ marginTop: '20px' }}>
                <h2>Change Password</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control type="password" name="currentPassword" value={passwords.currentPassword} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" name="newPassword" value={passwords.newPassword} onChange={handleInputChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Changing...' : 'Change Password'}
                    </Button>
                </Form>
            </Container>
        </>
    );
}
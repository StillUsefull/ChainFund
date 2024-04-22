import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import api from '@utils/api';
import { notifyError, notifySuccess } from '@components/notifications';
import { ToastContainer } from 'react-toastify';
import { CreatorCard } from '@components/creator-card';

type User = {
    id: string;
    email: string;
    name: string;
    semi: string;
    telegram: string;
    photo: string;
};

type UserUpdates = Partial<Omit<User, 'id'>>; 

export function UpdateUserForm() {
    const [userData, setUserData] = useState<User>({
        id: '',
        email: '',
        name: '',
        semi: '',
        telegram: '',
        photo: ''
    });
    const [userUpdates, setUserUpdates] = useState<UserUpdates>({});
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await api.get('/user/iam');
                const { id, email, name, semi, telegram, photo } = response.data;
                setUserData({ id, email, name, semi, telegram, photo });
                setUserUpdates({});
                setLoading(false);
            } catch (err) {
                console.log(err)
                notifyError('Failed to load user data');
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserUpdates(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setFile(file);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (loading) return;
        try {
            setLoading(true);
            const formData = new FormData();
            Object.entries(userUpdates).forEach(([key, value]) => {
                if (value) formData.append(key, value);
            });
            if (file) formData.append('file', file, file.name);

            await api.put(`/user/update/${userData.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            notifySuccess('User updated successfully!');
            setLoading(false);
        } catch (err) {
            notifyError('Failed to update user');
            console.log(err);
            setLoading(false);
        }
    };


    return (
        <>
            <ToastContainer />
            <Container style={{ marginTop: '20px' }}>
                <h2>Update Profile</h2>
                <CreatorCard id={userData.id} name={userData.name} semi={userData.semi} photo={userData.photo}/>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" defaultValue={userData.email} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" defaultValue={userData.name} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Semi-name</Form.Label>
                        <Form.Control type="text" name="semi" defaultValue={userData.semi} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Telegram</Form.Label>
                        <Form.Control type="text" name="telegram" defaultValue={userData.telegram} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{'File (.jpg only)'}</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} accept=".jpg" />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Updating...' : 'Update'}
                    </Button>
                    
                </Form>
            </Container>
        </>
    );
}
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { notifyError, notifySuccess } from '@components/notifications';
import { ToastContainer } from 'react-toastify';
import api from '@utils/api';


const categories = {
    'TECH': 'Technology and Innovation',
    'MILITARY': 'Military Support',
    'HEALTH': 'Health and Medical',
    'DEVELOPMENT': 'Development and Open Source',
    'ECO': 'Environment and Conservation',
    'ART': 'Art and Culture',
};

export function UpdateFundForm({ fundId }) {
    const [fundData, setFundData] = useState({
        title: '',
        goal: 0,
        text: '',
        category: 'TECH',
        googlePay: '',
        photo: '',
    });
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        const fetchFundData = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/cash-collection/findOne/${fundId}`);
                setFundData(response.data);
                setLoading(false);
            } catch (err) {
                notifyError('Failed to fetch fund details');
                console.error(err);
                setLoading(false);
            }
        };

        fetchFundData();
    }, [fundId]);

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
        formData.append('title', fundData.title);
        formData.append('goal', String(fundData.goal));
        formData.append('text', fundData.text);
        formData.append('category', fundData.category);
        formData.append('googlePay', fundData.googlePay);
        if (file) {
            formData.append('file', file, file.name);
        }
        
        
        setLoading(true);
        await api.put(`/cash-collection/update/${fundId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((success) => {
                console.log(success)
                notifySuccess('Fund updated successfully!');
            })
            .catch(err => {
                if (err.response.status != 500){
                    let message = err.response.data.message[0];
                    message = message.charAt(0).toUpperCase() + message.slice(1);
                    notifyError(message);
                } else {
                    notifyError('Failed to update fund');
                }
            });
            

        setLoading(false);
        
    };

    return (
        <>
            <ToastContainer />
            <Container style={{ marginTop: '20px', fontFamily: 'cursive' }}>
                <h2>Update Fund</h2>
                
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="title" value={fundData.title} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Goal</Form.Label>
                        <Form.Control type="number" min={0} name="goal" value={fundData.goal} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Text</Form.Label>
                        <Form.Control as="textarea" rows={3} name="text" value={fundData.text} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select" name="category" value={fundData.category} onChange={handleInputChange}>
                            {Object.keys(categories).map(key => (
                                <option key={key} value={key}>{categories[key]}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Google Pay Link</Form.Label>
                        <Form.Control type="url" name="googlePay" value={fundData.googlePay} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>File (.jpg only)</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} accept=".jpg" />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Updating...' : 'Update Fund'}
                    </Button>
                </Form>
            </Container>
        </>
    );
}
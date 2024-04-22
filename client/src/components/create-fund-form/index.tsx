import { useState, ChangeEvent, FormEvent } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { notifyError, notifySuccess } from '@components/notifications';
import { ToastContainer } from 'react-toastify';
import api from '@utils/api';


const categories = {
    'Technology and Innovation': 'tech',
    'Military Support': 'military',
    'Health and Medical': 'health',
    'Development and Open Source': 'development',
    'Enviroment and Conservation': 'eco',
    'Art and Culture': 'art'
};



export function CreateFundForm() {
    const [fundData, setFundData]: [any, any] = useState({
        title: '',
        goal: 0,
        text: '',
        category: 'tech', 
        googlePay: ''
    });
    const [loading, setLoading] = useState(false);

    const [file, setFile] = useState<File | null>(null);
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
            await api.post('/cash-collection/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            notifySuccess('Fund created successfully!');
            setFundData({ title: '', goal: 0, text: '', category: 'tech', googlePay: '' });
            setFile(null);
            setLoading(false);
        } catch (err) {
            notifyError('Failed to create fund');
            console.error(err);
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <Container style={{ marginTop: '20px', fontFamily: 'cursive'}}>
                <h2>Create Fund</h2>
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
                            {Object.entries(categories).map(([key, value]) => (
                                <option key={key} value={value}>{key}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Google Pay Link</Form.Label>
                        <Form.Control type="url" name="googlePay" value={fundData.googlePay} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{'File (.jpg only)'}</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} accept=".jpg" />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Fund'}
                    </Button>
                </Form>
            </Container>
        </>
    );
}
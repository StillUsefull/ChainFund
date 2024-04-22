import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { notifyError, notifySuccess } from '@components/notifications';
import { ToastContainer } from 'react-toastify';
import api from '@utils/api';
import { CashCollectionCard } from '@components/cash-collection-card';

const categories = {
    'Technology and Innovation': 'tech',
    'Military Support': 'military',
    'Health and Medical': 'health',
    'Development and Open Source': 'development',
    'Enviroment and Conservation': 'eco',
    'Art and Culture': 'art'
};

export function UpdateFundForm({ fundId }) {
    const [fundData, setFundData] = useState({
        title: '',
        goal: 0,
        text: '',
        category: 'tech',
        googlePay: '', 
        photo: '',
    });
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        const fetchFundData = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/cash-collection/findOne/${fundId}`);
                setFundData(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                notifyError('Failed to load fund data');
                setLoading(false);
            }
        };

        fetchFundData();
    }, [fundId]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFundData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setFile(file);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (loading) return;

        const formData = new FormData();
        Object.entries(fundData).forEach(([key, value]) => {
            if (fundData[key] !== value) {
                formData.append(key, `${value}`);
            }
        });
        if (file) {
            formData.append('file', file, file.name);
        }

        try {
            setLoading(true);
            const response = await api.put(`/cash-collection/update/${fundId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
             console.log(response)
            notifySuccess('Fund updated successfully!');
            setLoading(false);
        } catch (err) {
            notifyError('Failed to update fund');
            console.error(err);
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <Container style={{ marginTop: '20px' }}>
                <h2>Update Fund</h2>
                <CashCollectionCard 
                        key={fundId}  
                        id={fundId} 
                        title={fundData.title} 
                        description={fundData.text} 
                        goal={fundData.goal} 
                        category={fundData.category} 
                        photo={fundData.photo}
                        admin={true}
                    />
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
                        {loading ? 'Updating...' : 'Update Fund'}
                    </Button>
                </Form>
            </Container>
        </>
    );
}
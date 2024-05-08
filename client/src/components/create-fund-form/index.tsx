import { useState, ChangeEvent, FormEvent } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { notifyError, notifySuccess } from '@components/notifications';
import { ToastContainer } from 'react-toastify';
import api from '@utils/api';
import { useNavigate } from 'react-router';
import { categories } from '@utils/consts/categories';


export function CreateFundForm() {
    const [fundData, setFundData]: [any, any] = useState({
        
        category: 'TECH', 
        
    });
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();
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
            
            const response = await api.post('/cash-collection/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            notifySuccess('Fund created successfully!');
            setTimeout(() => {navigate(`/profile/funds/${response.data.id}`)}, 2000)
            
        } catch (err) {
            notifyError(err.response.data.message[0] ||'Failed to create fund');
            console.error(err);
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <Container style={{ marginTop: '20px', fontFamily: 'cursive' }}>
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
                            {Object.keys(categories).map(key => (
                                <option key={key} value={key}>{categories[key]}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>PayPal Email for donations</Form.Label>
                        <Form.Control type="email" name="payPalEmail" value={fundData.payPalEmail} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>File (.jpg only)</Form.Label>
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
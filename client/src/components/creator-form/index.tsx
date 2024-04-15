import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

export function CreatorForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    category: ''
  });

  const [errors, setErrors]: any = useState({});

  const validateForm = () => {
    let valid = true;
    let newErrors: any = {};

    
    if (!formData.name) {
      valid = false;
      newErrors.name = 'Name is required.';
    }

    
    if (!formData.email) {
      valid = false;
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      valid = false;
      newErrors.email = 'Email is not valid.';
    }

    
    if (!formData.description) {
      valid = false;
      newErrors.description = 'Description is required.';
    }

    
    if (!formData.category) {
      valid = false;
      newErrors.category = 'Category is required.';
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Data:', formData);
      alert('Application sent!');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <Container style={{color: '#2B3EFF', fontFamily: 'cursive', marginBottom: '20px'}}>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form noValidate onSubmit={handleSubmit}>
            <h2>Become a creator!</h2>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Your interests and ideas</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                isInvalid={!!errors.category}
              />
              <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
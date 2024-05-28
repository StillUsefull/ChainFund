import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import api from '@utils/api';
import { ToastContainer } from 'react-toastify';
import SidebarMenu from '@components/side-bar-menu';


export function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get(`/user/all`);
            
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await api.delete(`/user/delete/${userId}`);
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = searchTerm.length > 0 ? 
        users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase())) : users;

    if (loading) {
        return <p>Loading users...</p>;
    }

    return (
        <>
            <ToastContainer />
            <SidebarMenu />
            <Container>
                <Form>
                    <Form.Group className="mb-3" controlId="searchUser">
                        <Form.Label>Search Users by Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name to search"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </Form.Group>
                </Form>
                {filteredUsers.map(user => (
                    <Card key={user.id} className="mb-3">
                        <Row className="g-0">
                            <Col md={8}>
                                <Card.Body>
                                    <Card.Title>{user.name} {user.surname}</Card.Title>
                                    {user.semi && <Card.Text>Semi: {user.semi}</Card.Text>}
                                    <Button variant="danger" onClick={() => deleteUser(user.id)}>Delete User</Button>
                                </Card.Body>
                            </Col>
                            <Col md={4}>
                                {user.photo && (
                                    <Image src={user.photo} alt="User Photo" style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                                )}
                            </Col>
                        </Row>
                    </Card>
                ))}
            </Container>
        </>
    );
}

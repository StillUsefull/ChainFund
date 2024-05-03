import { notifySuccess } from "@components/notifications";
import api from "@utils/api";
import { Card, Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

export function CreatorRequestCard({ request }) {
    

    const handleAccept = () => {
        api.put(`/request/approve/${request.id}`)
            .then(() => {
                notifySuccess('A new creator was approved');
            })
    };

    const handleDecline = () => {
        api.put(`/request/decline/${request.id}`)
            .then(() => {
                notifySuccess('Request was declined');
            })
    };

    return (
        <>
        <ToastContainer />
        <Card className="mb-3" style={{ cursor: 'pointer', fontFamily: "cursive" }}>
            <Card.Body>
                <Card.Title>{request.name}</Card.Title>
                <Card.Text>
                    <strong>Interests:</strong> {request.interests}
                </Card.Text>
                <Card.Text>
                    <strong>Category:</strong> {request.category}
                </Card.Text>
                <div>
                    <Button variant="success" onClick={handleAccept} style={{ marginRight: '10px' }}>Accept</Button>
                    <Button variant="danger" onClick={handleDecline}>Decline</Button>
                </div>
            </Card.Body>
        </Card>
        </>
    );
}

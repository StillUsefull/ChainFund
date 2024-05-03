import { notifyError, notifySuccess } from "@components/notifications";
import SidebarMenu from "@components/side-bar-menu";
import api from "@utils/api";
import { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { ToastContainer } from "react-toastify";

export function AdminHelpOnePage() {
    const { id } = useParams();
    const [request, setRequest] = useState({
        title: '',
        text: '', 
        answer: ''
    });
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        api.get(`/help-request/one/${id}`)
            .then((response) => {
                setRequest(response.data);
            });
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        api.put(`/help-request/answer/${id}`, {text: answer})
            .then(() => {notifySuccess('Answer was sent')})
            .catch((e) => {notifyError('Can`t send answer for that request'), console.log(e)});
    };

    return (
        <>
            <SidebarMenu />
            <ToastContainer />
            <Container style={{ marginLeft: '350px', padding: '20px', fontFamily: "cursive", color: '#020075' }}>
                <h1 style={{fontSize: '30px'}}>{request.title}</h1>
                <p style={{fontSize: '20px'}}>{request.text}</p>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Answer: {request.answer}</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Enter your answer"
                            value={answer}
                            onChange={e => setAnswer(e.target.value)}
                            style={{
                                height: 'auto',   
                                minHeight: '50px', 
                                width: '80%',     
                                padding: '10px',  
                                margin: 'auto',   
                                display: 'block'
                            }}
                            rows={3} 
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit Answer
                    </Button>
                </Form>
            </Container>
        </>
    );
}

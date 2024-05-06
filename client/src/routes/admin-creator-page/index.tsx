import { CreatorRequestCard } from "@components/creator-request-card";
import SidebarMenu from "@components/side-bar-menu";
import api from "@utils/api";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

export function AdminCreatorPage() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        api.get('/request')
            .then((response) => {
                setRequests(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch requests:', error);
            });
    }, []); 

    return (
        <>
            <SidebarMenu />
            <ToastContainer />
            <Container style={{ marginLeft: '350px', padding: '20px', fontFamily: "cursive" }}>
                {requests.length > 0 ? (
                    requests.map(request => (
                        <div key={request.id} style={{ marginTop: '30px' }}>
                            <CreatorRequestCard request={request} />
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <h4>No requests available.</h4>
                    </div>
                )}
            </Container>
        </>
    );
}
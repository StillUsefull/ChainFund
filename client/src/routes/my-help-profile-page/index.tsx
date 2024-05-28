
import { HelpRequestCard } from "@components/help-request-card";
import { HelpRequestForm } from "@components/help-request-form";
import SidebarMenu from "@components/side-bar-menu";
import api from "@utils/api";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";



export function HelpProfilePage(){

    const [requests, setRequests] = useState([]);
    
    useEffect(() => {
        api.get('/help-request/my')
            .then((response) => {
                setRequests(response.data);
            })
    })

    
    return (
        <div>
            <SidebarMenu />
            <Container style={{ marginLeft: '250px', padding: '20px' }}>
                <HelpRequestForm />
                <Container>
                    {requests && requests.map((request) => {
                        return <div style={{marginTop: "10px"}}>
                            <HelpRequestCard key={request.id} card={request}/>
                        </div>
                    })}
                </Container>
            </Container>
        </div>
    )
}
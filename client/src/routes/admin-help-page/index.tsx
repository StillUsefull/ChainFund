import { HelpRequestCard } from "@components/help-request-card";
import SidebarMenu from "@components/side-bar-menu";
import api from "@utils/api";
import { useEffect, useState } from "react"
import { Container } from "react-bootstrap";



export function AdminHelpPage(){

    const [requests, setRequests] = useState([])

    useEffect(() => {
        api.get('/help-request/all')
            .then((response) => {
                setRequests(response.data);
            })
    })

    return (
        <div>
            <SidebarMenu />
            <Container style={{ marginLeft: '250px', padding: '20px' }}>
            {requests ? (requests.map((request, index) => {
                return (<div style={{marginTop: "20px", fontFamily: "cursive"}}>
                    <HelpRequestCard key={index} card={request} />
                </div>)}))
                :
                <p style={{fontFamily: 'cursive'}}>
                    There is no requests for help now!
                </p>
            }
            </Container>
        </div>
    )

}
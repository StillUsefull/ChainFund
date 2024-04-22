import SidebarMenu from "@components/side-bar-menu";
import { UpdateFundForm } from "@components/update-fund-form";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";



export function UpdateFundPage(){
    let {id} = useParams()
    return (
        <>
            <SidebarMenu />
            <Container style={{ marginLeft: '250px', padding: '20px' }}>
                <UpdateFundForm fundId={id}/>
            </Container>
        </>
    )
}
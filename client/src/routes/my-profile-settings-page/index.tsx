
import SidebarMenu from "@components/side-bar-menu";
import { ChangePasswordForm } from "@components/change-password-form";
import { UpdateUserForm } from "@components/update-user-form";
import { Container } from "react-bootstrap";



export function MyProfileSettingsPage(){
    return (
        <div>
            <SidebarMenu />
            <Container style={{ marginLeft: '250px', padding: '20px' }}>
                <UpdateUserForm />
                <br />
                <ChangePasswordForm />
            </Container>
        </div>
    )
}
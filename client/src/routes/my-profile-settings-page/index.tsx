import SidebarMenu from "@components/side-bar-menu";
import { ChangePasswordForm } from "@components/change-password-form";
import { UpdateUserForm } from "@components/update-user-form";
import { Button, Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { notifyError, notifySuccess } from "@components/notifications";
import { useAuth } from "@utils/auth";
import api from "@utils/api";
import { useState } from 'react';
import { ConfirmationDialog } from '@components/confirmation-dialog';import { useNavigate } from "react-router";

export function MyProfileSettingsPage() {
    const { user, setIsLoggedIn, clearUser } = useAuth(); 
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const navigate = useNavigate()
    const handleDeleteProfile = async () => {
        try {
            await api.delete(`/user/delete/${user.id}`);
            notifySuccess('Profile deleted successfully!');
            setIsLoggedIn(false); 
            clearUser();
            setTimeout(() => {
                navigate('/', { replace: true });
            }, 1500);
        } catch (err) {
            notifyError('Failed to delete profile');
        }
    };

    return (
        <div>
            <ToastContainer />
            <SidebarMenu />
            <Container style={{ marginLeft: '250px', padding: '20px', fontFamily: 'cursive' }}>
                <UpdateUserForm />
                <br />
                <ChangePasswordForm />
                <br />
                <div className="d-flex justify-content-end">
                    <Button variant="danger" size="lg" onClick={() => setShowConfirmDialog(true)}>
                        Delete Profile
                    </Button>
                </div>
            </Container>
            <ConfirmationDialog
                show={showConfirmDialog}
                handleClose={() => setShowConfirmDialog(false)}
                handleConfirm={handleDeleteProfile}
                title="Confirm Profile Deletion"
                message="Are you sure you want to delete your profile? All your posts, comments and funds will be removed! This action cannot be undone."
            />
        </div>
    );
}
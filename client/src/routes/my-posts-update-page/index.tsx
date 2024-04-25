import { ConfirmationDialog } from "@components/confirmation-dialog";
import { notifyError, notifySuccess } from "@components/notifications";
import SidebarMenu from "@components/side-bar-menu";
import { UpdatePostForm } from "@components/update-post-form";
import api from "@utils/api";
import { useState } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";



export function UpdatePostPage(){
    let { id } = useParams();
    const navigate = useNavigate();

    const [showPublishDialog, setShowPublishDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handlePublish = async () => {
        await api.get(`/post/publish/${id}`)
            .then(() => {
                notifySuccess('Your post was published');
            })
            .catch((err) => {
                if (err.response.status != 500){
                    let message = err.response.data.message;
                    message = message.charAt(0).toUpperCase() + message.slice(1);
                    notifyError(message);
                } else {
                    notifyError('Failed to update fund');
                }
                
            });
    };

    const handleDelete = async () => {
        await api.delete(`/post/delete/${id}`)
            .then(() => {
                notifySuccess('Your fund was deleted');
                setTimeout(() => {
                    navigate('/profile/posts');
                }, 2000);
            })
            .catch((err) => {
                notifyError('Error while deleting');
                console.log(err);
            });
    };

    return (
        <>
            <SidebarMenu />
            <Container style={{ marginLeft: '250px', padding: '20px' }}>
                <UpdatePostForm postId={id} />
                <div className="d-flex justify-content-end mt-4">
                    <ButtonGroup>
                        <Button variant="success" onClick={() => setShowPublishDialog(true)}>Publish</Button>
                        <Button variant="danger" onClick={() => setShowDeleteDialog(true)}>Delete</Button>
                    </ButtonGroup>
                </div>

                <ConfirmationDialog
                    show={showPublishDialog}
                    handleClose={() => setShowPublishDialog(false)}
                    handleConfirm={handlePublish}
                    title="Publish Fund"
                    message="Are you sure you want to publish this fund?"
                />

                <ConfirmationDialog
                    show={showDeleteDialog}
                    handleClose={() => setShowDeleteDialog(false)}
                    handleConfirm={handleDelete}
                    title="Delete Fund"
                    message="Are you sure you want to delete this fund?"
                />
            </Container>
        </>
    );
}
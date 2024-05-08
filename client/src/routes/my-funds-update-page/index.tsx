import { useState, useEffect } from 'react';
import { notifyError, notifySuccess } from "@components/notifications";
import SidebarMenu from "@components/side-bar-menu";
import { UpdateFundForm } from "@components/update-fund-form";
import { ConfirmationDialog } from "@components/confirmation-dialog";
import api from "@utils/api";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export function UpdateFundPage() {
    let { id } = useParams();
    const navigate = useNavigate();

    const [isPublished, setIsPublished] = useState(false);
    const [showPublishDialog, setShowPublishDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    useEffect(() => {
        const fetchFundStatus = async () => {
            try {
                const response = await api.get(`/cash-collection/findOne/${id}`);
                setIsPublished(response.data.publish);
            } catch (error) {
                console.error("Failed to fetch fund data", error);
            }
        };

        fetchFundStatus();
    }, [id]);

    const handlePublish = async () => {
        await api.get(`/cash-collection/publish/${id}`)
            .then(() => {
                notifySuccess('Your fund was published');
                setIsPublished(true); // Update the state to reflect the fund is now published
            })
            .catch((err) => {
                if (err.response && err.response.status !== 500) {
                    let message = err.response.data.message;
                    message = message.charAt(0).toUpperCase() + message.slice(1);
                    notifyError(message);
                } else {
                    notifyError('Failed to update fund');
                }
            });
    };

    const handleDelete = async () => {
        await api.delete(`/cash-collection/delete/${id}`)
            .then(() => {
                notifySuccess('Your fund was deleted');
                setTimeout(() => {
                    navigate('/profile/funds');
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
                <UpdateFundForm fundId={id} />
                <div className="d-flex justify-content-end mt-4">
                    <ButtonGroup>
                        {!isPublished ? (
                            <Button variant="success" onClick={() => setShowPublishDialog(true)}>Publish</Button>
                        ) : (
                            <span style={{marginRight: '20px', fontFamily: 'cursive', color: 'blue'}}>Already published</span>
                        )}
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
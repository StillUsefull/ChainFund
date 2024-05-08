import { useState, useEffect } from "react";
import { notifyError, notifySuccess } from "@components/notifications";
import SidebarMenu from "@components/side-bar-menu";
import { UpdatePostForm } from "@components/update-post-form";
import api from "@utils/api";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ConfirmationDialog } from "@components/confirmation-dialog";

export function UpdatePostPage() {
    let { id } = useParams();
    const navigate = useNavigate();

    const [isPublished, setIsPublished] = useState(false);
    const [showPublishDialog, setShowPublishDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    useEffect(() => {
        const fetchPostStatus = async () => {
            try {
                const response = await api.get(`/post/findOne/${id}`);
                setIsPublished(response.data.publish);
            } catch (error) {
                console.error("Failed to fetch post data", error);
            }
        };

        fetchPostStatus();
    }, [id]);

    const handlePublish = async () => {
        await api.get(`/post/publish/${id}`)
            .then(() => {
                notifySuccess('Your post was published');
                setIsPublished(true);
            })
            .catch((err) => {
                if (err.response && err.response.status !== 500) {
                    let message = err.response.data.message;
                    message = message.charAt(0).toUpperCase() + message.slice(1);
                    notifyError(message);
                } else {
                    notifyError('Failed to publish post');
                }
            });
    };

    const handleDelete = async () => {
        await api.delete(`/post/delete/${id}`)
            .then(() => {
                notifySuccess('Your post was deleted');
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
                    title="Publish Post"
                    message="Are you sure you want to publish this post?"
                />

                <ConfirmationDialog
                    show={showDeleteDialog}
                    handleClose={() => setShowDeleteDialog(false)}
                    handleConfirm={handleDelete}
                    title="Delete Post"
                    message="Are you sure you want to delete this post?"
                />
            </Container>
        </>
    );
}
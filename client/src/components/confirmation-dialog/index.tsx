import { Button, Modal } from "react-bootstrap";

export function ConfirmationDialog({ show, handleClose, handleConfirm, title, message }) {
    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => {
                    handleConfirm();
                    handleClose();
                }}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
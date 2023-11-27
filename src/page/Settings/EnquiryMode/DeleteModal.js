// DeleteModal.js
import React from 'react';
import { Modal, Button, Container } from 'react-bootstrap';
import styled from 'styled-components';


const StyledModal = styled(Modal)`
  --bs-modal-width: 500px !important;
  --bs-modal-header-padding: 1rem 1.7rem !important;
`;

const DeleteModal = ({ show, handleClose, handleDelete }) => {
  return (
    <StyledModal show={show} onHide={handleClose} centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Container>
        <Modal.Body>Are you sure you want to delete?</Modal.Body>
      </Container>
      <Modal.Footer>
        <Button style={{ background: 'none', color: '#5bb6ea', border: '1px solid #5bb6ea' }} onClick={handleClose}>
          No
        </Button>
        <Button style={{ background: '#5bb6ea', border: 'none', fontWeight: '600' }} onClick={handleDelete}>
          Yes
        </Button>
      </Modal.Footer>
    </StyledModal>
  );
};

export default DeleteModal;

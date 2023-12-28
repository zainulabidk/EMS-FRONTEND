// ViewModal.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../style/view.css';
import { Container, Row, Col } from 'react-bootstrap';

function ViewModal({ showModal, handleClose, selectedDatas }) {
  return (
    <Modal show={showModal} onHide={handleClose}  backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>View  Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Container>
          <Row>
            <Col md={6}>
              <p className='view-label'>OrgCategory</p>
              <p className='view-data'> {selectedDatas?.name}</p>
            </Col>
            <Col md={6}>
              <p className='view-label'>Description</p>
              <p className='view-data'> {selectedDatas?.descp}</p>
            </Col>
            <Col md={6}>
              <p className='view-label'>CreatedBy</p>
              <p className='view-data'> {selectedDatas?.createdBy}</p>
            </Col>
            <Col md={6}>
              <p className='view-label'>CreatedAt</p>
              <p className='view-data'> {selectedDatas?.createdAt}</p>
            </Col>
            </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{ background: 'none', color: '#5bb6ea', border: '1px solid #5bb6ea' }} onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewModal;

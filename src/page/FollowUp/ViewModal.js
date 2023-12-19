
// ViewModal.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../style/view.css';
import { Container, Row, Col } from 'react-bootstrap';

function ViewModal({ showModal, handleClose, selectedDatas }) {
  return (
    <Modal show={showModal} onHide={handleClose}  backdrop="static"  centered>
      <Modal.Header closeButton>
        <Modal.Title>View Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Container>
          <Row>
            <Col md={6}>
              <p className='view-label'>Name</p>
              <p className='view-data'> {selectedDatas?.enqId.fName} {selectedDatas?.enqId.lName}</p>
            </Col>
            <Col md={6}>
              <p className='view-label'>FollowUp Details</p>
              <p className='view-data'>{selectedDatas?.followUpDetails}</p>
            </Col>
            </Row>
            <Row>
            <Col md={6}>
              <p className='view-label'>Next Contact Date</p>
              <p className='view-data'> {selectedDatas?.nextContactDate}</p>
            </Col>
            <Col md={6}>
              <p className='view-label'>createdBy</p>
              <p className='view-data'> {selectedDatas?.createdBy}</p>
            </Col>
            </Row>
            <Row>
            <Col md={6}>
              <p className='view-label'>Status</p>
              <p className='view-data'> {selectedDatas?.status}</p>
            </Col>
            <Col md={6}>
              <p className='view-label'>Remarks</p>
              <p className='view-data'> {selectedDatas?.remarks}</p>
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

// ViewModal.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../style/view.css';
import { Container, Row, Col } from 'react-bootstrap';

function ViewModal({ showModal, handleClose, selectedDatas }) {
  return (
    <Modal show={showModal} onHide={handleClose} centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>View Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col md={6}>
              <p className='view-label'>First Name</p>
              <p className='view-data'> {selectedDatas?.fname}</p>
            </Col>
            <Col md={6}>
              <p className='view-label'>Last Name</p>
              <p className='view-data'> {selectedDatas?.lname}</p>
            </Col>
         
           <Col md={6}>
              <p className='view-label'>Email</p>
              <p className='view-data'> {selectedDatas?.email}</p>
            </Col>

            <Col md={6}>
              <p className='view-label'>Mobile</p>
              <p className='view-data'> {selectedDatas?.mobile}</p>
            </Col>
            
            <Col md={6}>
              <p className='view-label'>User Role</p>
              <p className='view-data'> {selectedDatas?.userRoles?.name}</p>
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

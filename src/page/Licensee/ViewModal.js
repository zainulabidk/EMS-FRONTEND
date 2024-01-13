// ViewModal.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../style/view.css';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';


function ViewModal({ showModal, handleClose, selectedDatas }) {
  const truncatedPassword = selectedDatas?.password?.length >= 10 ? selectedDatas.password.slice(50) : '';
  return (
    <Modal show={showModal} onHide={handleClose} centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>View Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col md={6}>
              <Form.Label style={{fontSize:'14px'}}>First Name</Form.Label>
              <Form.Control
                rows={3}
                disabled={true} 
                value={` ${selectedDatas?.fname || ''}`}
                className='custom-disabled-input'
              />
            </Col>
            <Col md={6}>
              <Form.Label style={{fontSize:'14px'}}>Last Name</Form.Label>
              <Form.Control
                rows={3}
                disabled={true} 
                value={` ${selectedDatas?.lname || ''}`}
                className='custom-disabled-input'
              />
            </Col>
         
           <Col md={6}>

               <Form.Label style={{fontSize:'14px'}}>Email</Form.Label>
              <Form.Control
                rows={3}
                disabled={true} 
                value={` ${selectedDatas?.email || ''}`}
                className='custom-disabled-input'
              />
            </Col>

            <Col md={6}>

               <Form.Label style={{fontSize:'14px'}}>Mobile</Form.Label>
              <Form.Control
                rows={3}
                disabled={true} 
                value={` ${selectedDatas?.mobile || ''}`}
                className='custom-disabled-input'
              />
            </Col>
            
      
            <Col md={6}>
   
              <Form.Label style={{fontSize:'14px'}}>User Type</Form.Label>
              <Form.Control
                rows={3}
                disabled={true} 
                value={` ${selectedDatas?.userType || ''}`}
                className='custom-disabled-input'
              />
            </Col>
            <Col md={6}>
   
   <Form.Label style={{fontSize:'14px'}}>User Role</Form.Label>
   <Form.Control
     rows={3}
     disabled={true} 
     value={` ${selectedDatas?.userRoles.name || ''}`}
     className='custom-disabled-input'
   />
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

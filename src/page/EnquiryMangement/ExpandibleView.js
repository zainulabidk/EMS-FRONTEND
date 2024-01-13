
import React from 'react'
import { Modal, Button, Container, Row, Col, Form } from 'react-bootstrap'
import './../style/view.css';

const ExpandedView  = ({ showModal, handleClose, selectedDatas }) => {
console.log( 'expandible FollowUp',selectedDatas);
  return (
   <>
    <Modal show={showModal} onHide={handleClose}  backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Follow-Up Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>

      <Container>
          <Row>
          <Col md={6} className='pe-0'>
           <Form.Label style={{fontSize:'14px'}}>Follow-Up Details</Form.Label>
              <Form.Control
                as="textarea"
                disabled={true} 
                value={`${selectedDatas?.followUpDetails || ''}`}
                className='custom-disabled-input'
              />
         </Col>

                  <Col md={6} className='pe-0'>
           <Form.Label style={{fontSize:'14px'}}>Remarks</Form.Label>
              <Form.Control
                as="textarea"
                disabled={true} 
                value={`${selectedDatas?.remarks || ''}`}
                className='custom-disabled-input'
              />
         </Col>
         <Col md={6}>
           <Form.Label style={{fontSize:'14px'}}>Next Contact Date</Form.Label>
              <Form.Control
                            disabled={true} 
                value={`${selectedDatas?.nextContactDate || ''}`}
                className='custom-disabled-input'
              />
         </Col>
         <Col md={6}>
           <Form.Label style={{fontSize:'14px'}}>Created At</Form.Label>
              <Form.Control
                            disabled={true} 
                value={`${selectedDatas?.createdAt || ''}`}
                className='custom-disabled-input'
              />
         </Col>
         <Col md={6}>
           <Form.Label style={{fontSize:'14px'}}>Created By</Form.Label>
              <Form.Control
                            disabled={true} 
                value={`${selectedDatas?.createdBy || ''}`}
                className='custom-disabled-input'
              />
         </Col>
       
            </Row>
            <Row>
   
            </Row>          
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{ background: 'none', color: '#5bb6ea', border: '1px solid #5bb6ea' }} onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </>

  )
}

export default ExpandedView 
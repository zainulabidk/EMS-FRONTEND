
import React from 'react'
import { Modal, Button, Container, Row, Col, Form } from 'react-bootstrap'
import './../style/view.css';

const ExpandedView  = ({ showModal, handleClose, selectedDatas }) => {
console.log( 'expandible FollowUp',selectedDatas);
  return (
   <>
    <Modal show={showModal} onHide={handleClose}  backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>FollowUp Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>

      <Container>
          <Row>
            <Col md={6}>
            <p className='view-label'>followUpDetails:</p>
            <p className='view-data'> {selectedDatas?.followUpDetails}</p>
            </Col>
            <Col md={6}>
              <p className='view-label'>nextContactDate</p>
              <p className='view-data'> {selectedDatas?.nextContactDate}</p>
            </Col> 
            </Row>
            <Row>
            <Col md={6}>
              <p className='view-label'>CreatedAt</p>
              <p className='view-data'> {selectedDatas?.createdAt}</p>
            </Col> 
            <Col md={6}>
              <p className='view-label'>CreatedBy</p>
              <p className='view-data'> {selectedDatas?.createdBy}</p>
            </Col>
            </Row>
            <Row>
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
    </>

  )
}

export default ExpandedView 
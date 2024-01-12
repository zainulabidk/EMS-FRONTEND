
// ViewModal.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './style/view.css';
import { Container, Row, Col } from 'react-bootstrap';

function ViewModal({ showModal, handleClose, selectedDatas }) {
  console.log('selectedDatas:', selectedDatas); 


  return (
    <Modal show={showModal} onHide={handleClose}  backdrop="static" centered className='view-modal'>
      <Modal.Header closeButton>
        <Modal.Title>View  Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>

      <Container>
          <Row className='first-row'>
            <h5>Details</h5>
            <Col md={3}>
            <p className='view-label'>Name</p>
            <p className='view-data'>{`${selectedDatas?.fName} ${selectedDatas?.lName} `}</p>
            </Col>
            <Col md={3}>
            <p className='view-label'>Reference Id</p>
            <p className='view-data'>{`${selectedDatas?.referenceId} ${selectedDatas?.referenceId} `}</p>
            </Col>
            <Col md={3}>
            <p className='view-label'>Lead Quality</p>
              <p className='view-data'> {`${selectedDatas?.leadQuality} ${selectedDatas?.leadQuality} `}</p>
            </Col>
            <Col md={3}>
              <p className='view-label'>Remarks</p>
              <p className='view-data'> {selectedDatas?.remarks}</p>
            </Col>
          
          
            <Col md={3}>
              <p className='view-label'>Description</p>
              <p className='view-data'> {selectedDatas?.enqDescp}</p>
            </Col>
            </Row>

            <Row className='first-row'>
            <h5>Address</h5>
         
            <Col md={3}>
              <p className='view-label'>Email</p>
              <p className='view-data'>{selectedDatas?.email}</p>
            </Col>

            <Col md={3}>
              <p className='view-label'>Mobile</p>
              <p className='view-data'>{selectedDatas?.mobile}</p>
            </Col>

            <Col md={3}>
              <p className='view-label'>Location</p>
              <p className='view-data'>{selectedDatas?.location}</p>
            </Col>
            <Col md={3}>
              <p className='view-label'>District</p>
              <p className='view-data'>{selectedDatas?.district}</p>
            </Col>
          
            <Col md={3}>
              <p className='view-label'>State</p>
              <p className='view-data'> {selectedDatas?.state}</p>
            </Col>
            <Col md={3}>
              <p className='view-label'>Gender</p>
              <p className='view-data'> {selectedDatas?.remarks ? 'male' : 'female'}</p>
            </Col>
            </Row>
            <Row className='first-row'>
            <h5>More Details</h5>
            <Col md={3}>
              <p className='view-label'>EnqSource</p>
              <p className='view-data'> {selectedDatas?.enqSource?.name}</p>
            </Col>
            <Col md={3}>
              <p className='view-label'>EnqType</p>
              <p className='view-data'> {selectedDatas?.enqType?.name}</p>
            </Col>
            <Col md={3}>
              <p className='view-label'>SupportType</p>
              <p className='view-data'> {selectedDatas?.supportType?.name}</p>
            </Col>
            <Col md={3}>
              <p className='view-label'>EnqMode</p>
              <p className='view-data'> {selectedDatas?.enqMode?.name}</p>
            </Col>
      
            <Col md={3}>
              <p className='view-label'>EnqTo</p>
              <p className='view-data'> {selectedDatas?.enqTo?.name}</p>
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

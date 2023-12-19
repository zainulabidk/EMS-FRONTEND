
// ViewModal.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../style/view.css';
import { Container, Row, Col } from 'react-bootstrap';

function FollowUpModal({ showFlwUpModal, handleFlwUpClose, selectedFlwUp }) {

    if (!selectedFlwUp) {
        return null; // or handle it in a way that makes sense for your application
      }


      const { enqId, followUpDetails, nextContactDate, createdBy, status, remarks } = selectedFlwUp;


  return (
    <Modal show={showFlwUpModal} onHide={handleFlwUpClose}  backdrop="static"  centered>
      <Modal.Header closeButton>
        <Modal.Title>View Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Container>
          <Row>
            <Col md={6}>
              <p className='view-label'>Name</p>
              <p className='view-data'>{`${enqId.fName || ''} ${enqId.lName || ''}`}</p>
     </Col>
            <Col md={6}>
              <p className='view-label'>FollowUp Details</p>
              <p className='view-data'>{followUpDetails}</p>
            </Col>
            </Row>
            <Row>
            <Col md={6}>
              <p className='view-label'>Next Contact Date</p>
              <p className='view-data'> {nextContactDate}</p>
            </Col>
            <Col md={6}>
              <p className='view-label'>createdBy</p>
              <p className='view-data'> {createdBy}</p>
            </Col>
            </Row>
            <Row>
            <Col md={6}>
              <p className='view-label'>Status</p>
              <p className='view-data'> {status}</p>
            </Col>
            <Col md={6}>
              <p className='view-label'>Remarks</p>
              <p className='view-data'> {remarks}</p>
            </Col>
            </Row>
        </Container>
        
      </Modal.Body>
      <Modal.Footer>
        <Button style={{ background: 'none', color: '#5bb6ea', border: '1px solid #5bb6ea' }} onClick={handleFlwUpClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FollowUpModal;


/*
// ViewModal.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../style/view.css';
import { Container, Row, Col } from 'react-bootstrap';

function FollowUpModal({ showModal, handleClose, selectedDatas }) {

    if (!selectedDatas) {
        return null; // or handle it in a way that makes sense for your application
      }

      const enqId = selectedDatas.enqId || {};

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
              <p className='view-data'>{`${enqId.fName || ''} ${enqId.lName || ''}`}</p>
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

export default FollowUpModal;

*/
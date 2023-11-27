
// ViewModal.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../style/view.css'

function ViewModal({ showModal, handleClose, selectedDatas }) {
  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>View  Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <div className='view'>
        <div>
        <p className='view-label'>Name:</p>
        <p className='view-data'> {selectedDatas?.fname}</p>
        </div>
        <div className=' lebel-2'>
        <p className='view-label' >Description:</p>
        <textarea className='view-data'>{selectedDatas?.lname}</textarea>
        </div>
        </div>
        <div className='view'>
        <div>
        <p className='view-label'>Status:</p>
        <button className='stts-btn'>{selectedDatas?.userType}</button>
        </div>
        <div className=' lebel-2'>
        <p className='view-label'>CreatedAt:</p>
        <p className='view-data'> {selectedDatas?.createdAt}</p>
        </div>
        </div>
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

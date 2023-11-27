
// ViewModal.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../Settings/style/view.css';

function ViewModal({ showModal, handleClose, selectedDatas }) {
  console.log('selectedDatas:', selectedDatas); 

 /* const renderObjectToString = (obj) => {
    if (obj && typeof obj === 'object') {
      return JSON.stringify(obj, null, 2); // Convert object to string with 2-space indentation
    }
    return obj;
  };*/

  return (
    <Modal show={showModal} onHide={handleClose}  backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>View  Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <div className='view'>
        <div>
        <p className='view-label'>EnqNo:</p>
        <p className='view-data'> {selectedDatas?.enqNo}</p>
        </div>
        <div className=' lebel-2'>
        <p className='view-label' >EnqDescp:</p>
       {/*} <textarea className="view-data" value={renderObjectToString(selectedDatas?.enqDescp)} readOnly />*/}

        <textarea className='view-data'>{selectedDatas?.enqDescp}</textarea>
        </div>
        </div>
        <div className='view'>
        <div>
        <p className='view-label'>Email:</p>
        <button className='stts-btn'>{selectedDatas?.email}</button>
        </div>
        <div className=' lebel-2'>
        <p className='view-label'>Location:</p>
        <p className='view-data'> {selectedDatas?.location}</p>
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

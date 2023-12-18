import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../style/delete.css';

const DeleteModal = ({ getDatas, deleteclose, dlt, id }) => {
  const [remove, setRemove] = useState(id);
  const [show, setShow] = useState(dlt);
  const [isDeleteSuccessful, setIsDeleteSuccessful] = useState(false);
  const [dltm, setDlt] = useState([]);

  useEffect(() => {
    setRemove(id);
  }, [id]);

  useEffect(() => {
    setShow(dlt);
  }, [dlt]);

  const handleModalClose = () => {
    deleteclose();
    setShow(false);
  };

 

  const dlts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      const deletedUsers = response.data.users.filter(user => user.isDeleted === true);
      setDlt(deletedUsers);
      console.log('Deleted Users:', deletedUsers);
    } catch (error) {
      console.error(error);
    }
  };
  


  // Call dlts() once on component mount
  useEffect(() => {
    dlts();
  }, []);

  const onDelete = (_id) => {
    axios
      .delete(`http://localhost:3000/users/${_id}`)
      .then((response) => {
        if (response.status === 200) {
          setIsDeleteSuccessful(true);
          toast.success('User Successfully Deleted !', {
            toastId: 'success',
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        getDatas();
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  };

  return (
    <>
      <Modal
        show={show}
        backdrop="static"
        centered
        onHide={handleModalClose}
        animation={false}
        dialogClassName="delete-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center fw-bold">
          Are you sure want to delete ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="text-white" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button
            variant="success"
            className="text-white"
            onClick={() => {
              onDelete(remove);
              handleModalClose();
            }}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={isDeleteSuccessful ? 'deleted-row' : ''}>
        {/* Render your row content here */}
      </div>
    </>
  );
};

export default DeleteModal;

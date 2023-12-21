import React,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'; 
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import '../style/delete.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteModal = ({getDatas,deleteclose, dlt,id}) => {

    const [remove, setRemove] = useState(id)


    useEffect(() => {
      setRemove(id)
    }, [id])
  

    const [show, setShow] = useState(dlt)

    useEffect(() => {
      setShow(dlt)
    }, [dlt])
  
    const handleModalClose = () => {
        deleteclose()
        setShow(false)
      }

    const onDelete = (_id) => {
<<<<<<< HEAD:src/page/FollowUp/DeleteModal.js
        axios.patch(`http://localhost:3000/followUp/${_id}`)
=======
        axios.patch(`http://localhost:3000/supportEnquiry/${_id}`)
>>>>>>> 794efed77d529366907c2a5c314bf5567a499f19:src/page/SupportEnquiry/DeleteModal.js
          .then(() => {
          
            toast.error('User Successfully Deleted !', {
                  toastId: 'success',
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 1000,
                })
            
            getDatas();
          })
          .catch((error) => {
            console.error('Error deleting data:', error);
            toast.error("Error in deleting the user",{ autoClose: 1000 })
          });
      };
    



<<<<<<< HEAD:src/page/FollowUp/DeleteModal.js
  return (
    <>
    <ToastContainer/>
      <Modal show={show} backdrop="static" centered onHide={handleModalClose} animation={false} dialogClassName="delete-modal" >
=======
      return (
        <>
        <Modal show={show} backdrop="static" centered onHide={handleModalClose} animation={false} dialogClassName="delete-modal" >
>>>>>>> 794efed77d529366907c2a5c314bf5567a499f19:src/page/SupportEnquiry/DeleteModal.js
          <Modal.Header closeButton >
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
      </>
      )
}

export default DeleteModal
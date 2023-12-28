import React,{useState,useEffect}from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../style/addmodel.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AddModal({enqId,getDatas, showFollowUpModal, setShowFollowUpModal }) {


  const [show, setShow] = React.useState(showFollowUpModal);


  const handleClose = () => {
    setShow(false);
    // Reset the form when the modal is closed
    formik.resetForm();
    setShowFollowUpModal(false);
  };


  const handleShow = () => setShow(true);

  useEffect(() => {
    setShow(showFollowUpModal);
  }, [showFollowUpModal]);
  
  // Validation schema using Yup
  const validationSchema = Yup.object({
    enqId: Yup.string().required('enqId is required'),
    followUpDetails: Yup.string().required('followUpDetails is required'),
    nextContactDate: Yup.string().required('nextContactDate is required'),
    remarks:Yup.string().required('remarks is required'),
  });

  const formik = useFormik({
    initialValues: {
      enqId: enqId || '', 
      followUpDetails: '',
      nextContactDate:'',
      status: 'new',
      remarks:'',
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'admin',
      updatedBy: 'admin',
      isDeleted: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {

      console.log('Form values:', values);
      try {
        // Validate the newItem object using Formik and Yup
        await validationSchema.validate(values, { abortEarly: false });

        
        const response = await axios.post('http://localhost:3000/followUp', values);
        console.log('Response:', response.data);
  
        getDatas();
        toast.success('Data Added successfully!',{ autoClose: 1000 });
    
        handleClose();
      } catch (error) {
        if (error.response) {
          console.log('Error Response:', error.response.data);
          console.log('Status Code:', error.response.status);
        } else if (error.request) {
          console.log('No response received from the server.');
        } else {
          console.log('Error:', error.message);
          toast.error('Error creating data Please try again.',{ autoClose: 1000 });
        }
      }
    },
  });

  return (
    <>
    <ToastContainer/>
   
      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"  backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '18px' }}>Add FollowUp</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={formik.handleSubmit}>
           
            <Form.Group className="mb-3" controlId="nextContactDate">
            <Form.Label style={{ fontSize: '14px' }}>Next Contact Date</Form.Label>
              <Form.Control
                type="text"
                name="nextContactDate"
                value={formik.values.nextContactDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.nextContactDate && formik.errors.nextContactDate ? (
                <div className="error" style={{color:'red'}}>{formik.errors.nextContactDate}</div>
              ) : null}
            </Form.Group>
          
            <Form.Group className="mb-3" controlId="followUpDetails">
            <Form.Label style={{ fontSize: '14px' }}>FollowUp Details</Form.Label>
              <Form.Control
                as="textarea"
                name="followUpDetails"
                value={formik.values.followUpDetails}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.followUpDetails && formik.errors.followUpDetails ? (
                <div className="error" style={{color:'red'}}>{formik.errors.followUpDetails}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3" controlId="remarks">
            <Form.Label style={{ fontSize: '14px' }}>Remarks</Form.Label>
              <Form.Control
                as="textarea"
                name="remarks"
                value={formik.values.remarks}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.remarks && formik.errors.remarks ? (
                <div className="error" style={{color:'red'}}>{formik.errors.remarks}</div>
              ) : null}
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ background: 'none', color: '#5bb6ea', border: '1px solid #5bb6ea' }} onClick={handleClose}>
            Close
          </Button>
          <Button style={{ background: '#5bb6ea', border: 'none', fontWeight: '600' }} onClick={formik.submitForm}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddModal;

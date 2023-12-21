import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ToggleButton from 'react-toggle-button';

import '../../style/addmodel.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

<<<<<<< HEAD
function AddModal({getDatas}) {
=======

function AddModal() {
>>>>>>> 794efed77d529366907c2a5c314bf5567a499f19
  const [show, setShow] = React.useState(false);
  const handleClose = () => {
    setShow(false);
    formik.resetForm(); // Reset Formik state when modal is closed
  };
  const handleShow = () => setShow(true);
<<<<<<< HEAD

   // Validation schema using Yup
   const validationSchema = Yup.object({
    name: Yup.string().required('OrgCategory is required'),
    descp: Yup.string().required('Description is required'),
=======
  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required!'),
    desc: Yup.string().required('Description is required!'),
>>>>>>> 794efed77d529366907c2a5c314bf5567a499f19
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      desc: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'admin',
      updatedBy: 'admin',
      isDeleted: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Validate the newItem object using Formik and Yup
        await validationSchema.validate(values, { abortEarly: false });

        
        const response = await axios.post('http://localhost:3000/orgCategory', values);
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
      <Button style={{ background: '#5bb6ea', border: 'none', color: 'white', fontWeight: '600' }} onClick={handleShow}>
        + New
      </Button>

      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"  backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '18px' }}>Add User Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
          
          <Form.Group className="mb-3" controlId="name">
              <Form.Label style={{ fontSize: '14px' }}>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error" style={{color:'red'}}>{formik.errors.name}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="desc">
              <Form.Label style={{ fontSize: '14px' }}>Description</Form.Label>
              <Form.Control
              as="textarea"
                type="text"
                placeholder="Enter Description"
                name="desc"
                value={formik.values.desc}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.desc && formik.errors.desc ? (
                <div className="error" style={{color:'red'}}>{formik.errors.desc}</div>
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

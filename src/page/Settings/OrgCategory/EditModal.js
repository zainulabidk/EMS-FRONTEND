// EditModal.js
import React,{useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../style/edit.css';

function EditModal({ showModal, handleClose, selectedDatas, handleUpdate }) {
  // Formik form configuration
  const formik = useFormik({
    initialValues: {
      name: selectedDatas?.name || '',
      descp: selectedDatas?.descp || '',
      

    },
    validationSchema: Yup.object({
        name: Yup.string().required('Name is required'),
        descp: Yup.string().required('descp is required'),
    }),
    onSubmit: (values) => {
      handleUpdate(selectedDatas?._id, values);
      handleClose();
    },
  });

  const handleModalHide = () => {
    formik.resetForm(); // Reset Formik state when modal is closed
    handleClose();
  };



  useEffect(() => {
    console.log("selectedDatas:", selectedDatas);
    formik.setValues({
      name: selectedDatas?.name || '',
      descp: selectedDatas?.descp || '',
   
    });
  }, [selectedDatas]);


  return (
    <Modal show={showModal} onHide={handleModalHide}  backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Organization Type</Modal.Title>
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
            <Form.Group className="mb-3" controlId="descp">
              <Form.Label style={{ fontSize: '14px' }}>Description</Form.Label>
              <Form.Control
              as="textarea"
                type="text"
                placeholder="Enter Description"
                name="descp"
                value={formik.values.descp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.descp && formik.errors.descp ? (
                <div className="error" style={{color:'red'}}>{formik.errors.descp}</div>
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
  );
}

export default EditModal;

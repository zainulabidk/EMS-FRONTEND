// EditModal.js
import React,{useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../Settings/style/edit.css';

function EditModal({ showModal, handleClose, selectedDatas, handleUpdate }) {
  // Formik form configuration
  const formik = useFormik({
    initialValues: {
      enqNo: selectedDatas?.enqNo || '',
      enqDescp: selectedDatas?.enqDescp || '',
    },
    validationSchema: Yup.object({
      enqNo: Yup.string().required('EnqNo is required'),
      enqDescp: Yup.string().required('EnqDescp is required'),
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
      enqNo: selectedDatas?.enqNo || '',
      enqDescp: selectedDatas?.enqDescp || '',
   
    });
  }, [selectedDatas]);


  return (
    <Modal show={showModal} onHide={handleModalHide}  backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Enquiries</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Formik Form with Validation */}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="enqNo" className="form-label">
            EnqNo:
            </label>
            <input
              type="text"
              id="enqNo"
              name="enqNo"
              className={`form-control ${formik.touched.enqNo && formik.errors.enqNo ? 'is-invalid' : ''}`}
              value={formik.values.enqNo}
              onChange={formik.handleChange}
            />
            {formik.touched.enqNo && formik.errors.enqNo && (
              <div className="invalid-feedback">{formik.errors.enqNo}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="enqDescp" className="form-label">
            EnqDescp:
            </label>
            <input
              type="text"
              id="enqDescp"
              name="enqDescp"
              className={`form-control ${formik.touched.enqDescp && formik.errors.enqDescp ? 'is-invalid' : ''}`}
              value={formik.values.enqDescp}
              onChange={formik.handleChange}
            />
            {formik.touched.enqDescp && formik.errors.enqDescp && (
              <div className="invalid-feedback">{formik.errors.enqDescp}</div>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button style={{ background: '#5bb6ea', border: 'none', color: 'white', fontWeight: '600' }} type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default EditModal;


import React,{useState,useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
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
      enqSource: selectedDatas?.enqSource || '',
      enqType: selectedDatas?.enqType || '', 
      enqMode: selectedDatas?.enqMode  || '',
      supportType: selectedDatas?.supportType || '', 
      fName:selectedDatas?.fName || '',
      lName:selectedDatas?.lName || '',
      gender:selectedDatas?.gender || '',
      email: selectedDatas?.email ||'',
      mobile: selectedDatas?.mobile ||'',
      district:selectedDatas?.district || '',
      location: selectedDatas?.location ||'',
      leadQuality:selectedDatas?.leadQuality || '',
      state:selectedDatas?.state || '',
      enqTo: selectedDatas?.enqTo || '', 
      referenceId:selectedDatas?.referenceId || '',
      remarks:selectedDatas?.remarks || '',

    },
    validationSchema: Yup.object({
      enqNo: Yup.string().required('EnqNo is required'),
      enqDescp: Yup.string().required('EnqDescp is required'),
      enqMode: Yup.string().required('Enquiry Mode is required'),
      enqSource: Yup.string().required('Enquiry Source is required'),
      enqType: Yup.string().required('Enquiry Type is required'),
      supportType: Yup.string().required('Support Type is required'),
      fName: Yup.string().required('fName is required'),
      lName: Yup.string().required('lName is required'),
      email: Yup.string().required('Email is required'),
      mobile: Yup.string().required('Mobile is required'),
      location: Yup.string().required('Location To is required'),
      district: Yup.string().required('District To is required'),
      enqTo: Yup.string().required('Enquiry To is required'),
      leadQuality: Yup.string().required('leadQuality is required'),
      state: Yup.string().required('State is required'),
      referenceId: Yup.string().required('ReferenceId is required'),
      remarks: Yup.string().required('Remarks is required'),
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
      enqSource: selectedDatas?.enqSource?._id || '', 
      enqType: selectedDatas?.enqType?._id || '', 
      enqMode: selectedDatas?.enqMode?._id || '', 
      supportType: selectedDatas?.supportType?._id || '', 
      fName:selectedDatas?.fName || '',
      lName:selectedDatas?.lName || '',
      gender:selectedDatas?.gender || '',
      email: selectedDatas?.email ||'',
      mobile: selectedDatas?.mobile ||'',
      district:selectedDatas?.district || '',
      location: selectedDatas?.location ||'',
      leadQuality:selectedDatas?.leadQuality || '',
      state:selectedDatas?.state || '',
      enqTo: selectedDatas?.enqTo?._id || '', 
      referenceId:selectedDatas?.referenceId || '',
      remarks:selectedDatas?.remarks || '',
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


// EditModal.js
import React,{useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col } from 'react-bootstrap';
import '../style/edit.css';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditModal({ showModal, handleClose, selectedDatas, handleUpdate }) {

    const [enquiry, setEnquiry] = useState([]);

    useEffect(()=>{
        fetchEnquiries();
    
      },[])
      
      const fetchEnquiries = async () => {
        try {
          const response = await axios.get('http://localhost:3000/enquiries');
          const filteredEnquiry = response.data.enquiry.filter(enq => !enq.isDeleted) || [];
          setEnquiry(filteredEnquiry);
          console.log(filteredEnquiry);
        } catch (error) {
          console.error(error);
        }
      };
  
  // Formik form configuration
  const formik = useFormik({
    initialValues: {
        enqId: selectedDatas?.enqId || '',
        followUpDetails: selectedDatas?.followUpDetails || '',
        nextContactDate: selectedDatas?.nextContactDate || '',
        status: selectedDatas?.status || '',
        remarks: selectedDatas?.remarks || ''

    },
    validationSchema: Yup.object({
        enqId: Yup.string().required('enqId is required'),
        followUpDetails: Yup.string().required('followUpDetails is required'),
        nextContactDate: Yup.string().required('nextContactDate is required'),
        remarks:Yup.string().required('remarks is required'),
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
        enqId: selectedDatas?.enqId?._id || '',
        followUpDetails: selectedDatas?.followUpDetails || '',
        nextContactDate: selectedDatas?.nextContactDate || '',
        status: selectedDatas?.status || '',
        remarks: selectedDatas?.remarks || '',
    });
  }, [selectedDatas]);
  

  return (
    <>
    <ToastContainer autoClose={1000}/>
    <Modal show={showModal} onHide={handleModalHide} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Support Enquiry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form onSubmit={formik.handleSubmit}>
          
             
      <Row>
            <Col md={6}>
      
          {/* Support Type Dropdown */}
         <Form.Group className="mb-3" controlId="enqId">
         <Form.Label style={{ fontSize: '14px' }}>Name</Form.Label>
              <Form.Control
                as="select"
                name="enqId"
                value={formik.values.enqId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-select ${formik.touched.enqId && formik.errors.enqId ? 'is-invalid' : ''}`}
                >
                <option value="" disabled>
                  Enquiry Id
                </option>
                {enquiry.map(enq => (
                  <option key={enq._id} value={enq._id}>
                     {`${enq.fName} ${enq.lName}`}
                  </option>
                ))}
              </Form.Control>
              {formik.touched.enqId && formik.errors.enqId ? (
                <div className="error" style={{color:'red'}}>{formik.errors.enqId}</div>
              ) : null}
            </Form.Group>
            </Col>
            <Col md={6}>
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
            </Col>

           </Row>
         
           <Row>
            <Col md={6}>
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
</Col>
<Col md={6}>
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
            </Col>
            </Row>
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

export default EditModal;


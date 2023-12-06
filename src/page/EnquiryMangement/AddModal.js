import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import '../Settings/style/addmodel.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function AddModal({getDatas}) {
  const [show, setShow] = React.useState(false);
  const [enquirySources, setEnquirySources] = useState([]);
  const [enquiryType,setEnquiryTpe] = useState([]);
  const [enquiryMode,setEnquiryMode] = useState([]);
  const [enqTo, setEnqTo] = useState([]);
  const [supportType,setSupportType] =useState([]);
  const [leadQuality, setLeadQuality] = useState(['High', 'Medium', 'Low']);


useEffect(()=>{

  fetchEnquirySource();
  fetchEnquiryType();
fetchEnquiryMode();
fetchEnquiryTo();
fetchSupportType();
},[])

  const handleClose = () => {
    setShow(false);
    formik.resetForm(); // Reset Formik state when modal is closed
  };
  const handleShow = () => setShow(true);

  const fetchEnquirySource = async () => {
    try {
      const response = await axios.get('http://localhost:3000/enquirySource');
      const filteredEnquirySources = response.data.enquiriesSource.filter(source => !source.isDeleted);
      setEnquirySources(filteredEnquirySources);
      console.log(filteredEnquirySources);
    } catch (error) {
      console.error(error);
    }
  };

  
    const fetchEnquiryType = async () => {
      try {
        const response = await axios.get('http://localhost:3000/enquiryType');
        const filteredEnquiryTypes = response.data.enquiryType.filter(type => !type.isDeleted);
        setEnquiryTpe(filteredEnquiryTypes);
        console.log(filteredEnquiryTypes);
      } catch (error) {
        console.error(error);
      }
    };
  

 const fetchEnquiryMode = async () => {
  try {
    const response = await axios.get('http://localhost:3000/enquiryMode');
    const enquiriesMode = response.data.enquiryModes.filter(mode => !mode.isDeleted) || [];
    setEnquiryMode(enquiriesMode);
    console.log(enquiriesMode);
  } catch (error) {
    console.error(error);
  }
};


 const fetchEnquiryTo = async () => {
  try {
    const response = await axios.get('http://localhost:3000/productService');
    const filteredEnqTo = response.data.product.filter(to => !to.isDeleted);
    setEnqTo(filteredEnqTo);
    // console.log(filteredEnqTo);
  } catch (error) {
    console.error(error);
  }
};

const fetchSupportType = async () => {
  try {
    const response = await axios.get('http://localhost:3000/supportType');
    const filteredSupportType = response.data.supportType.filter(type => !type.isDeleted) || [];
    setSupportType(filteredSupportType);
    // console.log(filteredSupportType);
  } catch (error) {
    console.error(error);
  }
};

  // Validation schema using Yup
  const validationSchema = Yup.object({
       
    enqNo: Yup.string().required('Description is required'),
    enqMode: Yup.string().required('Enquiry Mode is required'),
    enqSource: Yup.string().required('Enquiry Source is required'),
    enqType: Yup.string().required('Enquiry Type is required'),
    supportType: Yup.string().required('Support Type is required'),
    fName: Yup.string().required('fName is required'),
    lName: Yup.string().required('lName is required'),
    enqDescp: Yup.string().required('Description is required'),
    email: Yup.string().required('Email is required'),
    mobile: Yup.string().required('Mobile is required'),
    location: Yup.string().required('Location To is required'),
    district: Yup.string().required('District To is required'),
    enqTo: Yup.string().required('Enquiry To is required'),
    leadQuality: Yup.string().required('leadQuality is required'),
    state: Yup.string().required('State is required'),
    referenceId: Yup.string().required('ReferenceId is required'),
  });

  const formik = useFormik({
    initialValues: {
      enqNo: '',
      enqSource: '',
      enqType: '',
      enqMode: '',
      supportType: '',
      enqDescp: '',
      fName: '',
      lName: '',
      gender: '',
      email: '',
      mobile: '',
      district: '',
      location: '',
      state: '',
      enqTo: '',
      referenceId: '',
      remarks: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Validate the newItem object using Formik and Yup
        await validationSchema.validate(values, { abortEarly: false });

        const response = await axios.post('http://localhost:3000/enquiries', values);
        console.log('Response:', response.data);
        alert('Successfully added');

        handleClose();
        getDatas(); 
        // Refresh the page after successful submission
      //  window.location.reload();
      } catch (error) {
        if (error.response) {
          console.log('Error Response:', error.response.data);
          console.log('Status Code:', error.response.status);
        } else if (error.request) {
          console.log('No response received from the server.');
        } else {
          console.log('Error:', error.message);
          // Handle other errors
        }
      }
    },
  });

  return (
    <>
      <Button style={{ background: '#5bb6ea', border: 'none', color: 'white', fontWeight: '600' }} onClick={handleShow}>
        + New
      </Button>

      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"  backdrop="static" centered  className="custom-modal"  >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '18px' }}>Add Enquiry</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Form onSubmit={formik.handleSubmit}>
            <Row>
                <Col md={3}>
            <Form.Group className="mb-3 floating-label-group " controlId="enqNo">
      
              <Form.Control
                type="text"
                placeholder=" "
                name="enqNo"
                value={formik.values.enqNo}
                onChange={formik.handleChange}
                onBlur={() => formik.setFieldTouched('enqNo', true)}
                onFocus={() => formik.setFieldTouched('enqNo', false)} // Reset touch state on focus
                className={(formik.touched.enqNo && formik.errors.enqNo) ? 'error-border' : ''}
              />
              <Form.Label className={formik.touched.enqNo || formik.values.enqNo ? 'floating' : ''}
               style={{ color: formik.touched.enqNo && formik.errors.enqNo ? 'red' : '#5bb6ea !importend' }}>
                EnqNo</Form.Label>
                    {formik.touched.enqNo && formik.errors.enqNo ? (
                      <div className="error">
                        {formik.errors.enqNo}
                      </div>
                    ) : null}
          
            </Form.Group>
           </Col>
           <Col md={3}>
            <Form.Group className="mb-3 floating-label-group" controlId="fName">
          
              <Form.Control
                type="text"
                placeholder=" "
                name="fName"
                value={formik.values.fName}
                onChange={formik.handleChange}
                onBlur={() => formik.setFieldTouched('fName', true)}
                onFocus={() => formik.setFieldTouched('fName', false)} // Reset touch state on focus
                className={(formik.touched.fName && formik.errors.fName) ? 'error-border' : ''}
              />
              <Form.Label className={formik.touched.fName || formik.values.fName ? 'floating' : ''}
               style={{ color: formik.touched.fName && formik.errors.fName ? 'red' : '#5bb6ea !importend' }}>
                First Name</Form.Label>
                    {formik.touched.fName && formik.errors.fName ? (
                      <div className="error">
                        {formik.errors.fName}
                      </div>
                    ) : null}
          
            </Form.Group>
            </Col>
            <Col md={3}>
            <Form.Group className="mb-3 floating-label-group" controlId="lName">
            
              <Form.Control
                type="text"
                placeholder=" "
                name="lName"
                value={formik.values.lName}
                onChange={formik.handleChange}
                onBlur={() => formik.setFieldTouched('lName', true)}
                onFocus={() => formik.setFieldTouched('lName', false)} // Reset touch state on focus
                className={(formik.touched.lName && formik.errors.lName) ? 'error-border' : ''}
              />
             <Form.Label className={formik.touched.lName || formik.values.lName ? 'floating' : ''}
               style={{ color: formik.touched.lName && formik.errors.lName ? 'red' : '#5bb6ea !importend' }}>
                Last Name</Form.Label>
                    {formik.touched.lName && formik.errors.lName ? (
                      <div className="error">
                        {formik.errors.lName}
                      </div>
                    ) : null}
          
            </Form.Group>
            </Col>
            <Col md={3}>
            <Form.Group className="mb-3 floating-label-group" controlId="enqDescp">
             
              <Form.Control
                type="text"
                placeholder=" "
                name="enqDescp"
                value={formik.values.enqDescp}
                onChange={formik.handleChange}
                onBlur={() => formik.setFieldTouched('enqDescp', true)}
                onFocus={() => formik.setFieldTouched('enqDescp', false)} // Reset touch state on focus
                className={(formik.touched.enqDescp && formik.errors.enqDescp) ? 'error-border' : ''}
              />
              <Form.Label className={formik.touched.enqDescp || formik.values.enqDescp ? 'floating' : ''}
               style={{ color: formik.touched.enqDescp && formik.errors.enqDescp ? 'red' : '#5bb6ea !importend' }}>
                Description</Form.Label>
                    {formik.touched.enqDescp && formik.errors.enqDescp ? (
                      <div className="error">
                        {formik.errors.enqDescp}
                      </div>
                    ) : null}
            </Form.Group>
            </Col>
           </Row>
            <Row>
              
            <Col md={3}>
            <Form.Group className="mb-3 floating-label-group" controlId="email">
            
              <Form.Control
                type="email"
                placeholder=" "
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={() => formik.setFieldTouched('email', true)}
                onFocus={() => formik.setFieldTouched('email', false)} // Reset touch state on focus
                className={(formik.touched.email && formik.errors.email) ? 'error-border' : ''}
              />
              <Form.Label className={formik.touched.email || formik.values.email ? 'floating' : ''}
               style={{ color: formik.touched.email && formik.errors.email ? 'red' : '#5bb6ea !importend' }}>
                Email</Form.Label>
                    {formik.touched.email && formik.errors.email ? (
                      <div className="error">
                        {formik.errors.email}
                      </div>
                    ) : null}
          
            </Form.Group>
             </Col>
             <Col md={3}>
            <Form.Group className="mb-3 floating-label-group" controlId="mobile">
              <Form.Control
                type="text"
                placeholder=" "
                name="mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={() => formik.setFieldTouched('mobile', true)}
                onFocus={() => formik.setFieldTouched('mobile', false)} // Reset touch state on focus
                className={(formik.touched.mobile && formik.errors.mobile) ? 'error-border' : ''}
              />
              <Form.Label className={formik.touched.mobile || formik.values.mobile ? 'floating' : ''}
               style={{ color: formik.touched.mobile && formik.errors.mobile ? 'red' : '#5bb6ea !importend' }}>
                Mobile</Form.Label>
                    {formik.touched.mobile && formik.errors.mobile ? (
                      <div className="error">
                        {formik.errors.mobile}
                      </div>
                    ) : null}
          
            </Form.Group>

            </Col>
           
          
<Col md={3}>

            <Form.Group className="mb-3 floating-label-group" controlId="location">
           
              <Form.Control
                type="text"
                placeholder=" "
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={() => formik.setFieldTouched('location', true)}
                onFocus={() => formik.setFieldTouched('location', false)} // Reset touch state on focus
                className={(formik.touched.location && formik.errors.location) ? 'error-border' : ''}
              />
             <Form.Label className={formik.touched.location || formik.values.location ? 'floating' : ''}
               style={{ color: formik.touched.location && formik.errors.location ? 'red' : '#5bb6ea !importend' }}>
                Location</Form.Label>
                    {formik.touched.location && formik.errors.location ? (
                      <div className="error">
                        {formik.errors.location}
                      </div>
                    ) : null}
          
            </Form.Group>
            </Col>

            <Col md={3}>
            <Form.Group className="mb-3 floating-label-group" controlId="district">
         
              <Form.Control
                type="text"
                placeholder=" "
                name="district"
                value={formik.values.district}
                onChange={formik.handleChange}
                onBlur={() => formik.setFieldTouched('district', true)}
                onFocus={() => formik.setFieldTouched('district', false)} // Reset touch state on focus
                className={(formik.touched.district && formik.errors.district) ? 'error-border' : ''}
      
              />
              <Form.Label className={formik.touched.district || formik.values.district ? 'floating' : ''}
               style={{ color: formik.touched.district && formik.errors.district ? 'red' : '#5bb6ea !importend' }}>
                District</Form.Label>
                    {formik.touched.district && formik.errors.district ? (
                      <div className="error">
                        {formik.errors.district}
                      </div>
                    ) : null}
          
            </Form.Group>
              </Col>
             
            </Row>
            <Row>
        
      
              <Col md={3}>
              <Form.Group className="mb-3 floating-label-group" controlId="state">
              <Form.Control
                type="text"
                placeholder=" "
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={() => formik.setFieldTouched('state', true)}
                onFocus={() => formik.setFieldTouched('state', false)} // Reset touch state on focus
                className={(formik.touched.state && formik.errors.state) ? 'error-border' : ''}
      
              />
            <Form.Label className={formik.touched.state || formik.values.state ? 'floating' : ''}
               style={{ color: formik.touched.state && formik.errors.state ? 'red' : '#5bb6ea !importend' }}>
                State</Form.Label>
                    {formik.touched.state && formik.errors.state ? (
                      <div className="error">
                        {formik.errors.state}
                      </div>
                    ) : null}
          
            </Form.Group>
         </Col>
      
              <Col md={3}>
  {/* Enquiry Source Dropdown */}
  <Form.Group className="mb-3 floating-label-group" controlId="enqSource">
   
    <Form.Control
      as="select"
      name="enqSource"
      value={formik.values.enqSource}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className={(formik.touched.enqSource && formik.errors.enqSource) ? 'error-border' : ''}
    >
      <option value="" disabled>
        Enquiry Source
      </option>
      {enquirySources.map(source => (
        <option key={source._id} value={source._id}>
          {source.name}
        </option>
      ))}
    </Form.Control>
    <Form.Label className={formik.touched.enqSource || formik.values.enqSource ? 'floating' : ''}
      style={{ color: formik.touched.enqSource && formik.errors.enqSource ? 'red' : '#5bb6ea !important' }}>
    
    </Form.Label>
  </Form.Group>
</Col>

        <Col md={3}>
         
              {/* Enquiry Type Dropdown */}
              <Form.Group className="mb-3 floating-label-group" controlId="enqType">
            
              <Form.Control
                as="select"
                name="enqType"
                value={formik.values.enqType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={(formik.touched.enqType && formik.errors.enqType) ? 'error-border' : ''}
              >
                <option value="" disabled selected >
                   Enquiry Type
                </option>
                {enquiryType.map(type => (
                  <option key={type._id} value={type._id}>
                    {type.name}
                  </option>
                ))}
              </Form.Control>
              <Form.Label className={formik.touched.enqType || formik.values.enqType ? 'floating' : ''}
      style={{ color: formik.touched.enqType && formik.errors.enqType ? 'red' : '#5bb6ea !important' }}>
    
    </Form.Label>
            </Form.Group>
</Col>

<Col md={3}>
               {/* Enquiry Mode Dropdown */}
                 <Form.Group className="mb-3 floating-label-group " controlId="enqMode">
             
              <Form.Control
                as="select"
                name="enqMode"
                value={formik.values.enqMode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={(formik.touched.enqMode && formik.errors.enqMode) ? 'error-border' : ''}
       
              >
                <option value="" disabled>
                   Enquiry Mode
                </option>
                {enquiryMode.map(mode => (
                  <option key={mode._id} value={mode._id}>
                    {mode.name}
                  </option>
                ))}
              </Form.Control>
              <Form.Label className={formik.touched.enqMode || formik.values.enqMode ? 'floating' : ''}
      style={{ color: formik.touched.enqMode && formik.errors.enqMode ? 'red' : '#5bb6ea !important' }}>
    
    </Form.Label>
            </Form.Group>

            </Col>
</Row>
<Row>       
                <Col md={3}>
          {/* Enquiry To Dropdown */}
             <Form.Group className="mb-3 floating-label-group " controlId="enqTo">
              <Form.Control
                as="select"
                name="enqTo"
                value={formik.values.enqTo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={(formik.touched.enqTo && formik.errors.enqTo) ? 'error-border' : ''}
       
              >
                <option value="" disabled>
                 Enquiry To
                </option>
                {enqTo.map(to => (
                  <option key={to._id} value={to._id}>
                    {to.name}
                  </option>
                ))}
              </Form.Control>
              <Form.Label className={formik.touched.enqTo || formik.values.enqTo ? 'floating' : ''}
      style={{ color: formik.touched.enqTo && formik.errors.enqTo ? 'red' : '#5bb6ea !important' }}>
    
    </Form.Label>
            </Form.Group>
            </Col>
             <Col md={3}>
          {/* Support Type Dropdown */}
         <Form.Group className="mb-3 floating-label-group  " controlId="supportType">
           
              <Form.Control
                as="select"
                name="supportType"
                value={formik.values.supportType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={(formik.touched.supportType && formik.errors.supportType) ? 'error-border' : ''}
              >
                <option value="" disabled>
                  Support Type
                </option>
                {supportType.map(support => (
                  <option key={support._id} value={support._id}>
                     {support.name}
                  </option>
                ))}
              </Form.Control>
              <Form.Label className={formik.touched.supportType || formik.values.supportType ? 'floating' : ''}
      style={{ color: formik.touched.supportType && formik.errors.supportType ? 'red' : '#5bb6ea !important' }}>
    
    </Form.Label>
            </Form.Group>
            </Col>
          
         <Col md={3}>
  <Form.Group className="mb-3  floating-label-group " controlId="leadQuality">
    <Form.Control
      as="select"
      placeholder=' '
      name="leadQuality"
      value={formik.values.leadQuality}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className={(formik.touched.leadQuality && formik.errors.leadQuality) ? 'error-border' : ''}
         
    >
      <option value="" disabled>
        Lead Quality
      </option>
      {leadQuality.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Form.Control>
    <Form.Label className={formik.touched.leadQuality || formik.values.leadQuality ? 'floating' : ''}
      style={{ color: formik.touched.leadQuality && formik.errors.leadQuality ? 'red' : '#5bb6ea !important' }}>
    
    </Form.Label>
  </Form.Group>
</Col>
<Col md={3}>
            <Form.Group className="mb-3 floating-label-group " controlId="referenceId">
          
              <Form.Control
                type="text"
                placeholder=" "
                name="referenceId"
                value={formik.values.referenceId}
                onChange={formik.handleChange}
                onBlur={() => formik.setFieldTouched('referenceId', true)}
                onFocus={() => formik.setFieldTouched('referenceId', false)} // Reset touch state on focus
                className={(formik.touched.referenceId && formik.errors.referenceId) ? 'error-border' : ''}
      
              />
             <Form.Label className={formik.touched.referenceId || formik.values.referenceId ? 'floating' : ''}
               style={{ color: formik.touched.referenceId && formik.errors.referenceId ? 'red' : '#5bb6ea !importend' }}>
                ReferenceId</Form.Label>
                    {formik.touched.referenceId && formik.errors.referenceId ? (
                      <div className="error">
                        {formik.errors.referenceId}
                      </div>
                    ) : null}
          
          
            </Form.Group>
            
            </Col>
          
</Row>
<Row>        

 
<Col md={6}>
  <Form.Group className="mb-3  radio-group" controlId="gender">
  <Form.Label className={`${formik.touched.gender || formik.values.gender ? 'floating' : ''} ${formik.touched.gender && formik.errors.gender ? 'error-label' : ''}`} style={{ fontSize: '14px' }}>
      Gender
    </Form.Label>
    <div className="radio-group">
      <Form.Check
        type="radio"
        label="Male"
        name="gender"
        id="male"
        value="male"
        checked={formik.values.gender === 'male'}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      <Form.Check
        type="radio"
        label="Female"
        name="gender"
        id="female"
        value="female"
        checked={formik.values.gender === 'female'}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
    </div>

    {formik.touched.gender && formik.errors.gender && (
      <div className="error" style={{ color: 'red' }}>
        {formik.errors.gender}
      </div>
    )}
  </Form.Group>
</Col>



  
    <Col md={6}>
  <Form.Group className="mb-3 floating-label-group" controlId="remarks">
    <Form.Control
      type="textarea"
      placeholder=" "
      name="remarks"
      value={formik.values.remarks}
      onChange={formik.handleChange}
      onBlur={() => formik.setFieldTouched('remarks', true)}
      onFocus={() => formik.setFieldTouched('remarks', false)} // Reset touch state on focus
      className={(formik.touched.remarks && formik.errors.remarks) ? 'error-border' : ''}
      style={{ height: '46px', paddingTop: '0' }}
    />
    <Form.Label className={`${formik.touched.remarks || formik.values.remarks ? 'floating' : ''} `}
      style={{ color: formik.touched.remarks && formik.errors.remarks ? 'red' : '#5bb6ea !important' }}>
      Remarks
    </Form.Label>
    {formik.touched.remarks && formik.errors.remarks ? (
      <div className="error">
        {formik.errors.remarks}
      </div>
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

export default AddModal;

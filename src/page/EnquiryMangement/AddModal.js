/*import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Tab.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddModal = ({getDatas}) => {

    const [toggle,setToggle] =useState(1);
    const [currentTab, setCurrentTab] = useState(1);


const toggleTab = (index)=>{
setToggle(index);
setCurrentTab(index);
}

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
    console.log(filteredEnqTo);
  } catch (error) {
    console.error(error);
  }
};

const fetchSupportType = async () => {
  try {
    const response = await axios.get('http://localhost:3000/supportType');
    const filteredSupportType = response.data.supportType.filter(type => !type.isDeleted) || [];
    setSupportType(filteredSupportType);
    console.log(filteredSupportType);
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
    remarks: Yup.string().required('Remarks is required'),
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
      leadQuality:'',
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
        toast.success('Data Added successfully!');
        // Refresh the page after successful submission
       window.location.reload();

      } catch (error) {
        if (error.response) {
          console.log('Error Response:', error.response.data);
          console.log('Status Code:', error.response.status);
        } else if (error.request) {
          console.log('No response received from the server.');
        } else {
          console.log('Error:', error.message);
          toast.error('Error updating data. Please try again.');
        }
      }
    },
  });



  return (
    <>
      <ToastContainer />
 <Button style={{ background: '#5bb6ea', border: 'none', color: 'white', fontWeight: '600' }} onClick={handleShow}>
        + New
      </Button>
      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"  backdrop="static" centered  className="custom-modal"  >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '18px' }}>Add Enquiry</Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <Form onSubmit={formik.handleSubmit}>
        <div className='App'>

  <div className='box'>

  <div className='tabs'>
    <div  onClick={() => toggleTab(1)}  className={`${toggle === 1 ? 'tab active-tab' :'tab'}`}>
      Details
    </div>
    <div  onClick={() => toggleTab(2)}  className={`${toggle === 2 ? 'tab active-tab' :'tab'}`}>
      Address
    </div>
    <div  onClick={() => toggleTab(3)}  className={`${toggle === 3 ? 'tab active-tab' :'tab'}`}>
      More
    </div>
  </div>
</div>

<div className='contents'>
    <div className={`${toggle === 1 ? 'content active-content' :'content'}`}>
    <Row>
                <Col md={6}>
            <Form.Group className="mb-3 " controlId="enqNo">
         
              <Form.Control
                type="text"
                placeholder="EnqNo"
                name="enqNo"
                value={formik.values.enqNo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{marginTop:'5px'}}
              />
             {formik.touched.enqNo && formik.errors.enqNo ? (
                <div className="error" style={{color:'red'}}>{formik.errors.enqNo}</div>
              ) : null}
          
            </Form.Group>

          </Col>
            <Col md={6}>
  <Form.Group className="mb-3" controlId="gender">
  <Form.Label style={{ fontSize: '14px',marginTop:'2px'}}>Gender</Form.Label>
  <div className="radio-group" style={{ marginTop: '-13px' }} >
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
        <Form.Check
        type="radio"
        label="other"
        name="gender"
        id="other"
        value="other"
        checked={formik.values.gender === 'other'}
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
   </Row>
   <Row>
         
           <Col md={6}>
            <Form.Group className="mb-3" controlId="fName">
         
              <Form.Control
                type="text"
                placeholder="FirstName"
                name="fName"
                value={formik.values.fName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              
              />
             {formik.touched.fName && formik.errors.fName ? (
                <div className="error" style={{color:'red'}}>{formik.errors.fName}</div>
              ) : null}
          
            </Form.Group>
            </Col>

       
            <Col md={6}>
  <Form.Group className="mb-3" controlId="leadQuality">
    <Form.Control
      as="select"
      name="leadQuality"
      value={formik.values.leadQuality}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
  
    >
      <option value=" " disabled>
        Lead Quality
      </option>
      {leadQuality.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Form.Control>
    {formik.touched.leadQuality && formik.errors.leadQuality ? (
                <div className="error" style={{color:'red'}}>{formik.errors.leadQuality}</div>
              ) : null}
  </Form.Group>
</Col>
<Col md={6}>
            <Form.Group className="mb-3" controlId="lName">           
              <Form.Control
                type="text"
                placeholder="LastName"
                name="lName"
                value={formik.values.lName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                
              />
           {formik.touched.lName && formik.errors.lName ? (
                <div className="error" style={{color:'red'}}>{formik.errors.lName}</div>
              ) : null}
          
            </Form.Group>
            </Col>
          

            <Col md={6}>
  <Form.Group className="mb-3" controlId="remarks">
    <Form.Control
      as="textarea"
      placeholder="Remarks"
      name="remarks"
      value={formik.values.remarks}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      style={{ height: '46px', paddingTop: '0'}}
    />
        {formik.touched.remarks && formik.errors.remarks ? (
                <div className="error" style={{color:'red'}}>{formik.errors.remarks}</div>
              ) : null}
          
  </Form.Group>
</Col>
<Col md={6}>
            <Form.Group className="mb-3" controlId="referenceId">
          
              <Form.Control
                type="text"
                placeholder="ReferenceId"
                name="referenceId"
                value={formik.values.referenceId}
                onChange={formik.handleChange}         
                onBlur={formik.handleBlur}
                style={{marginTop:'-10px'}}
              />
               {formik.touched.referenceId && formik.errors.referenceId ? (
                <div className="error" style={{color:'red'}}>{formik.errors.referenceId}</div>
              ) : null}
          
          
            </Form.Group>
            
            </Col>
           
           
            <Col md={6}>
            <Form.Group className="mb-3" controlId="enqDescp">       
              <Form.Control
                as="textarea"
                placeholder="enqDescp"
                name="enqDescp"
                value={formik.values.enqDescp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ height: '46px', paddingTop: '0' }}
              />
                {formik.touched.enqDescp && formik.errors.enqDescp ? (
                <div className="error" style={{color:'red'}}>{formik.errors.enqDescp}</div>
              ) : null}
          
            </Form.Group>
            </Col>
          
            
          
            </Row>
    </div>

    <div className={`${toggle === 2 ? 'content active-content' :'content'}`}>
    <Row>
              
              <Col md={6}>
              <Form.Group className="mb-3" controlId="email">
              
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                <div className="error" style={{color:'red'}}>{formik.errors.email}</div>
              ) : null}
            
              </Form.Group>
               </Col>
               <Col md={6}>
              <Form.Group className="mb-3" controlId="mobile">
                <Form.Control
                  type="text"
                  placeholder="Mobile"
                  name="mobile"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
               {formik.touched.mobile && formik.errors.mobile ? (
                <div className="error" style={{color:'red'}}>{formik.errors.mobile}</div>
              ) : null}
            
              </Form.Group>
  
              </Col>
             </Row>
         <Row>  
  <Col md={6}>
  
              <Form.Group className="mb-3" controlId="location">
             
                <Form.Control
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
               {formik.touched.location && formik.errors.location ? (
                <div className="error" style={{color:'red'}}>{formik.errors.location}</div>
              ) : null}
              </Form.Group>
              </Col>
  
              <Col md={6}>
              <Form.Group className="mb-3" controlId="district">
           
                <Form.Control
                  type="text"
                  placeholder="District"
                  name="district"
                  value={formik.values.district}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
        
                />
                {formik.touched.district && formik.errors.district ? (
                <div className="error" style={{color:'red'}}>{formik.errors.district}</div>
              ) : null}
            
              </Form.Group>
                </Col>
               
              </Row>
              <Row>
          
        
                <Col md={6}>
                <Form.Group className="mb-3" controlId="state">
                <Form.Control
                  type="text"
                  placeholder="State"
                  name="state"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
        
                />
              {formik.touched.state && formik.errors.state ? (
                <div className="error" style={{color:'red'}}>{formik.errors.state}</div>
              ) : null}
            
              </Form.Group>
           </Col>
           </Row>
    </div>

    <div className={`${toggle === 3 ? 'content active-content' :'content'}`}>
      <Row>
       <Col md={6}>
  {/* Enquiry Source Dropdown *
  <Form.Group className="mb-3" controlId="enqSource">
   
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
    {formik.touched.enqSource && formik.errors.enqSource ? (
                <div className="error" style={{color:'red'}}>{formik.errors.enqSource}</div>
              ) : null}
  </Form.Group>
</Col>

        <Col md={6}>
         
              {/* Enquiry Type Dropdown *
              <Form.Group className="mb-3" controlId="enqType">
            
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
              {formik.touched.enqType && formik.errors.enqType ? (
                <div className="error" style={{color:'red'}}>{formik.errors.enqType}</div>
              ) : null}
            </Form.Group>
</Col>
</Row>
<Row>
<Col md={6}>
               {/* Enquiry Mode Dropdown *
                 <Form.Group className="mb-3" controlId="enqMode">
             
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
              {formik.touched.enqMode && formik.errors.enqMode ? (
                <div className="error" style={{color:'red'}}>{formik.errors.enqMode}</div>
              ) : null}
    </Form.Group>
    </Col>
      
                <Col md={6}>
          {/* Enquiry To Dropdown *
             <Form.Group className="mb-3" controlId="enqTo">
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
              {formik.touched.enqTo && formik.errors.enqTo ? (
                <div className="error" style={{color:'red'}}>{formik.errors.enqTo}</div>
              ) : null}
            </Form.Group>
            </Col>

               
</Row>
<Row> 
             <Col md={6}>
          {/* Support Type Dropdown *
         <Form.Group className="mb-3" controlId="supportType">
           
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
              {formik.touched.supportType && formik.errors.supportType ? (
                <div className="error" style={{color:'red'}}>{formik.errors.supportType}</div>
              ) : null}
            </Form.Group>
            </Col>
        
    </Row>
    </div>

</div>
    </div>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ background: 'none', color: '#5bb6ea', border: '1px solid #5bb6ea' }} onClick={handleClose}>
            Close
          </Button>
          <Button style={{ background: '#5bb6ea', border: 'none', fontWeight: '600' }} 
          onClick={formik.submitForm}    disabled={currentTab !== 3} >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default AddModal
*/
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Tab.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddModal = ({getDatas}) => {

    const [toggle,setToggle] =useState(1);
    const [currentTab, setCurrentTab] = useState(1);


const toggleTab = (index)=>{
setToggle(index);
setCurrentTab(index);
}

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
      const filteredEnquirySources = response.data.enquiriesSource.filter(source => !source.isDeleted)
      .sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) return -1; // Sort in alphabetical ascending order
        if (nameA > nameB) return 1;
        return 0;
      });  
      setEnquirySources(filteredEnquirySources);
      console.log(filteredEnquirySources);
    } catch (error) {
      console.error(error);
    }
  };

  
    const fetchEnquiryType = async () => {
      try {
        const response = await axios.get('http://localhost:3000/enquiryType');
        const filteredEnquiryTypes = response.data.enquiryType.filter(type => !type.isDeleted)
        .sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) return -1; // Sort in alphabetical ascending order
          if (nameA > nameB) return 1;
          return 0;
        });
        setEnquiryTpe(filteredEnquiryTypes);
        console.log(filteredEnquiryTypes);
      } catch (error) {
        console.error(error);
      }
    };
  

 const fetchEnquiryMode = async () => {
  try {
    const response = await axios.get('http://localhost:3000/enquiryMode');
    const enquiriesMode = response.data.enquiryModes.filter(mode => !mode.isDeleted) 
     .sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) return -1; // Sort in alphabetical ascending order
      if (nameA > nameB) return 1;
      return 0;
    });;
    setEnquiryMode(enquiriesMode);
    console.log(enquiriesMode);
  } catch (error) {
    console.error(error);
  }
};


 const fetchEnquiryTo = async () => {
  try {
    const response = await axios.get('http://localhost:3000/productService');
    const filteredEnqTo = response.data.product.filter(to => !to.isDeleted)
    .sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) return -1; // Sort in alphabetical ascending order
      if (nameA > nameB) return 1;
      return 0;
    });
    setEnqTo(filteredEnqTo);
    console.log(filteredEnqTo);
  } catch (error) {
    console.error(error);
  }
};

const fetchSupportType = async () => {
  try {
    const response = await axios.get('http://localhost:3000/supportType');
    const filteredSupportType = response.data.supportType.filter(type => !type.isDeleted) 
    .sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) return -1; // Sort in alphabetical ascending order
      if (nameA > nameB) return 1;
      return 0;
    });
    setSupportType(filteredSupportType);
    console.log(filteredSupportType);
  } catch (error) {
    console.error(error);
  }
};

  // Validation schema using Yup
  const validationSchema = Yup.object({
       
  
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
    remarks: Yup.string().required('Remarks is required'),
  });

  const formik = useFormik({
    initialValues: {
     
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
      status:"new",
      enqTo: '',
      leadQuality:'',
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
      <ToastContainer />
 <Button style={{ background: '#5bb6ea', border: 'none', color: 'white', fontWeight: '600' }} onClick={handleShow}>
        + New
      </Button>
      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"  backdrop="static" centered  className="custom-modal"  >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '18px' }}>Add Enquiry</Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <Form onSubmit={formik.handleSubmit}>
        <div className='App'>

  <div className='box'>

  <div className='tabs'>
    <div  onClick={() => toggleTab(1)}  className={`${toggle === 1 ? 'tab active-tab' :'tab'}`}>
      Details
    </div>
    <div  onClick={() => toggleTab(2)}  className={`${toggle === 2 ? 'tab active-tab' :'tab'}`}>
      Address
    </div>
    <div  onClick={() => toggleTab(3)}  className={`${toggle === 3 ? 'tab active-tab' :'tab'}`}>
      More
    </div>
  </div>
</div>

<div className='contents'>
    <div className={`${toggle === 1 ? 'content active-content' :'content'}`}>
    <Row>
             
            <Col md={6}>
  <Form.Group className="mb-3" controlId="gender">
  <Form.Label style={{ fontSize: '14px',marginTop:'2px'}}>Gender</Form.Label>
  <div className="radio-group" style={{ marginTop: '-13px' }} >
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
        <Form.Check
        type="radio"
        label="other"
        name="gender"
        id="other"
        value="other"
        checked={formik.values.gender === 'other'}
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
   </Row>
   <Row>
         
           <Col md={6}>
            <Form.Group className="mb-3" controlId="fName">
         
              <Form.Control
                type="text"
                placeholder="FirstName"
                name="fName"
                value={formik.values.fName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              
              />
             {formik.touched.fName && formik.errors.fName ? (
                <div className="error" style={{color:'red'}}>{formik.errors.fName}</div>
              ) : null}
          
            </Form.Group>
            </Col>

       
            <Col md={6}>
  <Form.Group className="mb-3" controlId="leadQuality">
    <Form.Control
      as="select"
      name="leadQuality"
      value={formik.values.leadQuality}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className={`form-select ${formik.touched.leadQuality && formik.errors.leadQuality ? 'is-invalid' : ''}`}
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
    {formik.touched.leadQuality && formik.errors.leadQuality ? (
                <div className="error" style={{color:'red'}}>{formik.errors.leadQuality}</div>
              ) : null}
  </Form.Group>
</Col>
<Col md={6}>
            <Form.Group className="mb-3" controlId="lName">           
              <Form.Control
                type="text"
                placeholder="LastName"
                name="lName"
                value={formik.values.lName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                
              />
           {formik.touched.lName && formik.errors.lName ? (
                <div className="error" style={{color:'red'}}>{formik.errors.lName}</div>
              ) : null}
          
            </Form.Group>
            </Col>
          

            <Col md={6}>
  <Form.Group className="mb-3" controlId="remarks">
    <Form.Control
      as="textarea"
      placeholder="Remarks"
      name="remarks"
      value={formik.values.remarks}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      style={{ height: '46px', paddingTop: '0'}}
    />
        {formik.touched.remarks && formik.errors.remarks ? (
                <div className="error" style={{color:'red'}}>{formik.errors.remarks}</div>
              ) : null}
          
  </Form.Group>
</Col>
<Col md={6}>
            <Form.Group className="mb-3" controlId="referenceId">
          
              <Form.Control
                type="text"
                placeholder="ReferenceId"
                name="referenceId"
                value={formik.values.referenceId}
                onChange={formik.handleChange}         
                onBlur={formik.handleBlur}
                style={{marginTop:'-10px'}}
              />
               {formik.touched.referenceId && formik.errors.referenceId ? (
                <div className="error" style={{color:'red'}}>{formik.errors.referenceId}</div>
              ) : null}
          
          
            </Form.Group>
            
            </Col>
           
           
            <Col md={6}>
            <Form.Group className="mb-3" controlId="enqDescp">       
              <Form.Control
                as="textarea"
                placeholder="Description"
                name="enqDescp"
                value={formik.values.enqDescp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ height: '46px', paddingTop: '0' }}
              />
                {formik.touched.enqDescp && formik.errors.enqDescp ? (
                <div className="error" style={{color:'red'}}>{formik.errors.enqDescp}</div>
              ) : null}
          
            </Form.Group>
            </Col>
          
            
          
            </Row>
    </div>

    <div className={`${toggle === 2 ? 'content active-content' :'content'}`}>
    <Row>
              
              <Col md={6}>
              <Form.Group className="mb-3" controlId="email">
              
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                <div className="error" style={{color:'red'}}>{formik.errors.email}</div>
              ) : null}
            
              </Form.Group>
               </Col>
               <Col md={6}>
              <Form.Group className="mb-3" controlId="mobile">
                <Form.Control
                  type="text"
                  placeholder="Mobile"
                  name="mobile"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
               {formik.touched.mobile && formik.errors.mobile ? (
                <div className="error" style={{color:'red'}}>{formik.errors.mobile}</div>
              ) : null}
            
              </Form.Group>
  
              </Col>
             </Row>
         <Row>  
  <Col md={6}>
  
              <Form.Group className="mb-3" controlId="location">
             
                <Form.Control
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
               {formik.touched.location && formik.errors.location ? (
                <div className="error" style={{color:'red'}}>{formik.errors.location}</div>
              ) : null}
              </Form.Group>
              </Col>
  
              <Col md={6}>
              <Form.Group className="mb-3" controlId="district">
           
                <Form.Control
                  type="text"
                  placeholder="District"
                  name="district"
                  value={formik.values.district}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
        
                />
                {formik.touched.district && formik.errors.district ? (
                <div className="error" style={{color:'red'}}>{formik.errors.district}</div>
              ) : null}
            
              </Form.Group>
                </Col>
               
              </Row>
              <Row>
          
        
                <Col md={6}>
                <Form.Group className="mb-3" controlId="state">
                <Form.Control
                  type="text"
                  placeholder="State"
                  name="state"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
        
                />
              {formik.touched.state && formik.errors.state ? (
                <div className="error" style={{color:'red'}}>{formik.errors.state}</div>
              ) : null}
            
              </Form.Group>
           </Col>
           </Row>
    </div>

    <div className={`${toggle === 3 ? 'content active-content' :'content'}`}>
      <Row>
       <Col md={6}>
  {/* Enquiry Source Dropdown */}
  <Form.Group className="mb-3" controlId="enqSource">
   
    <Form.Control
      as="select"
      name="enqSource"
      value={formik.values.enqSource}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className={`form-select ${formik.touched.enqSource && formik.errors.enqSource ? 'is-invalid' : ''}`}
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
    {formik.touched.enqSource && formik.errors.enqSource ? (
                <div className="error" style={{color:'red'}}>{formik.errors.enqSource}</div>
              ) : null}
  </Form.Group>
</Col>

        <Col md={6}>
         
              {/* Enquiry Type Dropdown */}
              <Form.Group className="mb-3" controlId="enqType">
            
              <Form.Control
                as="select"
                name="enqType"
                value={formik.values.enqType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
               className={`form-select ${formik.touched.enqType && formik.errors.enqType ? 'is-invalid' : ''}`}
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
              {formik.touched.enqType && formik.errors.enqType ? (
                <div className="error" style={{color:'red'}}>{formik.errors.enqType}</div>
              ) : null}
            </Form.Group>
</Col>
</Row>
<Row>
<Col md={6}>
               {/* Enquiry Mode Dropdown */}
                 <Form.Group className="mb-3" controlId="enqMode">
             
              <Form.Control
                as="select"
                name="enqMode"
                value={formik.values.enqMode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-select ${formik.touched.enqMode && formik.errors.enqMode ? 'is-invalid' : ''}`}
       
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
              {formik.touched.enqMode && formik.errors.enqMode ? (
                <div className="error" style={{color:'red'}}>{formik.errors.enqMode}</div>
              ) : null}
    </Form.Group>
    </Col>
      
                <Col md={6}>
          {/* Enquiry To Dropdown */}
             <Form.Group className="mb-3" controlId="enqTo">
              <Form.Control
                as="select"
                name="enqTo"
                value={formik.values.enqTo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-select ${formik.touched.enqTo && formik.errors.enqTo ? 'is-invalid' : ''}`}
       
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
              {formik.touched.enqTo && formik.errors.enqTo ? (
                <div className="error" style={{color:'red'}}>{formik.errors.enqTo}</div>
              ) : null}
            </Form.Group>
            </Col>

               
</Row>
<Row> 
             <Col md={6}>
          {/* Support Type Dropdown */}
         <Form.Group className="mb-3" controlId="supportType">
           
              <Form.Control
                as="select"
                name="supportType"
                value={formik.values.supportType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-select ${formik.touched.supportType && formik.errors.supportType ? 'is-invalid' : ''}`}
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
              {formik.touched.supportType && formik.errors.supportType ? (
                <div className="error" style={{color:'red'}}>{formik.errors.supportType}</div>
              ) : null}
            </Form.Group>
            </Col>
        
    </Row>
    </div>

</div>
    </div>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ background: 'none', color: '#5bb6ea', border: '1px solid #5bb6ea' }} onClick={handleClose}>
            Close
          </Button>
          <Button style={{ background: '#5bb6ea', border: 'none', fontWeight: '600' }} 
          onClick={formik.submitForm}    disabled={currentTab !== 3} >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default AddModal


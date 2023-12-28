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


function AddModal({getDatas}) {


  const [show, setShow] = React.useState(false);

  const [supportType, setSupportType] = useState([]);
  const [supportTo,setSupportTo] =useState([]);


  useEffect(()=>{
  fetchSupportType();
  fetchSupportTo();
  },[])
  

  const handleClose = () => {
    setShow(false);
    formik.resetForm(); 
  };
  const handleShow = () => setShow(true);
  
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
      });;
      setSupportType(filteredSupportType);
      console.log(filteredSupportType);
    } catch (error) {
      console.error(error);
    }
  };
  
    const fetchSupportTo = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        const filteredUser = response.data.users
      .filter(to => !to.isDeleted)
      .sort((a, b) => {
        const nameA = a.fname.toUpperCase();
        const nameB = b.fname.toUpperCase();
        if (nameA < nameB) return -1; // Sort in alphabetical ascending order
        if (nameA > nameB) return 1;
        return 0;
      });
        setSupportTo(filteredUser);
        console.log(filteredUser);
      } catch (error) {
        console.error(error);
      }
    };
  

  // Validation schema using Yup
  const validationSchema = Yup.object({
    supportFrom: Yup.string().required('supportFrom is required'),
    supportTo: Yup.string().required('supportTo is required'),
    supportType: Yup.string().required('supportType is required'),
    remarks:Yup.string().required('remarks is required'),
  });

  const formik = useFormik({
    initialValues: {
      supportFrom: 'admin',
      supportTo: '',
      supportType:'',
      status: 'new',
      remarks:'',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
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

        
        const response = await axios.post('http://localhost:3000/support', values);
        console.log('Response:', response.data);
        getDatas();
        toast.success('Data Added successfully!', { autoClose: 1500 });
    
        handleClose();
      } catch (error) {
        if (error.response) {
          console.log('Error Response:', error.response.data);
          console.log('Status Code:', error.response.status);
        } else if (error.request) {
          console.log('No response received from the server.');
        } else {
          console.log('Error:', error.message);
          toast.error('Error creating data Please try again.', { autoClose: 1500 });
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

      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"  backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '18px' }}>Which type of support do you need ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={formik.handleSubmit}>
                 
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
                {supportType.map(type => (
                  <option key={type._id} value={type._id}>
                     {type.name}
                  </option>
                ))}
              </Form.Control>
              {formik.touched.supportType && formik.errors.supportType ? (
                <div className="error" style={{color:'red'}}>{formik.errors.supportType}</div>
              ) : null}
            </Form.Group>

            
          {/* Support Type Dropdown */}
         <Form.Group className="mb-3" controlId="supportTo">
           
           <Form.Control
             as="select"
             name="supportTo"
             value={formik.values.supportTo}
             onChange={formik.handleChange}
             onBlur={formik.handleBlur}
             className={`form-select ${formik.touched.supportTo && formik.errors.supportTo ? 'is-invalid' : ''}`}
               >
             <option value="" disabled>
               Support To
             </option>
             {supportTo.map(to => (
               <option key={to._id} value={to._id}>
                  {`${to.fname} ${to.lname}`}
               </option>
             ))}
           </Form.Control>
           {formik.touched.supportTo && formik.errors.supportTo ? (
             <div className="error" style={{color:'red'}}>{formik.errors.supportTo}</div>
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

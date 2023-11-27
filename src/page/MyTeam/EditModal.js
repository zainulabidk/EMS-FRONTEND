// EditModal.js
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useFormik } from 'formik';
import { Container, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import '../style/edit.css';


function EditModal({ showModal, handleClose, selectedDatas, handleUpdate }) {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/userroles');
        setData(response.data.userRole);
        console.log(response.data.userRole);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Formik form configuration
  const formik = useFormik({
    initialValues: {
      fname: selectedDatas?.fname || '',
      lname: selectedDatas?.lname || '',
      email: selectedDatas?.email || '',
      password: selectedDatas?.password || '',
      confirmPassword: selectedDatas?.confirmPassword || '',
      mobile: selectedDatas?.mobile || '',
      userRoles: selectedDatas?.userRoles || '',
    },
    validationSchema: Yup.object({
      fname: Yup.string().required('First name is required'),
      lname: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      password: Yup.string().required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
      mobile: Yup.string().required('Mobile is required'),
      userRoles: Yup.string().required('User roles are required'),
    }),
    onSubmit: (values) => {
      handleUpdate(selectedDatas?._id, values);
      handleClose();
    },
  });

  const handleModalHide = () => {
    formik.resetForm();
    handleClose();
  };

  useEffect(() => {
    console.log("selectedDatas:", selectedDatas);
    formik.setValues({
      fname: selectedDatas?.fname || '',
      lname: selectedDatas?.lname || '',
      email: selectedDatas?.email || '',
      mobile: selectedDatas?.mobile || '',
      password: selectedDatas?.password || '',
      confirmPassword: selectedDatas?.confirmPassword || '',
      userRoles: selectedDatas?.userRoles || '',
      
    });
  }, [selectedDatas]);
  

  // Render the modal only when data is available
  return (
    <Modal show={showModal} onHide={handleModalHide} centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Edit My Team</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Container>
        {data.length > 0 ? (
            <Form onSubmit={formik.handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3 " controlId="fname">
                  <Form.Label style={{fontSize:'14px'}}>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fname"
                      placeholder=" "
                      value={formik.values.fname}
                      onChange={formik.handleChange}
                      onBlur={() => formik.setFieldTouched('fname', true)}
                      onFocus={() => formik.setFieldTouched('fname', false)} // Reset touch state on focus
                    />
                   
              
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3 " controlId="lname">
                  <Form.Label style={{fontSize:'14px'}}>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lname"
                      placeholder=" "
                      value={formik.values.lname}
                      onChange={formik.handleChange}
                      onBlur={() => formik.setFieldTouched('lname', true)}
                      onFocus={() => formik.setFieldTouched('lname', false)} // Reset touch state on focus
                    />
                    
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3 " controlId="email">
                  <Form.Label style={{fontSize:'14px'}}>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder=" "
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={() => formik.setFieldTouched('email', true)}
                      onFocus={() => formik.setFieldTouched('email', false)} // Reset touch state on focus
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3 " controlId="mobile">
                  <Form.Label style={{fontSize:'14px'}}>Mobile</Form.Label>
                    <Form.Control
                      type="text"
                      name="mobile"
                      placeholder=" "
                      value={formik.values.mobile}
                      onChange={formik.handleChange}
                      onBlur={() => formik.setFieldTouched('mobile', true)}
                      onFocus={() => formik.setFieldTouched('mobile', false)} // Reset touch state on focus
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
  <Form.Group className="mb-3" style={{position:'relative'}} controlId="password">
  <Form.Label style={{fontSize:'14px'}}>Password</Form.Label>
      <Form.Control
        type={showPassword ? 'text' : 'password'}
        name="password"
        placeholder=''
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={() => formik.setFieldTouched('password', true)}
        onFocus={() => formik.setFieldTouched('password', false)}
      />
      
      <div className="input-group-append">
        <div className="password-toggle-icon input-group-text" onClick={togglePasswordVisibility}>
          {showPassword ? <BsEyeSlash /> : <BsEye />}
        </div>
      </div>
  </Form.Group>
</Col>

                <Col md={6}>
                  <Form.Group  className="mb-3 " controlId="confirmPassword">
                  <Form.Label style={{fontSize:'14px'}}>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder=" "
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={() => formik.setFieldTouched('confirmPassword', true)}
                      onFocus={() => formik.setFieldTouched('confirmPassword', false)} 
                    />
                    
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                      <div className="error" >
                        {formik.errors.confirmPassword}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>


                <Col md={6}>
                  <Form.Group  className="mb-3 input-box" controlId="userRoles">
                    <Form.Select className='input-controll'
                      name="userRoles"
                      value={formik.values.userRoles}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                       <Form.Label className='label' style={{ fontSize: '14px' }}>User Roles</Form.Label>
                      <option value="" label="Select a role" style={{color:'black'}} />
                      {data.map(item => (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
        ) : (
          <p>Loading user roles...</p>
        )}
        </Container>
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

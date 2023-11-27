import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col } from 'react-bootstrap';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import '../style/addmodel.css';
import { useState, useEffect } from 'react';

function App() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const apiUrl = 'http://localhost:3000/userroles';

    axios.get(apiUrl)
      .then(response => {
        setData(response.data.userRole);
        console.log(response.data.userRole);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };

  const handleShow = () => setShow(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = Yup.object({
    fname: Yup.string().required('First name is required'),
    lname: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    mobile: Yup.string().required('Mobile is required'),
    userType: Yup.string().required('User roles are required'), // Change from userRoles to userType
  });

  const formik = useFormik({
    initialValues: {
      fname: '',
      lname: '',
      email: '',
      password: '',
      confirmPassword: '',
      mobile: '',
      userType: 'licensee', // Change from userRoles to userType
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await validationSchema.validate(values, { abortEarly: false });

        const response = await axios.post('http://localhost:3000/users', values);
        console.log('Response:', response.data.user);
        alert('Successfully added');

        handleClose();
        window.location.reload();
      } catch (error) {
        if (error.response) {
          console.log('Error Response:', error.response.data);
          console.log('Status Code:', error.response.status);
        } else if (error.request) {
          console.log('No response received from the server.');
        } else {
          console.log('Error:', error.message);
        }
      }
    },
  });

  return (
    <>
      <Button style={{ background: '#5bb6ea', border: 'none', color: 'white', fontWeight: '600' }} onClick={handleShow}>
        + New
      </Button>

      <Modal className='modal-box' show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered  backdrop="static"  keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '18px' }}>Add Licensee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={formik.handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="fname">
                    <Form.Label style={{ fontSize: '14px' }}>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fname"
                      value={formik.values.fname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.fname && formik.errors.fname ? (
                      <div className="error" style={{ color: 'red' }}>
                        {formik.errors.fname}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="lname">
                    <Form.Label style={{ fontSize: '14px' }}>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lname"
                      value={formik.values.lname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.lname && formik.errors.lname ? (
                      <div className="error" style={{ color: 'red' }}>
                        {formik.errors.lname}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label style={{ fontSize: '14px' }}>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="error" style={{ color: 'red' }}>
                        {formik.errors.email}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="mobile">
                    <Form.Label style={{ fontSize: '14px' }}>Mobile</Form.Label>
                    <Form.Control
                      type="text"
                      name="mobile"
                      value={formik.values.mobile}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.mobile && formik.errors.mobile ? (
                      <div className="error" style={{ color: 'red' }}>
                        {formik.errors.mobile}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                       <Col md={6}>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label style={{ fontSize: '14px' }}>Password</Form.Label>
                    <div className="password-input-container input-group">
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-control"
                      />
                      <div className="input-group-append">
                        <div className="password-toggle-icon input-group-text" onClick={togglePasswordVisibility}>
                          {showPassword ? <BsEyeSlash /> : <BsEye />}
                        </div>
                      </div>
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                      <div className="error" style={{ color: 'red' }}>
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label style={{ fontSize: '14px' }}>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                      <div className="error" style={{ color: 'red' }}>
                        {formik.errors.confirmPassword}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={6}>
                <Form.Group className="mb-3" controlId="userType">
                    <Form.Label style={{ fontSize: '14px' }}>User Type</Form.Label>
                    <Form.Select
                      name="userType"
                      value={formik.values.userType}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled
                    >
                      <option value="" label="Licensee" style={{ color: 'black' }} />
                      {data.map(item => (
                        <option key={item.id} value={item.userType}>
                          {item.userType}
                        </option>
                      ))}
                    </Form.Select>
                    {formik.touched.userType && formik.errors.userType ? (
                      <div className="error" style={{ color: 'red' }}>
                        {formik.errors.userType}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>
            </Form>
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
    </>
  );
}

export default App;
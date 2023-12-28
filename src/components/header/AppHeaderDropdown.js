/*import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilBell} className="me-2" />
          Updates
          <CBadge color="info" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Messages
          <CBadge color="success" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Tasks
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCreditCard} className="me-2" />
          Payments
          <CBadge color="secondary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Projects
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="#">
          <CIcon icon={cilLockLocked} className="me-2" />
          Lock Account
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
*/
/*
import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import OrgProfile from './OrgProfile';


const AppHeaderDropdown = ({handleShow}) => {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
       <OrgProfile>
       <CDropdownItem onClick={handleShow}>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
       </OrgProfile>
     
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
      
        <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Reset Password
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="#">
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown

*/
/*........................................................
import React, { useState } from 'react';
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CButton,
} from '@coreui/react';
import { cilLockLocked, cilSettings, cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
 

const AppHeaderDropdown = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Name:', name);
    console.log('Address:', address);
    console.log('Image:', image);

 
    handleCloseModal();
  };

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={cilUser} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem href="#" onClick={handleShowModal}>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Reset Password
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilLockLocked} className="me-2" />
          Log Out
        </CDropdownItem>
        <CDropdownDivider />
      </CDropdownMenu>

      {/* Modal *
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>My Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="image">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>

            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={handleNameChange}
              />
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={handleAddressChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </CDropdown>
  );
};

export default AppHeaderDropdown;

...............................*/

import React, { useState,useEffect } from 'react';
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CButton,
} from '@coreui/react';
import { cilLockLocked, cilSettings, cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import * as Yup from 'yup';
import 'src/page/style/addmodel.css';

const AppHeaderDropdown = () => {
  const [showModal, setShowModal] = useState(false);
  const [document, setDocument] = useState('');
  const [logo, setLogo] = useState(null);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [userId,setUserId] = useState(null)
  const [orgType,setOrgType] = useState([])
  const [orgCatg,setOrgCtg] = useState([])

  useEffect(()=>{
    fetchOrgType();
    fetchOrgCtg();

  },[])

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
    formik.resetForm();
  };

  const fetchUser = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      const userData = response.data.users; 
      setUserId(userData)
      console.log('Fetched user:', userData); 
    
    } catch (error) {
      console.error(error);
    }
  };

    const fetchOrgType = async () => {
      try {
        const response = await axios.get('http://localhost:3000/orgType');
        const filteredOrgType = response.data.orgType.filter(type => !type.isDeleted);
        setOrgType(filteredOrgType);
        console.log(filteredOrgType);
      } catch (error) {
        console.error(error);
      }
    };


    const fetchOrgCtg = async () => {
        try {
          const response = await axios.get('http://localhost:3000/orgCategory');
          const filteredOrgCtg = response.data.orgCategory.filter(catg => !catg.isDeleted);
          setOrgCtg(filteredOrgCtg);
          console.log(filteredOrgCtg);
        } catch (error) {
          console.error(error);
        }
      };

      const validationSchema = Yup.object({
        userId: Yup.string().required('User ID is required'),
        orgName: Yup.string().required('Org name is required'),
        orgType: Yup.string().required('Org type is required'),
        orgCategory: Yup.string().required('Org category is required'),
        orgLicense: Yup.string().required('Org license is required'),
        street: Yup.string().required('street is required'),
        city: Yup.string().required('city is required'),
        state: Yup.string().required('state is required'),
        postalCode: Yup.string().required('postalcode is required'),
        country: Yup.string().required('country is required'),
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'), 
        mobile: Yup.string().required('Mobile is required'),
        logo: Yup.mixed().required('Logo is required'),
        document: Yup.mixed().required('Document is required'),
        ownership: Yup.string().required('ownership is required'), 
    
      });
    
      const formik = useFormik({
        initialValues: {
            userId: '',
            orgName: '',
            orgType: '',
            orgCategory: '',
            orgLicense: '',
            street: '',
            city: '',
            state: '',
            postalCode: '',
            country: '',
            name: '',
            ownership: '',
          email: '',
          mobile: '',
          logo: null,
          document: null,
          status: 'new',
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'admin',
          updatedBy: 'admin',
          isDeleted: false,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {

          try {

            const fetchedUser = await fetchUser(values.userId);

            // Check if the user was successfully fetched
            if (!fetchedUser) {
              // Handle the case where the user couldn't be fetched
              console.error('User not found');
              return;
            }

            await validationSchema.validate(values, { abortEarly: false });
    
    
            const formData = new FormData();
            formData.append('userId', fetchedUser._id);
            formData.append('orgName', values.orgName);
            formData.append('orgType', values.orgType);
            formData.append('orgCategory', values.orgCategory);
            formData.append('orgLicense', values.orgLicense);
            formData.append('street', values.street);
            formData.append('city', values.city);
            formData.append('state', values.state);
            formData.append('postalcode', values.postalCode);
            formData.append('country', values.country);
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('mobile', values.mobile);
            formData.append('ownership', values.ownership);
            formData.append('logo', values.logo);
            formData.append('document', values.document);
            
            const updateResponse = await updateUserProfile(formData);


            if (updateResponse.success) {
              console.log('User profile updated successfully');
            } else {
              // Handle the case where the update was not successful
              console.error('Failed to update user profile:', updateResponse.message);
            }
    
            setShowModal(false);

            formik.resetForm();
          } catch (error) {
            // Handle any errors that occur during form submission
            console.error('Form submission error:', error);
      
            // You can display an error message or handle errors in any other way
          }
        },
      });

      const updateUserProfile = async (formData) => {
        try {
          // Send a request to your server to update the user profile with FormData
          const response = await axios.post('http://localhost:3000/orgProfile', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      
          return response.data.orgProfile; 
       
          toast.success('Data Added successfully!');

          handleCloseModal();

        } catch (error) {
          console.error('Error updating user profile:', error);
          return { success: false, message: 'An error occurred while updating user profile' };
        }
      };
     
  
    const handleFileChange = (event) => {
        const fieldName = event.target.name;
        const file = event.target.files[0];
        formik.setFieldValue(fieldName, file);
      };


  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={cilUser} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem href="#" onClick={handleShowModal}>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Reset Password
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilLockLocked} className="me-2" />
          Log Out
        </CDropdownItem>
        <CDropdownDivider />
      </CDropdownMenu>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Org Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Container>
        <Form onSubmit={formik.handleSubmit}>
            <Row>
            <Col md={4}>
                  <Form.Group className="mb-3" controlId="userId">
                    <Form.Label style={{ fontSize: '14px' }}>UserId</Form.Label>
                    <Form.Select
                      name="userId"
                      value={formik.values.userId}
                      onChange={(e) => {
                        formik.handleChange(e);
                        fetchUser(e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                    >
                         <option value="" disabled>
                        Select User
                      </option>
                      {userId ? (
                        <option key={userId._id}  value={userId._id}>{`${userId.fname} ${userId.lname}`}</option>
                      ) : null}
                    </Form.Select>
                    {formik.touched.userId && formik.errors.userId ? (
                      <div className="error" style={{ color: 'red' }}>
                        {formik.errors.userId}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="orgName">
                    <Form.Label style={{ fontSize: '14px' }}>Org Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="orgName"
                      value={formik.values.orgName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.orgName && formik.errors.orgName ? (
                      <div className="error" style={{ color: 'red' }}>
                        {formik.errors.orgName}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="orgType">
                    <Form.Label style={{ fontSize: '14px' }}>Org Type</Form.Label>
                    <Form.Select
                      name="orgType"
                      value={formik.values.orgType}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                       <option value="" disabled>
                        Org Type
                       </option>
                      {orgType.map(type => (
                        <option key={type._id} value={type._id}>
                          {type.name}
                        </option>
                      ))}
                    </Form.Select>
                    {formik.touched.orgType && formik.errors.orgType ? (
                      <div className="error" style={{ color: 'red' }}>
                        {formik.errors.orgType}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
                </Row>
                <Row>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="orgCategory">
                    <Form.Label style={{ fontSize: '14px' }}>Org Category</Form.Label>
                    <Form.Select
                      name="orgCategory"
                      value={formik.values.orgCategory}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                        <option value="" disabled>
                        Org Category
                       </option>
                      {orgCatg.map(catg => (
                        <option key={catg._id} value={catg._id}>
                          {catg.name}
                        </option>
                      ))}
                    </Form.Select>
                    {formik.touched.orgCategory && formik.errors.orgCategory ? (
                      <div className="error" style={{ color: 'red' }}>
                        {formik.errors.orgCategory}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="orgLicense">
                    <Form.Label style={{ fontSize: '14px' }}>Org License</Form.Label>
                    <Form.Control
                      type="text"
                      name="orgLicense"
                      value={formik.values.orgLicense}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.orgLicense && formik.errors.orgLicense ? (
                      <div className="error" style={{ color: 'red' }}>
                        {formik.errors.orgLicense}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="street">
                    <Form.Label style={{ fontSize: '14px' }}>Street</Form.Label>
                    <Form.Control
                      type="text"
                      name="street"
                      value={formik.values.street}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.street && formik.errors.street ? (
                      <div className="error" style={{ color: 'red' }}>
                        {formik.errors.street}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
                </Row>
                <Row>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="city">
                    <Form.Label style={{ fontSize: '14px' }}>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.city && formik.errors.city ? (
                      <div className="error" style={{ color: 'red' }}>
                        {formik.errors.city}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="state">
                    <Form.Label style={{ fontSize: '14px' }}>State</Form.Label>
                    <Form.Control
                      type="text"
                      name="state"
                      value={formik.values.state}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.state && formik.errors.state ? (
                      <div className="error" style={{ color: 'red' }}>
                        {formik.errors.state}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="postalCode">
                    <Form.Label style={{ fontSize: '14px' }}>Postal Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="postalCode"
                      value={formik.values.postalCode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.postalCode && formik.errors.postalCode ? (
                      <div className="error" style={{ color: 'red' }}>
                        {formik.errors.postalCode}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
                </Row>
                <Row>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="country">
                    <Form.Label style={{ fontSize: '14px' }}>Country</Form.Label>
                    <Form.Control
                      type="text"
                      name="country"
                      value={formik.values.country}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.country && formik.errors.country ? (
                      <div className="error" style={{ color: 'red' }}>
                        {formik.errors.country}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label style={{ fontSize: '14px' }}>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="error" style={{ color: 'red' }}>
                        {formik.errors.name}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              
                <Col md={4}>
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
</Row>
<Row>
                <Col md={4}>
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
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="logo">
                    <Form.Label style={{ fontSize: '14px' }}>Logo</Form.Label>
                    <Form.Control
                      type="file"
                      name="logo"
                      accept="image/*"
                      onChange={handleFileChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.logo && formik.errors.logo ? (
                      <div className="error" style={{ color: 'red' }}>
                        {formik.errors.logo}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="document">
                    <Form.Label style={{ fontSize: '14px' }}>Document</Form.Label>
                    <Form.Control
                      type="file"
                      name="document"
                      accept=".pdf"
                      onChange={handleFileChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.document && formik.errors.document ? (
                      <div className="error" style={{ color: 'red' }}>
                        {formik.errors.document}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="ownership">
                    <Form.Label style={{ fontSize: '14px' }}>Ownership</Form.Label>
                    <Form.Control
                      type="text"
                      name="ownership"
                      value={formik.values.ownership}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.ownership && formik.errors.ownership ? (
                      <div className="error" style={{ color: 'red' }}>
                        {formik.errors.ownership}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

              </Row>
            </Form>
          </Container>

        </Modal.Body>

        <Modal.Footer>
        <Button style={{ background: 'none', color: '#5bb6ea', border: '1px solid #5bb6ea' }} onClick={handleCloseModal}>
            Close
          </Button>
          <Button style={{ background: '#5bb6ea', border: 'none', fontWeight: '600' }} onClick={formik.submitForm}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </CDropdown>
  );
};

export default AppHeaderDropdown;


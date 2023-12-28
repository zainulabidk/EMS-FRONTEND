// import React from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
// import axios from 'axios';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { Container, Row, Col } from 'react-bootstrap';
// import { BsEye, BsEyeSlash } from 'react-icons/bs';
// import 'src/page/style/addmodel.css';
// import { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AppHeaderDropdown from './AppHeaderDropdown';


// function AddModal() {
//   const [show, setShow] = useState(false);
//   const [data, setData] = useState([]);
//   const [userId,setUserId] = useState([])
//   const [orgType,setOrgType] = useState([])
//   const [orgCatg,setOrgCtg] = useState([])

//   useEffect(()=>{

//     fetchUser();
//     fetchOrgType();
//     fetchOrgCtg();

//   },[])


//   const handleClose = () => {
//     setShow(false);
//     formik.resetForm();
//   };

//   const handleShow = () => setShow(true);

//   const fetchUser = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/users');
//       const filteredUser = response.data.users.filter(user => !user.isDeleted);
//       setUserId(filteredUser);
//       console.log(filteredUser);
//     } catch (error) {
//       console.error(error);
//     }
//   };

  
//     const fetchOrgType = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/orgType');
//         const filteredOrgType = response.data.orgType.filter(type => !type.isDeleted);
//         setOrgType(filteredOrgType);
//         console.log(filteredOrgType);
//       } catch (error) {
//         console.error(error);
//       }
//     };


//     const fetchOrgCtg = async () => {
//         try {
//           const response = await axios.get('http://localhost:3000/orgCategory');
//           const filteredOrgCtg = response.data.orgCategory.filter(catg => !catg.isDeleted);
//           setOrgCtg(filteredOrgCtg);
//           console.log(filteredOrgCtg);
//         } catch (error) {
//           console.error(error);
//         }
//       };
    

//   const validationSchema = Yup.object({
//     userId: Yup.string().required('User ID is required'),
//     orgName: Yup.string().required('Org name is required'),
//     orgType: Yup.string().required('Org type is required'),
//     orgCategory: Yup.string().required('Org category is required'),
//     orgLicense: Yup.string().required('Org license is required'),
//     street: Yup.string().required('street is required'),
//     city: Yup.string().required('city is required'),
//     state: Yup.string().required('state is required'),
//     postalCode: Yup.string().required('postalcode is required'),
//     country: Yup.string().required('country is required'),
//     name: Yup.string().required('Name is required'),
//     email: Yup.string().email('Invalid email format').required('Email is required'), 
//     mobile: Yup.string().required('Mobile is required'),
//     logo: Yup.mixed().required('Logo is required'),
//     document: Yup.mixed().required('Document is required'),
//     ownership: Yup.string().required('ownership is required'), 

//   });

//   const formik = useFormik({
//     initialValues: {
//         userId: '',
//         orgName: '',
//         orgType: '',
//         orgCategory: '',
//         orgLicense: '',
//         street: '',
//         city: '',
//         state: '',
//         postalCode: '',
//         country: '',
//         name: '',
//         ownership: '',
//       email: '',
//       mobile: '',
//       logo: null,
//       document: null,
//       status: 'new',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       createdBy: 'admin',
//       updatedBy: 'admin',
//       isDeleted: false,
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values) => {
//       try {
//         await validationSchema.validate(values, { abortEarly: false });


//         const formData = new FormData();
//         formData.append('userId', values.userId);
//         formData.append('orgName', values.orgName);
//         formData.append('orgType', values.orgType);
//         formData.append('orgCategory', values.orgCategory);
//         formData.append('orgLicense', values.orgLicense);
//         formData.append('street', values.street);
//         formData.append('city', values.city);
//         formData.append('state', values.state);
//         formData.append('postalcode', values.postalCode);
//         formData.append('country', values.country);
//         formData.append('name', values.name);
//         formData.append('email', values.email);
//         formData.append('mobile', values.mobile);
//         formData.append('ownership', values.ownership);
//         formData.append('logo', values.logo);
//         formData.append('document', values.document);


//         const response = await axios.post('http://localhost:3000/orgProfile', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });

//         console.log('Response:', response.data.orgProfile);
//        // getDatas();
//         toast.success('Data Added successfully!');
    
//         handleClose();
//       } catch (error) {
//         if (error.response) {
//           console.log('Error Response:', error.response.data);
//           console.log('Status Code:', error.response.status);
//         } else if (error.request) {
//           console.log('No response received from the server.');
//         } else {
//           console.log('Error:', error.message);
//         }
//       }
//     },
//   });


//   const handleFileChange = (event) => {
//     const fieldName = event.target.name;
//     const file = event.target.files[0];
//     formik.setFieldValue(fieldName, file);
//   };

//   return (
//     <>

//     <ToastContainer/>
//      {/*} <Button style={{ background: '#5bb6ea', border: 'none', color: 'white', fontWeight: '600' }} onClick={handleShow}>
//         + New
//   </Button> */}

//   <AppHeaderDropdown handleShow={handleShow} />

//       <Modal className='modal-box' show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered  backdrop="static"  keyboard={false}>
//         <Modal.Header closeButton>
//           <Modal.Title style={{ fontSize: '18px' }}>Update Org Profile</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Container>
//             <Form onSubmit={formik.handleSubmit}>
//             <Row>
//             <Col md={4}>
//                   <Form.Group className="mb-3" controlId="userId">
//                     <Form.Label style={{ fontSize: '14px' }}>UserId</Form.Label>
//                     <Form.Select
//                       name="userId"
//                       value={formik.values.userId}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                     >
//                       {userId.map(user => (
//                         <option key={user.id} value={user.value}>
//                           {user.label}
//                         </option>
//                       ))}
//                     </Form.Select>
//                     {formik.touched.userId && formik.errors.userId ? (
//                       <div className="error" style={{ color: 'red' }}>
//                         {formik.errors.userId}
//                       </div>
//                     ) : null}
//                   </Form.Group>
//                 </Col>
//                 <Col md={4}>
//                   <Form.Group className="mb-3" controlId="orgName">
//                     <Form.Label style={{ fontSize: '14px' }}>Org Name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="orgName"
//                       value={formik.values.orgName}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                     />
//                     {formik.touched.orgName && formik.errors.orgName ? (
//                       <div className="error" style={{ color: 'red' }}>
//                         {formik.errors.orgName}
//                       </div>
//                     ) : null}
//                   </Form.Group>
//                 </Col>
//                 <Col md={4}>
//                   <Form.Group className="mb-3" controlId="orgType">
//                     <Form.Label style={{ fontSize: '14px' }}>Org Type</Form.Label>
//                     <Form.Select
//                       name="orgType"
//                       value={formik.values.orgType}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                     >
//                       {orgType.map(type => (
//                         <option key={type.id} value={type.value}>
//                           {type.label}
//                         </option>
//                       ))}
//                     </Form.Select>
//                     {formik.touched.orgType && formik.errors.orgType ? (
//                       <div className="error" style={{ color: 'red' }}>
//                         {formik.errors.orgType}
//                       </div>
//                     ) : null}
//                   </Form.Group>
//                 </Col>
//                 </Row>
//                 <Row>
//                 <Col md={4}>
//                   <Form.Group className="mb-3" controlId="orgCategory">
//                     <Form.Label style={{ fontSize: '14px' }}>Org Category</Form.Label>
//                     <Form.Select
//                       name="orgCategory"
//                       value={formik.values.orgCategory}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                     >
//                       {orgCatg.map(catg => (
//                         <option key={catg.id} value={catg.value}>
//                           {catg.label}
//                         </option>
//                       ))}
//                     </Form.Select>
//                     {formik.touched.orgCategory && formik.errors.orgCategory ? (
//                       <div className="error" style={{ color: 'red' }}>
//                         {formik.errors.orgCategory}
//                       </div>
//                     ) : null}
//                   </Form.Group>
//                 </Col>
//                 <Col md={4}>
//                   <Form.Group className="mb-3" controlId="orgLicense">
//                     <Form.Label style={{ fontSize: '14px' }}>Org License</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="orgLicense"
//                       value={formik.values.orgLicense}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                     />
//                     {formik.touched.orgLicense && formik.errors.orgLicense ? (
//                       <div className="error" style={{ color: 'red' }}>
//                         {formik.errors.orgLicense}
//                       </div>
//                     ) : null}
//                   </Form.Group>
//                 </Col>
//                 <Col md={4}>
//                   <Form.Group className="mb-3" controlId="street">
//                     <Form.Label style={{ fontSize: '14px' }}>Street</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="street"
//                       value={formik.values.street}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                     />
//                     {formik.touched.street && formik.errors.street ? (
//                       <div className="error" style={{ color: 'red' }}>
//                         {formik.errors.street}
//                       </div>
//                     ) : null}
//                   </Form.Group>
//                 </Col>
//                 </Row>
//                 <Row>
//                 <Col md={4}>
//                   <Form.Group className="mb-3" controlId="city">
//                     <Form.Label style={{ fontSize: '14px' }}>City</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="city"
//                       value={formik.values.city}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                     />
//                     {formik.touched.city && formik.errors.city ? (
//                       <div className="error" style={{ color: 'red' }}>
//                         {formik.errors.city}
//                       </div>
//                     ) : null}
//                   </Form.Group>
//                 </Col>
//                 <Col md={4}>
//                   <Form.Group className="mb-3" controlId="state">
//                     <Form.Label style={{ fontSize: '14px' }}>State</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="state"
//                       value={formik.values.state}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                     />
//                     {formik.touched.state && formik.errors.state ? (
//                       <div className="error" style={{ color: 'red' }}>
//                         {formik.errors.state}
//                       </div>
//                     ) : null}
//                   </Form.Group>
//                 </Col>
//                 <Col md={4}>
//                   <Form.Group className="mb-3" controlId="postalCode">
//                     <Form.Label style={{ fontSize: '14px' }}>Postal Code</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="postalCode"
//                       value={formik.values.postalCode}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                     />
//                     {formik.touched.postalCode && formik.errors.postalCode ? (
//                       <div className="error" style={{ color: 'red' }}>
//                         {formik.errors.postalCode}
//                       </div>
//                     ) : null}
//                   </Form.Group>
//                 </Col>
//                 </Row>
//                 <Row>
//                 <Col md={4}>
//                   <Form.Group className="mb-3" controlId="country">
//                     <Form.Label style={{ fontSize: '14px' }}>Country</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="country"
//                       value={formik.values.country}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                     />
//                     {formik.touched.country && formik.errors.country ? (
//                       <div className="error" style={{ color: 'red' }}>
//                         {formik.errors.country}
//                       </div>
//                     ) : null}
//                   </Form.Group>
//                 </Col>
//                 <Col md={4}>
//                   <Form.Group className="mb-3" controlId="name">
//                     <Form.Label style={{ fontSize: '14px' }}>Name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="name"
//                       value={formik.values.name}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                     />
//                     {formik.touched.name && formik.errors.name ? (
//                       <div className="error" style={{ color: 'red' }}>
//                         {formik.errors.name}
//                       </div>
//                     ) : null}
//                   </Form.Group>
//                 </Col>
              
//                 <Col md={4}>
//                   <Form.Group className="mb-3" controlId="email">
//                     <Form.Label style={{ fontSize: '14px' }}>Email</Form.Label>
//                     <Form.Control
//                       type="email"
//                       name="email"
//                       value={formik.values.email}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                     />
//                     {formik.touched.email && formik.errors.email ? (
//                       <div className="error" style={{ color: 'red' }}>
//                         {formik.errors.email}
//                       </div>
//                     ) : null}
//                   </Form.Group>
//                 </Col>
// </Row>
// <Row>
//                 <Col md={4}>
//                   <Form.Group className="mb-3" controlId="mobile">
//                     <Form.Label style={{ fontSize: '14px' }}>Mobile</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="mobile"
//                       value={formik.values.mobile}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                     />
//                     {formik.touched.mobile && formik.errors.mobile ? (
//                       <div className="error" style={{ color: 'red' }}>
//                         {formik.errors.mobile}
//                       </div>
//                     ) : null}
//                   </Form.Group>
//                 </Col>   
//                 <Col md={4}>
//                   <Form.Group className="mb-3" controlId="logo">
//                     <Form.Label style={{ fontSize: '14px' }}>Logo</Form.Label>
//                     <Form.Control
//                       type="file"
//                       name="logo"
//                       accept="image/*"
//                       onChange={handleFileChange}
//                       onBlur={formik.handleBlur}
//                     />
//                     {formik.touched.logo && formik.errors.logo ? (
//                       <div className="error" style={{ color: 'red' }}>
//                         {formik.errors.logo}
//                       </div>
//                     ) : null}
//                   </Form.Group>
//                 </Col>
//                 <Col md={4}>
//                   <Form.Group className="mb-3" controlId="document">
//                     <Form.Label style={{ fontSize: '14px' }}>Document</Form.Label>
//                     <Form.Control
//                       type="file"
//                       name="document"
//                       accept=".pdf"
//                       onChange={handleFileChange}
//                       onBlur={formik.handleBlur}
//                     />
//                     {formik.touched.document && formik.errors.document ? (
//                       <div className="error" style={{ color: 'red' }}>
//                         {formik.errors.document}
//                       </div>
//                     ) : null}
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col md={4}>
//                   <Form.Group className="mb-3" controlId="ownership">
//                     <Form.Label style={{ fontSize: '14px' }}>Ownership</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="ownership"
//                       value={formik.values.ownership}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                     />
//                     {formik.touched.ownership && formik.errors.ownership ? (
//                       <div className="error" style={{ color: 'red' }}>
//                         {formik.errors.ownership}
//                       </div>
//                     ) : null}
//                   </Form.Group>
//                 </Col>

//               </Row>
//             </Form>
//           </Container>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button style={{ background: 'none', color: '#5bb6ea', border: '1px solid #5bb6ea' }} onClick={handleClose}>
//             Close
//           </Button>
//           <Button style={{ background: '#5bb6ea', border: 'none', fontWeight: '600' }} onClick={formik.submitForm}>
//             Submit
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default AddModal;

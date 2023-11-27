
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container } from 'react-bootstrap';
import '../../style/addmodel.css';

// React component
function App() {
  const [show, setShow] = React.useState(false);

  // Function to close the modal and reset Formik state
  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };

  // Function to show the modal
  const handleShow = () => setShow(true);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    desc: Yup.string().required('Description is required'),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: {
      name: '',
      desc: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Validate the newItem object using Formik and Yup
        await validationSchema.validate(values, { abortEarly: false });

        // Your existing handleSubmit logic here
        // Use values instead of newItem
        const response = await axios.post('http://localhost:3000/enquirysource', values);
        console.log('Response:', response.data);
        alert('Successfully added');

        handleClose();

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
          // Handle other errors
        }
      }
    },
  });

  return (
    <>
      {/* Button to trigger the modal */}
      <Button style={{ background: '#5bb6ea', border: 'none', color: 'white', fontWeight: '600' }} onClick={handleShow}>
        + New
      </Button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '18px' }}>Add Enquiry Source</Modal.Title>
        </Modal.Header>
        <Container>
          <Modal.Body>
            {/* Form inside the modal */}
            <Form onSubmit={formik.handleSubmit}>
              {/* Form Group for Name */}
              <Form.Group className="mb-3 floating-label-group" controlId="name" style={{ height: '80px' }}>
                <Form.Control
                  type="text"
                  placeholder=" "
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={() => formik.setFieldTouched('name', true)}
                  onFocus={() => formik.setFieldTouched('name', false)} 
                  className={formik.touched.name && formik.errors.name ? 'error-border' : ''}
                />
                <Form.Label
                  className={(formik.touched.name || formik.values.name) ? 'floating' : ''}
                  style={{ color: formik.touched.name && formik.errors.name ? 'red' : '#5bb6ea' }}
                >
                  Name
                </Form.Label>
                {formik.touched.name && formik.errors.name ? (
                  <div className="error" style={{ color: 'red' }}>{formik.errors.name}</div>
                ) : null}
              </Form.Group>

              {/* Form Group for Description */}
              <Form.Group className="mb-3 floating-label-group" controlId="desc" style={{ height: '80px' }}>
                <Form.Control
                  type="text"
                  placeholder=" "
                  name="desc"
                  value={formik.values.desc}
                  onChange={formik.handleChange}
                  onBlur={() => formik.setFieldTouched('desc', true)}
                  onFocus={() => formik.setFieldTouched('desc', false)} // Reset touch state on focus
                  className={formik.touched.desc && formik.errors.desc ? 'error-border' : ''}
                />
                <Form.Label
                  className={(formik.touched.desc || formik.values.desc) ? 'floating' : ''}
                  style={{ color: formik.touched.desc && formik.errors.desc ? 'red' : '#5bb6ea' }}
                >
                  Description
                </Form.Label>
                {formik.touched.desc && formik.errors.desc ? (
                  <div className="error" style={{ color: 'red' }}>{formik.errors.desc}</div>
                ) : null}
              </Form.Group>
            </Form>
          </Modal.Body>
        </Container>
        <Modal.Footer>
          {/* Close button */}
          <Button style={{ background: 'none', color: '#5bb6ea', border: '1px solid #5bb6ea' }} onClick={handleClose}>
            Close
          </Button>
          {/* Submit button */}
          <Button style={{ background: '#5bb6ea', border: 'none', fontWeight: '600' }} onClick={formik.submitForm}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// Export the component
export default App;
userroles

userRole
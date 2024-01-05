import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import './style.css'
import img2 from '../images/home-font.png';
import img1 from '../images/photo-1541963463532-d68292c34b19.avif'

export default function Contact() {
  return (
    <Container className='contact'>
        <div class="service-title">

<h6>contact us</h6>
<h2 className='mb-4'>Get in Touch</h2>
</div>
        

        <Row className="ctn_div">
            <Col lg="5" className='ctn-dlt'>
                {/* <h3 className='colo-sec py-4 text-center mb-4'>Get in Touch</h3> */}

         <img src={img2} width={'100%'}  alt="" />          
          
            </Col>

            <Col lg="7" className='d-flex align-item-center'>
                <form  className='ctn-frm w-100'>
                   <Row>
                    <Col lg="6" className='frm-grp'>
                        <input className='frm-cntrl' id='name' type='text' placeholder='Name'></input>
                    </Col>

                    <Col lg="6" className='frm-grp rounder-0'>
                        <input className='frm-cntrl' id='phone' type='number' placeholder='Phone'></input>
                    </Col>
                 </Row>
                 <Row>
                    <Col lg="6" className='frm-grp'>
                        <input className='frm-cntrl' id='email' type='email' placeholder='Email'></input>
                    </Col>

                    <Col lg="6" className='frm-grp rounder-0'>
                        <input className='frm-cntrl' id='location' type='location' placeholder='Location'></input>
                    </Col>
                 </Row>

                 <textarea className='frm-cntrl rounded-0 ' id="message" rows="5" placeholder="Message"></textarea>
                 <br/>
                 <Row>
                    <Col lg="12" className='frm-btn'>
                      
                        <button className='ctn-btn'>Send</button>
                    </Col>
                 </Row>
                </form>
            </Col>
        </Row>
    </Container>
  )
}

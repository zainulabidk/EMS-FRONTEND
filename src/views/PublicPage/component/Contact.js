import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import './style.css'
import img2 from '../images/home-font.png';
import img1 from '../images/photo-1541963463532-d68292c34b19.avif'

export default function Contact() {
  return (
    <Container className='contact'>
        <Row classNamme="mb-5 mt-3">
            {/* <Col lg="8">
                <h1 className='display-4 mb-4'>
                    Contact ME
                </h1>
            </Col> */}
        </Row>

        <Row className="ctn_div">
            <Col lg="5" className='ctn-dlt'>
                <h3 className='colo-sec py-4'>Get in Touch</h3>
                <address>
                    <p>Email : inqport@gmail.com</p>
           
                      <>Phone :+91 8272 822 ***</>
                  
                        <p>Address : 1540 Pecks Ridge Tilton Rd Flemingsburg.</p>
               
                </address>
                {/* <img src={img1} width={100} height={100} alt="Loading" /> */}
      <img src={img2} width={200} height={200} alt="" />          
           {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua</p> */}
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
                        <button className='btn ctn-btn' type='submit'>SEND</button>
                    </Col>
                 </Row>
                </form>
            </Col>
        </Row>
    </Container>
  )
}

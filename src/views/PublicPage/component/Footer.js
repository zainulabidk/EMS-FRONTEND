import React from 'react';
import './style.css'

export default function Footer() {
  return (
    <div className='footer'>
        {/* <div className='sb_footer section_padding'> */}

            <div class="footer-content container">
            <h1 class="mb-4">Enquiry Management</h1>
            <p>As we continue to innovate and refine our EMS, we invite you to join us on this journey toward inquiry excellence. Whether you're a business striving for efficiency or a user seeking a hassle-free experience, InqPortal is here to redefine the way inquiries are managed.</p>
            </div>
            <hr></hr>

            <div className='sb_footer_below'>
                <div className='sb_footer_copyright'>
                    <p>
                        @{new Date().getFullYear()} FullStack. All right reserved.
                    </p>
                </div>
                <div className='sb_footer_below_links'>
                    <a href='/terms'><div><p>Home</p></div></a>
                    <a href='/terms'><div><p>About us</p></div></a>
                    <a href='/terms'><div><p>Features</p></div></a>
                    <a href='/terms'><div><p>Contact</p></div></a>
                </div>
            </div>
        {/* </div> */}
      
    </div>
  )
}
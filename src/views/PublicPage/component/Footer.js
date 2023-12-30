import React from 'react';
import './style.css'

export default function Footer() {
  return (
    <div className='footer'>
        <div className='sb_footer section_padding'>
            <div className='sb_footer_links'>
                <div className='sb_footer_links_div'>
                    <h4>For Business</h4>
                    <a href='/employe'>
                        <p>Employer</p>
                    </a>
                    <a href='/employe'>
                        <p>Health Plane</p>
                    </a>
                    <a href='/employe'>
                        <p>Individual</p>
                    </a>
                </div>

                <div className='sb_footer_links_div'>
                    <h4>Resources</h4>
                    <a href='/employe'>
                        <p>Employer</p>
                    </a>
                    <a href='/employe'>
                        <p>Health Plane</p>
                    </a>
                    <a href='/employe'>
                        <p>Individual</p>
                    </a>
                </div>

              

                <div className='sb_footer_links_div'>
                    <h4>Company</h4>
                    <a href='/employe'>
                        <p>Employer</p>
                    </a>
                    <a href='/employe'>
                        <p>Employer</p>
                    </a>
                    <a href='/employe'>
                        <p>Employer</p>
                    </a>
                    <a href='/employe'>
                        <p>Employer</p>
                    </a>
                </div>

                <div className='sb_footer_links_div'>
                    <h4>Coming Soon on</h4>
                    <div className='socialmedia'>
                        <p><img src='{fb}' /></p>
                        <p><img src='{fb}' /></p>
                        <p><img src='{fb}' /></p>
                        <p><img src='{fb}' /></p>
                    </div>
                </div>
            </div>

            <hr></hr>

            <div className='sb_footer_below'>
                <div className='sb_footer_copyright'>
                    <p>
                        @{new Date().getFullYear()} codeInn. All right reserved.
                    </p>
                </div>
                <div className='sb_footer_below_links'>
                    <a href='/terms'><div><p>Terms &  Conditions</p></div></a>
                    <a href='/terms'><div><p>Terms &  Conditions</p></div></a>
                    <a href='/terms'><div><p>Terms &  Conditions</p></div></a>
                    <a href='/terms'><div><p>Terms &  Conditions</p></div></a>
                </div>
            </div>
        </div>
      
    </div>
  )
}

import {React,useState,useEffect} from 'react'
import { cilEnvelopeOpen,cilUser, cilPlus, cilClock   } from '@coreui/icons';
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
// import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import axios from 'axios';
import yourImage from '../../assets/images/bar-graph.jpg';
import lineChart from '../../assets/images/line-chart.jpg';
const WidgetsDropdown = () => {

// vendors count

const [datas, setDatas] = useState([]);
const [licenseeCount, setLicenseeCount] = useState(0);
const [New, setNew] = useState(0);
const [pending, setPending] = useState(0);


const [filteredDatas, setFilteredDatas] = useState([]);


 


// ALL ENQUIRIES Count
const getDatas = async () => {
  try {
    const response = await axios.get('http://localhost:3000/enquiries/total/count');
    console.log('API response:', response.data.enquiry); // Log the entire response
    setDatas(response.data.enquiry);
    setFilteredDatas(response.data.enquiry);
  } catch (error) {
    console.error(error);
  }
};


// ALL LICENSEE Count
const getLicenseeCount = async () => {
  try {
    const response = await axios.get('http://localhost:3000/users');
    const licenseeUsers = response.data.users.filter(user => user.userType === 'licensee');
    setLicenseeCount(licenseeUsers.length);
    
  } catch (error) {
    console.error(error);
  }
};
// NEW ENQUIRES Count
const NewEnq = async () => {
  try {
    const response = await axios.get('http://localhost:3000/enquiries');
    // Assuming the API response has an 'enquiries' property
    const newEnquiries = response.data.enquiry.filter(enquiry => enquiry.status === 'new');
    console.log(newEnquiries);
    setNew(newEnquiries.length);
  } catch (error) {
    console.error(error);
  }
};

// pending Count
const PendingGET = async () => {
  try {
    const response = await axios.get('http://localhost:3000/enquiries');
    // Assuming the API response has an 'enquiries' property
    const newEnquiries = response.data.enquiry.filter(enquiry => enquiry.status === 'pending');
    console.log(newEnquiries);
    setPending(newEnquiries.length);
  } catch (error) {
    console.error(error);
  }
};
 

useEffect(()=>{
  getDatas();
  getLicenseeCount();
  NewEnq();
  PendingGET();
},[])

  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 widget-div1"


          value={
            <>
 
             <div className='icon-div' style={{ backgroundColor: '#cee6ff', height: '50px', width: '50px', borderRadius: '15px',display:'flex',justifyContent:'center', alignItems:'center' }}>
                {/* Icon implementation here */}
                {/* <CIcon icon={cilArrowTop} size="2xl" /> */}
                {/* <CIcon icon="cil-envelope-open" size="2xl" /> */}
                <CIcon icon={cilEnvelopeOpen} size="lg" className='icon1' />
                
              </div>
      
            <p className='widget-p m-0'>Total Enquiry</p>
        
            <p className='count-num mb-2'>{datas ? datas : 0}</p>
           
       
            </>
          }

          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} size="lg" className="text-high-emphasis-inverse" />
               
              </CDropdownToggle>
            
            </CDropdown>
          }
        
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 widget-div2"
          // color="info"
          value={
            <>
            <div style={{backgroundColor: '#fcdfee', height:'50px', width:'50px', borderRadius:'15px',display:'flex',justifyContent:'center', alignItems:'center'}}>
            {/* <CIcon icon={cilUser} size="2xl" className='icon1' style={{ fill: 'blue' }} /> */}
            <CIcon icon={cilUser} size="lg"  className='icon1' />
            </div>
           <p className='widget-p m-0'>Total Licensee</p>
           <p className='count-num mb-2'>{licenseeCount ? licenseeCount : 0}</p>
            </>
          }
       
          
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} size="lg" className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              
            </CDropdown>
          }
      
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 widget-div3"
      
          value={
            <>
            <div style={{backgroundColor: '#dcf2e5', height:'50px', width:'50px', borderRadius:'15px',display:'flex',justifyContent:'center', alignItems:'center'}}>
            <CIcon icon={cilPlus} size="lg"  className='icon1' />
  
            </div>
           <p className='widget-p m-0'>New Enquiry</p>
           <p className='count-num mb-2'>{New ? New : 0}</p>
       
            </>
          }
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
             
            </CDropdown>
          }
      
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 widget-div4"

          value={
            <>
            <div style={{backgroundColor: '#eadbf8', height:'50px', width:'50px', borderRadius:'15px', display:'flex',justifyContent:'center', alignItems:'center'}}>
            <CIcon icon={cilClock} size="lg"  className='icon1' />
             
            </div>
            <p className='widget-p m-0'>Pending</p>
        
            <p className='count-num mb-2'>{pending ? pending : 0}</p>
       
            </>
          }
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
               
            </CDropdown>
          }
         
        />
      </CCol>

      {/* <CCol  lg={6}>
 
          <div className='widgettt '>
            <div className='top-div'>
            <p>Monthly Enquiry</p>
            </div>
            <img src={yourImage} className='graph'></img>
          </div>
 
      </CCol>

      <CCol sm={6} lg={3}>
 
          <div className='widgettt'></div>

     </CCol>

     <CCol sm={6} lg={3}>
 
           <div className='widgettt p-0' >
            <div className='upper-div'></div>
           <img src={lineChart} className='graph'></img>
           </div>
        
      </CCol> */}

    </CRow>
  )
}

export default WidgetsDropdown



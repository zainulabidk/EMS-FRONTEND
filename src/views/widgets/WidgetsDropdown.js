import {React,useState,useEffect} from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import axios from 'axios'

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
          className="mb-4 widget-div"
          color="primary"

          value={
            <>
            <h4>Total Enquiry</h4>
          
            {/* <h4>{datas ? datas : 0}</h4> */}
            <h4>{datas ? datas : 0}</h4>
       
            </>
          }

          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
            
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '40px' }}
             
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 widget-div"
          color="info"
          value={
            <>
            <h4>Total Licensee</h4>
            <h4>{licenseeCount ? licenseeCount : 0}</h4>
            </>
          }
       
          
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '40px' }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 widget-div"
          color="warning"
          value={
            <>
            <h4>New</h4>
          
            {/* <h4>{datas ? datas : 0}</h4> */}
            <h4>{New ? New : 0}</h4>
       
            </>
          }
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
             
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '40px' }}
            
            
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 widget-div"
          color="danger"
          value={
            <>
            <h4>Pending</h4>
          
            {/* <h4>{datas ? datas : 0}</h4> */}
            <h4>{pending ? pending : 0}</h4>
       
            </>
          }
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
               
            </CDropdown>
          }
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: '40px' }}
            
            />
          }
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
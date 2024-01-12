
import React, { useState, useEffect } from 'react';
import Datatable , { ExpanderComponentProps }  from 'react-data-table-component';
import axios from 'axios';
import EditModal from './EditModal';
import ViewModal from './ViewModal';
import Button from 'react-bootstrap/Button';
import '../style/table.css';
import AddModal from './AddModal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewExpModal from '../EnquiryMangement/ExpandibleView';
import {

  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash ,faFilter ,faSearch,faUserClock ,faClock,faCalendar,faReply,faBell, faPhone } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from './DeleteModal';
import FollowUpModal from './FollowUpAdd';
import Filter from './Filter';
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from 'react';


function Table() {
  const [datas, setDatas] = useState([]);
const [selectedEnquiryId, setSelectedEnquiryId] = useState(null);  //followUp
const [showFollowUpModal, setShowFollowUpModal] = useState(false);  //followUp
  const [search, setSearch] = useState("");
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDatas, setSelectedDatas] = useState(null);
  const [deleteModal,setDeleteModal] =useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [leadQuality, setLeadQuality] = useState(['High', 'Medium', 'Low']);
  const [followUpData, setFollowUpData] = useState([]); //flwup
  const [filterValue, setFilterValue] = useState(''); 
  const [query, setQuery] = useState('');   
  const navRef = useRef();  
  const showNavbar = () => {
  navRef.current.classList.toggle("responsive_nav");
}


  const handleClose = () => {
    setShowEditModal(false);
    setShowViewModal(false);
    setSelectedDatas(null);
  };



  const getDatas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/enquiries');
      console.log('Responsse from saba:', response.data);
      setDatas(response.data.enquiry);
      setFilteredDatas(response.data.enquiry);
      console.log(response.data.enquiry);

      // Fetch lead quality options from the server or set them manually
      setLeadQualityOptions(['High', 'Medium', 'Low']);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDatas();


  }, []);

//
  const handleUpdate = async (orgId, updatedData) => {
    try {
      console.log('Updating data:', orgId, updatedData);
      const response = await axios.put(`http://localhost:3000/enquiries/${orgId}`, updatedData);
      console.log('Update response:', response.data);
      getDatas(); // Refresh the data after update
      toast.success('Data updated successfully!',{ autoClose: 1000 });

    } catch (error) {
      console.error('Error updating data:', error);
      toast.error('Error updating data. Please try again.',{ autoClose: 1000 });
    }
  };

    const handleEdit = (row) => {
      setSelectedDatas(row);
      setShowEditModal(true);
    };

  const handleViewDetails = (row) => {
    console.log('Selected Row:', row);
    setSelectedDatas(row);
    setShowViewModal(true);
  };

//DELETE MODAL

const deleteModalClose = () => {
  setDeleteModal(false);
};

const deleteModalShow = () => {
  setDeleteModal(true);
};


const handleClickDelete = (row) => {
  setSelectedId(row._id);
  deleteModalShow();
};


// Add a function to handle the FollowUp button click
const handleFollowUpClick = (enquiryId) => {
  setSelectedEnquiryId(enquiryId);
  setShowFollowUpModal(true);
};


const isExpandableRow = (row) => {
  return Array.isArray(row.followUpData) && row.followUpData.length > 0;
};


const totalCount = filteredDatas ? filteredDatas.length : 0;

  const columns = [
   
    {
      name: "ENQ NO",
      selector: (row) =><div style={{ textTransform: 'capitalize' }}>{ row.enqNo}</div>,
      sortable: true,
    },
  
    {
      name: "NAME",
      selector: (row) =><div style={{ textTransform: 'capitalize' }}>{ `${row.fName} ${row.lName}`}</div>,
    },

    {
      name: "MOBILE",
      selector: (row) =><div style={{ textTransform: 'capitalize' }}>{ row.mobile}</div>,
    },

    {
      name: "ACTIONS",
      cell: (row) => (
        <>
        <div>
          <Button  className='btn btn-1 me-3 ps-0' onClick={() => handleEdit(row)}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button  className='btn btn-2 me-3 ps-0' onClick={() => handleViewDetails(row)}>
            <FontAwesomeIcon icon={faEye} />
          </Button>
          <Button  className='btn btn-3 me-3 ps-0' onClick={() => handleClickDelete(row)}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
          <Button  className='btn btn-2 me-3 ps-0'  onClick={() => handleFollowUpClick(row._id)}>
              <FontAwesomeIcon icon={faUserClock  } />
            </Button>

        </div>
        </>
      ),
    },
  ];



  useEffect(() => {
    if (!Array.isArray(datas)) {
      console.error("Datas is not an array!" ,datas);
      return;
    }

    const result = datas.filter((item) => {
    
      const nameMatch =
      (item.fName && item.fName.toLowerCase().includes(search.toLowerCase())) ||
      (item.lName && item.lName.toLowerCase().includes(search.toLowerCase())) ||
      (item.email && item.email.toLowerCase().includes(search.toLowerCase())) ||
      (item.mobile && item.mobile.toString().includes(search))


      const statusMatch = item.status && item.status.toLowerCase().includes(filterValue.toLowerCase());
      const enqNoMatch = item.enqNo && item.enqNo.toString().includes(search);


     return (nameMatch  || enqNoMatch ) && (filterValue === '' || statusMatch);

    });
    setFilteredDatas(result);
  }, [search, datas,filterValue]);


  


  const rowPreDisabled = row => row.disabled;


const ExpandedComponent = ({ data }) => {
  const [followUpData, setFollowUpData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDatas, setSelectedDatas] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [followUpDataPresent, setFollowUpDataPresent] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/followUp/enqId/${data._id}`);
        setFollowUpData(response.data.followUp);
      } catch (error) {
        console.error("Error fetching follow-up data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data._id]);

  useEffect(() => {
    setFollowUpDataPresent(followUpData.length > 0);
  }, [followUpData]);


  if (loading) {
    return <div>Loading follow-up data...</div>;
  }

  if (followUpData.length === 0) {
    return null; 
  }


  

  //VIEW MODEL
  const handleClose = () => {
    setShowViewModal(false);
    setSelectedDatas(null);
  };


  const viewModalShow = () => {
    setShowViewModal(true);
  };


  const handleClickView = (followUp) => {
    setSelectedDatas(followUp);
    viewModalShow();
  };

  return  (
    <>
     
   <div className="view-exp-modal"  style={{ margin: '20px', padding: '20px'}}>
     <CTable align="middle" className="mb-0 border" hover responsive>
     <CTableHead color="light">
       <CTableRow >
         <CTableHeaderCell className='text-start '>FOLLOWUP DETAILS</CTableHeaderCell>
         <CTableHeaderCell className='text-start '>NEXT CONTACT DATE</CTableHeaderCell>
         <CTableHeaderCell className='text-start '>REMARKS</CTableHeaderCell>
         <CTableHeaderCell className='text-start '>STATUS</CTableHeaderCell>
         <CTableHeaderCell className='text-start '>ACTION</CTableHeaderCell>
       </CTableRow>
     </CTableHead>
     <CTableBody>
        {followUpData.map((followUp, index) => (
         <CTableRow key={index} className="follow-up-table-row">
           <CTableDataCell className='text-start'>{followUp.followUpDetails.substring(0,13)}..</CTableDataCell>
           <CTableDataCell className='text-start'>{followUp.nextContactDate}</CTableDataCell>
           <CTableDataCell className='text-start'>{followUp.remarks.substring(0,13)}..</CTableDataCell>
           <CTableDataCell className='text-start'>{followUp.status}</CTableDataCell>
           <CTableDataCell className='text-start'>
             <div className="d-flex justify-content-start">
               <FontAwesomeIcon icon={faEye} style={{  color: '#5bb6ea'}} 
             onClick={() => handleClickView(followUp)}/>
             </div>
           </CTableDataCell>
         </CTableRow>
       ))}
     </CTableBody>
   </CTable>
   <ViewExpModal showModal={showViewModal} handleClose={handleClose} selectedDatas={selectedDatas}  />

    </div>
    </>
  );
};

  return (
    <>
    <ToastContainer />
    <div className='table-div' >
      <Datatable className='table-data-div'
        title='Enquiries'
        columns={columns}
        data={filteredDatas}
        pagination
        paginationPerPage={5}
        rowsPerPageOptions={[]} 
        fixedHeader
        fixedHeaderScrollHeight='320px'
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        subHeader
        subHeaderComponent={
      
        <div className='table-top'>
         
        <div  className='left-div'>
             <div> <AddModal getDatas={getDatas} /></div>
             <div className="search-input-container">
               <FontAwesomeIcon icon={faSearch} className="search-icon" />
               <input
                 type='text'
                 placeholder='Search'
                 className='w-35 search-control'
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
               />
             </div>
             </div>
             
             <div  ref={navRef} className='right-div' >
               <div className='inner-div'>
               <div className='count-div me-2'>
                 <FontAwesomeIcon icon={faFilter} style={{ marginRight: '5px' }} />
                 <span>{' '}Results: {totalCount}</span>
               </div>
               <div>
                 {/* <FilterDropdown datas={datas} setFilteredDatas={setFilteredDatas} roleOptions={roleOptions} /> */}
                 <Filter  onFilter={(newQuery, newFilterValue) => { setQuery(newQuery); setFilterValue(newFilterValue); }} />
               </div>
               </div>
               <button className='nav-btn nav-close-btn' onClick={showNavbar}>
            <FaTimes/>
       </button>
             </div>
             <button className='nav-btn' onClick={showNavbar}>
       <FaBars/>
   </button>
           </div>
     
        }
        subHeaderAlign='right'

        expandableRows={(row) => row._id === selectedDatas?._id && row.followUpData?.length > 0}
      
        expandableRowsComponent={(props) => <ExpandedComponent {...props} data={props.data} />}
        expandableRowDisabled={rowPreDisabled}
        
  
      />
      </div>
 
         <EditModal showModal={showEditModal} handleClose={handleClose} selectedDatas={selectedDatas} 
       handleUpdate={handleUpdate} leadQuality={leadQuality}
     /> 
      <ViewModal showModal={showViewModal} handleClose={handleClose} selectedDatas={selectedDatas} />
      <DeleteModal deleteclose={deleteModalClose} dlt={deleteModal} id={selectedId} getDatas={getDatas} />
      {showFollowUpModal && (
        <FollowUpModal
          selectedEnquiryId={selectedEnquiryId}
          showFollowUpModal={showFollowUpModal}
          setShowFollowUpModal={setShowFollowUpModal}
          getDatas={getDatas}
          enqId={selectedEnquiryId} 
        />
      )} </>
  );
}

export default Table;


/*
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

import {

  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
// Import necessary FontAwesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash ,faFilter ,faSearch  } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from './DeleteModal';

function Table() {
  const [datas, setDatas] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDatas, setSelectedDatas] = useState(null);
  const [deleteModal,setDeleteModal] =useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [leadQuality, setLeadQuality] = useState(['High', 'Medium', 'Low']);
 
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


  const handleUpdate = async (orgId, updatedData) => {
    try {
      console.log('Updating data:', orgId, updatedData);
      const response = await axios.put(`http://localhost:3000/enquiries/${orgId}`, updatedData);
      console.log('Update response:', response.data);
      getDatas(); // Refresh the data after update
      toast.success('Data updated successfully!');

    } catch (error) {
      console.error('Error updating data:', error);
      toast.error('Error updating data. Please try again.');
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


const totalCount = filteredDatas ? filteredDatas.length : 0;

  const columns = [
   
    {
      name: "NO",
      selector: (row) =><div style={{ textTransform: 'capitalize' }}>{ row.enqNo}</div>,
      sortable: true,
    },
    {
      name: "DESCRIPTION",
      selector: (row) =><div style={{ textTransform: 'capitalize' }}>{ row.enqDescp}</div>,
    },
    {
      name: "NAME",
      selector: (row) =><div style={{ textTransform: 'capitalize' }}>{ `${row.fName} ${row.lName}`}</div>,
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
    },
 

    {
      name: "ACTIONS",
      cell: (row) => (
        <>
        <div>
         <Button  style={{paddingLeft:'0px'}} className='btn  btn-1  ' onClick={() => handleEdit(row)}>
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        <Button className='btn btn-2  ' onClick={() => handleViewDetails(row)}>
          <FontAwesomeIcon icon={faEye} /> 
        </Button>
        <Button className='btn btn-3 ' onClick={() => handleClickDelete(row)}>
          <FontAwesomeIcon icon={faTrash} /> 
        </Button>

        </div>
        </>
      ),
    },
  ];


  useEffect(() => {
    getDatas();


  }, []);

  useEffect(() => {
    if (!Array.isArray(datas)) {
      console.error("Datas is not an array!" ,datas);
      return;
    }

    const result = datas.filter((item) => {
      return item.enqDescp?.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredDatas(result);
  }, [search, datas]);

  /*const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;*


const ExpandedComponent = ({ data }) => {
  const [followUpData, setFollowUpData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading follow-up data...</div>;
  }

  return (
    <div>
    
     <CTable align="middle" className="mb-0 border" hover responsive>
     <CTableHead color="light">
       <CTableRow>
         <CTableHeaderCell className='text-start '>followUpDetails</CTableHeaderCell>
         <CTableHeaderCell className='text-start '>nextContactDate</CTableHeaderCell>
         <CTableHeaderCell className='text-start '>remarks</CTableHeaderCell>
         <CTableHeaderCell className='text-start '>status</CTableHeaderCell>
         <CTableHeaderCell className='text-start '>Actions</CTableHeaderCell>
       </CTableRow>
     </CTableHead>
     {followUpData.length === 0 ?(
         <CTableBody className='align-items-center mb-0'>
            <tr>
      <td colSpan={8} className='text-center mb-0'>No FollowUp found</td>
        </tr>
        </CTableBody>
     ):(
     <CTableBody>
        {followUpData.map((followUp, index) => (
         <CTableRow key={index}>
           <CTableDataCell className='text-start'>{followUp.followUpDetails}</CTableDataCell>
           <CTableDataCell className='text-start'>{followUp.nextContactDate}</CTableDataCell>
           <CTableDataCell className='text-start'>{followUp.remarks}</CTableDataCell>
           <CTableDataCell className='text-start'>{followUp.status}</CTableDataCell>
           <CTableDataCell className='text-start'>
             <div className="d-flex justify-content-start">
               <FontAwesomeIcon icon={faEye} style={{ marginRight: '10px', color: 'blue', padding: '5px', borderRadius: '5px', cursor: 'pointer'}} onClick={() => handleClickView(followUp._id)} />
             </div>
           </CTableDataCell>
         </CTableRow>
       ))}
     </CTableBody>
     ) }
    
      
   </CTable>


    </div>
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
              <div ><AddModal getDatas={getDatas}/></div>
  
              <div style={{display:'flex',alignItems:'center',width: '36%', justifyContent:'space-between'}}>
            <div>
            <div className="search-input-container">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type='text'
                placeholder='Search'
                className='w-35 form-control'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            </div>
            <div className='count-div'>
                  <FontAwesomeIcon icon={faFilter} style={{ marginRight: '5px' }} />
                  <span>{' '}Results: {totalCount}</span>
                </div>
            </div>
          </div>
        }
        subHeaderAlign='right'
        expandableRows
        expandableRowsComponent={ExpandedComponent}
      />
      </div>
 
         <EditModal showModal={showEditModal} handleClose={handleClose} selectedDatas={selectedDatas} 
       handleUpdate={handleUpdate} leadQuality={leadQuality}
     /> 
      <ViewModal showModal={showViewModal} handleClose={handleClose} selectedDatas={selectedDatas} />
      <DeleteModal deleteclose={deleteModalClose} dlt={deleteModal} id={selectedId} getDatas={getDatas} />
     
    </>
  );
}

export default Table;
*/


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
// Import necessary FontAwesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash ,faFilter ,faSearch  } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from './DeleteModal';

function Table() {
  const [datas, setDatas] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDatas, setSelectedDatas] = useState(null);
  const [deleteModal,setDeleteModal] =useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [leadQuality, setLeadQuality] = useState(['High', 'Medium', 'Low']);
 
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


  const handleUpdate = async (orgId, updatedData) => {
    try {
      console.log('Updating data:', orgId, updatedData);
      const response = await axios.put(`http://localhost:3000/enquiries/${orgId}`, updatedData);
      console.log('Update response:', response.data);
      getDatas(); // Refresh the data after update
      toast.success('Data updated successfully!');

    } catch (error) {
      console.error('Error updating data:', error);
      toast.error('Error updating data. Please try again.');
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


const totalCount = filteredDatas ? filteredDatas.length : 0;

  const columns = [
   
    {
      name: "NO",
      selector: (row) =><div style={{ textTransform: 'capitalize' }}>{ row.enqNo}</div>,
      sortable: true,
    },
    {
      name: "DESCRIPTION",
      selector: (row) =><div style={{ textTransform: 'capitalize' }}>{ row.enqDescp}</div>,
    },
    {
      name: "NAME",
      selector: (row) =><div style={{ textTransform: 'capitalize' }}>{ `${row.fName} ${row.lName}`}</div>,
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
    },
 

    {
      name: "ACTIONS",
      cell: (row) => (
        <>
        <div>
         <Button  style={{paddingLeft:'0px'}} className='btn  btn-1  ' onClick={() => handleEdit(row)}>
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        <Button className='btn btn-2  ' onClick={() => handleViewDetails(row)}>
          <FontAwesomeIcon icon={faEye} /> 
        </Button>
        <Button className='btn btn-3 ' onClick={() => handleClickDelete(row)}>
          <FontAwesomeIcon icon={faTrash} /> 
        </Button>

        </div>
        </>
      ),
    },
  ];


  useEffect(() => {
    getDatas();


  }, []);

  useEffect(() => {
    if (!Array.isArray(datas)) {
      console.error("Datas is not an array!" ,datas);
      return;
    }

    const result = datas.filter((item) => {
      return item.enqDescp?.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredDatas(result);
  }, [search, datas]);

  /*const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;*/


const ExpandedComponent = ({ data }) => {
  const [followUpData, setFollowUpData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDatas, setSelectedDatas] = useState(null);
  const [selectedId, setSelectedId] = useState(null);


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

  if (loading) {
    return <div>Loading follow-up data...</div>;
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


  return (
    <>
   <div style={{ margin: '20px', padding: '20px'}}>
     <CTable align="middle" className="mb-0 border" hover responsive>
     <CTableHead color="light">
       <CTableRow>
         <CTableHeaderCell className='text-start '>followUpDetails</CTableHeaderCell>
         <CTableHeaderCell className='text-start '>nextContactDate</CTableHeaderCell>
         <CTableHeaderCell className='text-start '>remarks</CTableHeaderCell>
         <CTableHeaderCell className='text-start '>status</CTableHeaderCell>
         <CTableHeaderCell className='text-start '>Actions</CTableHeaderCell>
       </CTableRow>
     </CTableHead>
     {followUpData.length === 0 ?(
         <CTableBody className='align-items-center mb-0'>
            <tr>
      <td colSpan={8} className='text-center mb-0'>No FollowUp found</td>
        </tr>
        </CTableBody>
     ):(
     <CTableBody>
        {followUpData.map((followUp, index) => (
         <CTableRow key={index}>
           <CTableDataCell className='text-start'>{followUp.followUpDetails}</CTableDataCell>
           <CTableDataCell className='text-start'>{followUp.nextContactDate}</CTableDataCell>
           <CTableDataCell className='text-start'>{followUp.remarks}</CTableDataCell>
           <CTableDataCell className='text-start'>{followUp.status}</CTableDataCell>
           <CTableDataCell className='text-start'>
             <div className="d-flex justify-content-start">
               <FontAwesomeIcon icon={faEye} style={{ marginRight: '10px', color: 'blue', padding: '5px', borderRadius: '5px', cursor: 'pointer'}} 
             onClick={() => handleClickView(followUp)}/>
             </div>
           </CTableDataCell>
         </CTableRow>
       ))}
     </CTableBody>
     ) }
    
      
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
              <div ><AddModal getDatas={getDatas}/></div>
  
              <div style={{display:'flex',alignItems:'center',width: '36%', justifyContent:'space-between'}}>
            <div>
            <div className="search-input-container">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type='text'
                placeholder='Search'
                className='w-35 form-control'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            </div>
            <div className='count-div'>
                  <FontAwesomeIcon icon={faFilter} style={{ marginRight: '5px' }} />
                  <span>{' '}Results: {totalCount}</span>
                </div>
            </div>
          </div>
        }
        subHeaderAlign='right'
        expandableRows
        expandableRowsComponent={ExpandedComponent}
      />
      </div>
 
         <EditModal showModal={showEditModal} handleClose={handleClose} selectedDatas={selectedDatas} 
       handleUpdate={handleUpdate} leadQuality={leadQuality}
     /> 
      <ViewModal showModal={showViewModal} handleClose={handleClose} selectedDatas={selectedDatas} />
      <DeleteModal deleteclose={deleteModalClose} dlt={deleteModal} id={selectedId} getDatas={getDatas} />
     
    </>
  );
}

export default Table;
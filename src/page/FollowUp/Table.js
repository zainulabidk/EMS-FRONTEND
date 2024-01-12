
import React, { useState, useEffect } from 'react';
import Datatable from 'react-data-table-component';
import axios from 'axios';
import EditModal from './EditModal';
import ViewModal from './ViewModal';
import Button from 'react-bootstrap/Button';
import '../style/table.css';
import Filter from './Filter';
// Import necessary FontAwesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash, faFilter,faSearch} from '@fortawesome/free-solid-svg-icons';
import DeleteModal from './DeleteModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from 'react';

function Table() {
  const [datas, setDatas] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDatas, setSelectedDatas] = useState(null);
  const [deleteModal,setDeleteModal] =useState(false);
  const [selectedId, setSelectedId] = useState(null);
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
      const response = await axios.get('http://localhost:3000/followUp');
      setDatas(response.data.followUp);
      setFilteredDatas(response.data.followUp);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (orgId, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3000/followUp/${orgId}`, updatedData);
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
    setSelectedDatas(row);
    setShowViewModal(true);
  };


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
  const totalCount = filteredDatas.length;

  const columns = [
   
    {
      name: "NAME",
      selector: (row) =><div style={{ textTransform: 'capitalize' }}>{row.enqId ? `${row.enqId.fName} ${row.enqId.lName}` :''}</div>,
      sortable: true,
    },
    {
      name: "DETAILS",
      selector: (row) =>  <div style={{ textTransform: 'capitalize' }}>{row.followUpDetails}</div> ,
    },
    {
      name: "CONTACT DATE",
      selector: (row) => <div style={{ textTransform: 'capitalize' }}>{row.nextContactDate}</div> ,
    },
    {
      name: "STATUS",
      selector: (row) => <div style={{ textTransform: 'capitalize' }}>{row.status}</div> ,
    },
    {
      name: "ACTIVE",
      cell: (row) => (
        <>
        <div>
         <Button  style={{paddingLeft:'0px'}} className='btn  btn-1  mx-1' onClick={() => handleEdit(row)}>
          <FontAwesomeIcon icon={faEdit} /> {/* Edit Icon */}
        </Button>
        <Button className='btn btn-2  mx-1' onClick={() => handleViewDetails(row)}>
          <FontAwesomeIcon icon={faEye} /> {/* View Details Icon */}
        </Button>
        <Button className='btn btn-3  mx-1' onClick={() => handleClickDelete(row)}>
          <FontAwesomeIcon icon={faTrash} /> {/* Delete Icon */}
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
      console.error("Datas is not an array!");
      return;
    }

    const result = datas.filter((item) => {
      const nameMatch = 
      (item.enqId.fName.toLowerCase().includes(search.toLowerCase())) || 
      (item.enqId.lName.toLowerCase().includes(search.toLowerCase())) ||
      (item.nextContactDate && item.nextContactDate.toString().includes(search));

    
   //   const nextContactDateMatch = item.nextContactDate.toLowerCase().includes(search.toLowerCase());

      const statusMatch = item.status.toLowerCase().includes(filterValue.toLowerCase());
     // Apply both name and status filters
       return nameMatch && (filterValue === '' || statusMatch);
    });
    setFilteredDatas(result);
  }, [search, datas,filterValue]);


  return (
    <>
    <ToastContainer/>
    <div className='table-div'>
      <Datatable className='table-data-div'
        title='Follow Up'
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
       
/* <div className='table-top container-fluid'>
<div className='row'>
  <div className='col-md-7'>
    <div className='row d-flex justify-content-between'>
   
    <div className='col-7 col-sm-5 search-input-container'>
    <FontAwesomeIcon icon={faSearch} className='search-icon' />
    <input
      type='text'
      placeholder='Search'
      className='w-100 search-control'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>
  </div>
  </div>

  <div className='col-md-5'>
  <div className='row  d-flex justify-content-end'>
    <div className='col-8 col-sm-7 '>
      <Filter  onFilter={(newQuery, newFilterValue) => { setQuery(newQuery); setFilterValue(newFilterValue); }} />
    </div>
    <div className=' col-4 col-sm-3 col-lg-4 col-xl-3' >
      <div className='count-div'>
      <FontAwesomeIcon icon={faFilter} style={{ marginRight: '5px' }} />
      <span>{' '}  {totalCount}</span>
      </div>
    </div>
    </div>
  </div>
</div>
</div> */
<div className='table-top'>
         
<div  className='left-div'>
     <div className="search-input-container">
       <FontAwesomeIcon icon={faSearch} className="search-icon " />
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
      />
      </div>

      {/* Modal for Editing */}
      <EditModal showModal={showEditModal} handleClose={handleClose} selectedDatas={selectedDatas} handleUpdate={handleUpdate} />

      {/* Modal for Viewing Details */}
      <ViewModal showModal={showViewModal} handleClose={handleClose} selectedDatas={selectedDatas} />
      <DeleteModal deleteclose={deleteModalClose} dlt={deleteModal} id={selectedId} getDatas={getDatas} />
    </>
  );
}

export default Table;

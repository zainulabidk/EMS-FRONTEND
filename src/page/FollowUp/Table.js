// Table.js
/*import React, { useState, useEffect } from 'react';
import Datatable from 'react-data-table-component';
import axios from 'axios';
import EditModal from './EditModal';
import ViewModal from './ViewModal';
import Button from 'react-bootstrap/Button';
import '../style/table.css';
import AddModal from './AddModal'
// Import necessary FontAwesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash, faFilter} from '@fortawesome/free-solid-svg-icons';
import DeleteModal from './DeleteModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Table() {
  const [datas, setDatas] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDatas, setSelectedDatas] = useState(null);
  const [deleteModal,setDeleteModal] =useState(false);
  const [selectedId, setSelectedId] = useState(null);

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
  const totalCount = filteredDatas.length;

  const columns = [
   
    {
      name: "NAME",
      selector: (row) =><div style={{ textTransform: 'capitalize' }}>{ `${row.enqId.fName} ${row.enqId.lName}`}</div>,
      sortable: true,
    },
    {
      name: "FOLLOWUP DETAILS",
      selector: (row) =>  <div style={{ textTransform: 'capitalize' }}>{row.followUpDetails}</div> ,
    },
    {
      name: "NEXT CONTACT DATE",
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
          <FontAwesomeIcon icon={faEdit} /> {/* Edit Icon *
        </Button>
        <Button className='btn btn-2  mx-1' onClick={() => handleViewDetails(row)}>
          <FontAwesomeIcon icon={faEye} /> {/* View Details Icon *
        </Button>
        <Button className='btn btn-3  mx-1' onClick={() => handleClickDelete(row)}>
          <FontAwesomeIcon icon={faTrash} /> {/* Delete Icon *
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
      return item.status.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredDatas(result);
  }, [search, datas]);

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
          <div className='table-top'>
              <div ><AddModal  getDatas={getDatas} /></div>
              <div style={{display:'flex',alignItems:'center',width: '36%', justifyContent:'space-between'}}>
            <div>
              <input
                type='text'
                placeholder='Search here'
                className='w-35 form-control'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className='count-div'>
                  <FontAwesomeIcon icon={faFilter} style={{ marginRight: '5px' }} />
                  <span>{' '}Results: {totalCount}</span>
                </div>
            </div>
          </div>
        }
        subHeaderAlign='right'
      />
      </div>

      {/* Modal for Editing *
      <EditModal showModal={showEditModal} handleClose={handleClose} selectedDatas={selectedDatas} handleUpdate={handleUpdate} />

      {/* Modal for Viewing Details *
      <ViewModal showModal={showViewModal} handleClose={handleClose} selectedDatas={selectedDatas} />
      <DeleteModal deleteclose={deleteModalClose} dlt={deleteModal} id={selectedId} getDatas={getDatas} />
    </>
  );
}

export default Table;
*/

// Table.js
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
  const [query, setQuery] = useState('');    //filter

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
      name: "NEXT CONTACT DATE",
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
      (item.enqId.lName.toLowerCase().includes(search.toLowerCase()));
    
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
          <div className='table-top'>
          <div className='d-flex justify-content-start'>
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

        <div className='d-flex justify-content-end  end-col' >
     <div className='border-end'>
        <Filter onFilter={(newQuery, newFilterValue) => { setQuery(newQuery); setFilterValue(newFilterValue); }} />

        <div className='count-div'>
              <FontAwesomeIcon icon={faFilter} style={{ marginRight: '5px' }} />
              <span style={{ whiteSpace: 'nowrap' }}>{' '}Results: {totalCount}</span>
            </div>
</div></div>
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

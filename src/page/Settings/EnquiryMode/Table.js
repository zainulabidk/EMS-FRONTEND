

// Table.js
import React, { useState, useEffect } from 'react';
import Datatable from 'react-data-table-component';
import axios from 'axios';
import EditModal from './EditModal';
import ViewModal from './ViewModal';
import Button from 'react-bootstrap/Button';
import '../../style/table.css'
import { ModalHeader } from 'react-bootstrap';
import AddModal from './AddModal'
// Import necessary FontAwesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faEye, faTrash, faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleClose = () => {
    setShowEditModal(false);
    setShowViewModal(false);
    setSelectedDatas(null);
  };
  const handleDeleteConfirmation = (row) => {
    setSelectedDatas(row);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/enquirymode/${selectedDatas._id}`);
      getDatas();
      handleClose();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };



  const getDatas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/enquirymode');
      console.log('Responsse from zain:', response.data.enquiryModes);
      // setDatas(response.data.enquiryModes);
      // setFilteredDatas(response.data.enquiryModes);
      console.log(response.data.enquiryModes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (orgId, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3000/enquirymode/${orgId}`, updatedData);
      console.log('Update response:', response.data);
      getDatas(); // Refresh the data after update
    } catch (error) {
      console.error('Error updating data:', error);
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
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "DESCRIPTION",
      selector: (row) => row.desc,
    },
    {
      name: "ACTIONS",
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
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredDatas(result);
  }, [search, datas]);

  return (
    <>
    <div className='table-div'>
      <Datatable className='table-data-div'
        title='Enquiry Mode'
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
              <div ><AddModal/></div>
              <div style={{display:'flex',alignItems:'center',width: '34%', justifyContent:'space-between'}}>
                <div>
                  <div className="search-input-container">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-35 form-control-srch"
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
      />
      </div>

      {/* Modal for Editing */}
      <EditModal showModal={showEditModal} handleClose={handleClose} selectedDatas={selectedDatas} handleUpdate={handleUpdate} />

       {/* Modal for Viewing Details */}
       <ViewModal showModal={showViewModal} handleClose={handleClose} selectedDatas={selectedDatas} />


       {/* Modal for Delete Confirmation */}
       <DeleteModal deleteclose={deleteModalClose} dlt={deleteModal} id={selectedId} getDatas={getDatas} />
    </>
  );
}

export default Table;

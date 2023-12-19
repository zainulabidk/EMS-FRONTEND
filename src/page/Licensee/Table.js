// Table.js
import React, { useState, useEffect } from 'react';
import Datatable from 'react-data-table-component';
import axios from 'axios';
import EditModal from './EditModal';
import ViewModal from './ViewModal';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash, faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import AddModal from './AddModal';
import '../style/table.css';
import { Container } from 'react-bootstrap';
import DeleteModal from './DeleteModal';

function Table() {
  const [datas, setDatas] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDatas, setSelectedDatas] = useState(null);
  const [deleteModal,setDeleteModal] =useState(false);
  const [selectedId, setSelectedId] = useState(null);
 

  const handleClose = () => {
    setShowEditModal(false);
    setShowViewModal(false);
    setShowDeleteModal(false);
    setSelectedDatas(null);
  };

  const handleDeleteConfirmation = (row) => {
    setSelectedDatas(row);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/users/${selectedDatas._id}`);
      getDatas();
      handleClose();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };



  const getDatas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      setDatas(response.data.users);
      setFilteredDatas(response.data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleUpdate = async (Dataid, updatedData) => {
    try {
      await axios.put(`http://localhost:3000/users/${Dataid}`, updatedData);
      getDatas();
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
  const columns = [
    {
      name: "Name",
      selector: (row) => row.fname,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
    },
    {
      name: "User Type",
      selector: (row) => row.userType,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <div>
            <Button style={{ paddingLeft: '0px' }} className='btn btn-1 mx-1' onClick={() => handleEdit(row)}>
              <FontAwesomeIcon icon={faEdit} /> {/* Edit Icon */}
            </Button>
            <Button className='btn btn-2 mx-1' onClick={() => handleViewDetails(row)}>
              <FontAwesomeIcon icon={faEye} /> {/* View Details Icon */}
            </Button>
            <Button className='btn btn-3 ' onClick={() => handleClickDelete(row)}>
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

    const result = datas.filter((lice) => {
      return lice.fname.toLowerCase().includes(search.toLowerCase());
    });
  const licenseeResult = result.filter((user) => user.userType === 'licensee');

  setFilteredDatas(licenseeResult);
}, [search, datas]);
  const totalCount = filteredDatas.length;

  return (
    <>
      <div className='table-div'>
        <Datatable className='table-data-div'
          title='  Licensee'
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
              <div >
                <AddModal  getDatas={getDatas} />
                </div>
              <div style={{display:'flex',alignItems:'center',width: '36%', justifyContent:'space-between'}}>
                <div>
                  <div className="search-input-container">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-35 form-control"
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
      <EditModal showModal={showEditModal} handleClose={handleClose} selectedDatas={selectedDatas} handleUpdate={handleUpdate} data={datas} />

      {/* Modal for Viewing Details */}
      <ViewModal showModal={showViewModal} handleClose={handleClose} selectedDatas={selectedDatas} />

      <DeleteModal deleteclose={deleteModalClose} dlt={deleteModal} id={selectedId} getDatas={getDatas} />
    </>
  );
}

export default Table;

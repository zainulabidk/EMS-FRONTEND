
import React, { useState, useEffect } from 'react';
import Datatable from 'react-data-table-component';
import axios from 'axios';
import EditModal from './EditModal';
import ViewModal from './ViewModal';
import DeleteModal from './DeleteModal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash, faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import AddModal from './AddModal';
import '../style/table.css';


function Table() {
  const [datas, setDatas] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDatas, setSelectedDatas] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedUserRole, setSelectedUserRole] = useState("All"); // Default user role filter option

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
      let url = 'http://localhost:3000/users';

      // If a specific user role is selected, append it to the URL
      if (selectedUserRole !== "All") {
        url += `?userRole=${selectedUserRole}`;
      }

      const response = await axios.get(url);
      setDatas(response.data.users);
      setFilteredDatas(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (countryId, updatedData) => {
    try {
      await axios.put(`http://localhost:3000/users/${countryId}`, updatedData);
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
      name: "NAME",
      selector: (row) => `${row.fname} ${row.lname}`,
      sortable: true,
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
    },
    {
      name: "MOBILE",
      selector: (row) => row.mobile,
    },
    {
      name: "USER ROLE",
      selector: (row) => {
        if (Array.isArray(row)) {
          return row.userRoles.map(userRole => userRole.name).join(', ');
        } else if (row.userRoles && typeof row.userRoles === 'object') {
          return row.userRoles.name;
        } else {
          return 'Unknown Role';
        }
      },
    },
    {
      name: "ACTIONS",
      cell: (row) => (
        <div className={row.isDeleted ? 'deleted-row' : ''}>
          <div></div>
          <Button style={{ paddingLeft: '0px' }} className='btn btn-1 mx-1' onClick={() => handleEdit(row)}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button className='btn btn-2 mx-1' onClick={() => handleViewDetails(row)}>
            <FontAwesomeIcon icon={faEye} />
          </Button>
          <Button className='btn btn-3  mx-1' onClick={() => handleClickDelete(row)}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
      ),
    },
  ];

  // Define a function to conditionally apply styles to the row
  // const conditionalRowStyles = [
  //   {
  //     when: (row) => row.isDeleted === true,      
  //     style: {
  //       backgroundColor: 'red',  
  //       color: 'white',  
  //     },
  //   },
  // ];

  useEffect(() => {
    getDatas();
  }, [selectedUserRole, search]);

  useEffect(() => {
    if (!Array.isArray(datas)) {
      console.error("Datas is not an array!");
      return;
    }

    const result = datas.filter((user) => {
      const fullName = `${user.fname} ${user.lname}`;
      return fullName.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredDatas(result);
  }, [search, datas]);

  const totalCount = filteredDatas.length;

  return (
    <>
      <div className='table-div '>
        <Datatable className='table-data-div '
          title='My Team'
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
              <div><AddModal getDatas={getDatas} /></div>
              <div style={{ display: 'flex', alignItems: 'center', width: '50%', justifyContent: 'space-between' }}>
                <select onChange={(e) => setSelectedUserRole(e.target.value)}>
                  <option value="All">All User Roles</option>
                  <option value="Vendor">Vendor</option>
                  <option value="Accountant">Accountant</option>
                  <option value="Operator">Operator</option>
                </select>
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
          // conditionalRowStyles={conditionalRowStyles} // Apply conditional row styles
        />
      </div>

      {/* Modal for Editing */}
      <EditModal showModal={showEditModal} handleClose={handleClose} selectedDatas={selectedDatas} handleUpdate={handleUpdate} data={datas} />

      {/* Modal for Viewing Details */}
      <ViewModal showModal={showViewModal} handleClose={handleClose} selectedDatas={selectedDatas} />

      {/* Modal for Delete Confirmation */}
      <DeleteModal deleteclose={deleteModalClose} dlt={deleteModal} id={selectedId} getDatas={getDatas} />
    </>
  );
}

export default Table;










import React, { useState, useEffect } from 'react';
import Datatable from 'react-data-table-component';
import axios from 'axios';
import EditModal from './EditModal';
import ViewModal from './ViewModal';
import DeleteModal from './DeleteModal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash, faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import AddModal from './AddModal';
import '../style/table.css';

// Utility function to capitalize the first letter of each word
const capitalizeFirstLetter = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

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
      // console.log('Responsse from zain:', response.data.users);
      setDatas(response.data.users);
      setFilteredDatas(response.data.users);
      console.log(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (countryId, updatedData) => {
    try {
      await axios.put(`http://localhost:3000/users/${countryId}`, updatedData);
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
      name: "NAME",
      selector: (row) => `${row.fname} ${row.lname}`,
      sortable: true,
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
    },
    {
      name: "MOBILE",
      selector: (row) => row.mobile,
    },
    {
      name: "USER ROLE",
      selector: (row) => {
        if (Array.isArray(row.userRoles)) {
          return row.userRoles.map(userRole => userRole.name).join(', ');
        } else if (row.userRoles && typeof row.userRoles === 'object') {
          return row.userRoles.name;
        } else {
          return 'Unknown Role';
        }
      },
    },
    
    {
      name: "ACTIONS",
      cell: (row) => (
        <>
          <div>
            <Button style={{ paddingLeft: '0px' }} className='btn btn-1 mx-1' onClick={() => handleEdit(row)}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button className='btn btn-2 mx-1' onClick={() => handleViewDetails(row)}>
              <FontAwesomeIcon icon={faEye} />
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

    const result = datas.filter((user) => {
      const fullName = `${user.fname} ${user.lname}`;
      return fullName.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredDatas(result);
  }, [search, datas]);

  const totalCount = filteredDatas.length;

  return (
    <>
      <div className='table-div'>
        <Datatable className='table-data-div'
          title='My Team'
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
        />
      </div>

      {/* Modal for Editing */}
      <EditModal showModal={showEditModal} handleClose={handleClose} selectedDatas={selectedDatas} handleUpdate={handleUpdate} data={datas} />

      {/* Modal for Viewing Details */}
      <ViewModal showModal={showViewModal} handleClose={handleClose} selectedDatas={selectedDatas} />

      {/* Modal for Delete Confirmation */}
      <DeleteModal deleteclose={deleteModalClose} dlt={deleteModal} id={selectedId} getDatas={getDatas} />
    </>
  );
}

export default Table;


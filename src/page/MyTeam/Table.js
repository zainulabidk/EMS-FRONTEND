import React, { useState, useEffect } from 'react';
import Datatable from 'react-data-table-component';
import axios from 'axios';
import EditModal from './EditModal';
import ViewModal from './ViewModal';
import DeleteModal from './DeleteModal';
import Button from 'react-bootstrap/Button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  const [selectedDatas, setSelectedDatas] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [roleOptions, setRoleOptions] = useState([]);

  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/userroles');
        const roles = response.data.userRole.map(role => role.name);
        setRoleOptions(['all', ...roles]);
      } catch (error) {
        console.error('Error fetching user roles:', error);
      }
    };

    fetchUserRoles();
  }, []);

  const handleClose = () => {
    setShowEditModal(false);
    setShowViewModal(false);
    setSelectedDatas(null);
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

  const getDatas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      console.log('API Response:', response.data);
      const filteredData = response.data.users.filter(user => user.isDeleted === false || user.isDeleted === undefined);
      console.log('Filtered Data:', filteredData);
      setDatas(filteredData);
      // setFilteredDatas(filteredData);
    } catch (error) {
      console.error(error);
    }
  };



  const handleUpdate = async (countryId, updatedData) => {
    try {
      await axios.put(`http://localhost:3000/users/${countryId}`, updatedData);

      toast.success('Data successfully Updated', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        className: 'toast-message',
      });

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

  const columns = [
    {
      name: "NAME",
      selector: (row) => `${row.fname} ${row.lname}`,
      sortable: true,
      cell: (row) => (
        <div className="capitalize">
          {`${row.fname} ${row.lname}`}
        </div>
      ),
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
      cell: (row) => (
        <div className="capitalize">
          {`${row.userRoles.name}`}
        </div>
      ),
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
      console.error("Datas is not an array!");
      return;
    }
    const result = datas.filter((item) => {
      const fullName = `${item.fname} ${item.lname}`.toLowerCase();
      return fullName.includes(search.toLowerCase());
    });
    
    setFilteredDatas(result);
  }, [search, datas]);


  const FilterDropdown = () => {
    const handleFilterChange = (event) => {
      const selectedValue = event.target.value;
      setSelectedFilter(selectedValue);
    };

    useEffect(() => {
      filterData();
    }, [selectedFilter, datas]);

    const filterData = () => {
      let filteredData = datas;

      if (selectedFilter !== "all") {
        filteredData = filteredData.filter(user => {
          const userRoles = Array.isArray(user.userRoles) ?
            user.userRoles.map(userRole => userRole.name) :
            [user.userRoles.name];

          return userRoles.includes(selectedFilter);
        });
      }

      setFilteredDatas(filteredData);
    };

    return (
      <select
        className='count-div'
        value={selectedFilter}
        onChange={handleFilterChange}
      >
        {roleOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };

  const totalCount = filteredDatas.length;

  return (
    <>
      <ToastContainer autoClose={50000}/>
      <div className='table-div'>
        <Datatable
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
              <div>
                <AddModal getDatas={getDatas} />
              </div>
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
              <div style={{ display: 'flex', alignItems: 'center', width: '25%', justifyContent: 'space-between' }}>
                <div>
                </div>
                <div className='count-div'>
                  <FontAwesomeIcon icon={faFilter} style={{ marginRight: '5px' }} />
                  <span>{' '}Results: {totalCount}</span>
                </div>
                <div>
                  <FilterDropdown datas={datas} setFilteredDatas={setFilteredDatas} roleOptions={roleOptions} />
                </div>
              </div>
            </div>
          }
          subHeaderAlign='right'
        />
      </div>
      <EditModal showModal={showEditModal} handleClose={handleClose} selectedDatas={selectedDatas} handleUpdate={handleUpdate} />
      <ViewModal showModal={showViewModal} handleClose={handleClose} selectedDatas={selectedDatas} />
      <DeleteModal deleteclose={deleteModalClose} dlt={deleteModal} id={selectedId} getDatas={getDatas} />
    </>
  );
}

export default Table;




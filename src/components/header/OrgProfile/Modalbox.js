// // Table.js
// import React, { useState, useEffect } from 'react';
// import Datatable from 'react-data-table-component';
// import axios from 'axios';
// import EditModal from './EditModal';
// import ViewModal from './ViewModal';
// import Button from 'react-bootstrap/Button';
// import '../style/table.css';
// import AddModal from './AddModal'
// // Import necessary FontAwesome components
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faEye, faTrash, faFilter} from '@fortawesome/free-solid-svg-icons';
// import DeleteModal from './DeleteModal';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function Modal() {
//   const [datas, setDatas] = useState([]);
//   const [selectedDatas, setSelectedDatas] = useState(null);


//   const handleClose = () => {
//     setSelectedDatas(null);
//   };

//   const getDatas = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/followUp');
//       setDatas(response.data.followUp);
    
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleUpdate = async (orgId, updatedData) => {
//     try {
//       const response = await axios.put(`http://localhost:3000/followUp/${orgId}`, updatedData);
//       console.log('Update response:', response.data);
//       getDatas(); // Refresh the data after update
//       toast.success('Data updated successfully!');

//     } catch (error) {
//       console.error('Error updating data:', error);
//       toast.error('Error updating data. Please try again.');
//     }
//   };

//   useEffect(() => {
//     getDatas();
//   }, []);


//   return (
//     <>
//     <ToastContainer/>
   
//           <div className='table-top'>
//               <div ><AddModal  getDatas={getDatas} /></div>
              
//           </div>
//          </>
//   );
// }

// export default Modal;

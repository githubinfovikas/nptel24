import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { headers ,url} from '../../common';
const StudentUserDataList = ({ data }) => {

  const handleDelete = async (value) => {
    console.log(value);
    try {
      const res = await axios.delete(`${url}/user/${value}`, {headers});
      console.log(res.data);
        toast.success(res.data.name + " Deleted successfully");

    } catch (err) {
      toast.error("Error while deleting User data");
    }
  }

  const rows = data.map((item, index) => ({
    id: index + 1,
    name: item.name,
    email: item.email,
    mobileNumber: item.mobileNumber,
    registrationNumber: item.registrationNumber,
    _id: item._id
  }));

  const columns = [
    { field: 'name', headerName: 'Studnet Name',flex: 2  },
    { field: 'email', headerName: 'Email',flex: 1  },
    { field: 'mobileNumber', headerName: ' Mobile Number',flex: 1  },
    { field: 'registrationNumber', headerName: 'Registration Number',flex: 1  },
    {
      field: '_id', headerName: 'Action', width: 120 , renderCell: (params) => {
        return (
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold  px-6 py-2 rounded focus:outline-none focus:shadow-outline"
            onClick={(value) => handleDelete(params.value)}
          >
            Delete
          </button>
        );
      }
    },

  ]
  return (
    <div>
      <ToastContainer />
      <div>
        <div style={{ height: 420, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} slots={{ toolbar: GridToolbar }} />
        </div>
      </div>
    </div>
  )
}

export default StudentUserDataList

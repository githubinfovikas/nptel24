import React from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios'
import { headers,url } from '../../common'
const CourseDataList = ({ data }) => {
  console.log(data)
  const handleDelete = async (value) => {
    try {
      const res = await axios.delete(`${url}/course/${value}`, {headers} );
      toast.success(res.data.courseName + " Deleted successfully");
    } catch (err) {
      toast.error("Error while deleting Course data");
    }
  }


  const rows = data.map((item, index) => ({
    id: index + 1,
    courseName: item.courseName,
    week: item.week,
    courseCode: item.courseCode,
    duration: item.duration,
    _id: item._id

  }))

  const columns = [
    { field: 'courseName', headerName: 'Course Name', flex: 2  },
    { field: 'week', headerName: 'Course Week', flex:1 },
    { field: 'courseCode', headerName: 'Course Code', flex: 1  },
    { field: 'duration', headerName: 'Course Duration', flex: 2  },
    {
      field: '_id',
      headerName: 'Action',
      width: 90,
      renderCell: (params) => {
        return (
          <>
            <button
              className="btn btn-danger btn-sm hover:underline hover:text-red-500"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </button>
          </>
        );
      },
    },

  ]
  return (
    <div className='pt-4'>
      <ToastContainer />
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} slots={{ toolbar: GridToolbar }} />
      </div>
    </div>
  )
}

export default CourseDataList

import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {headers,url} from '../common'
const DataShow = ({ data }) => {
    const [updatedRows, setUpdatedRows] = useState([]);
    const  [status, setStatus] = useState("");


    const handleStatusUpdate = async (rowId, status) => {
        console.log("Updating status for row with ID:", rowId, "to", status);
        try {
            await axios.put(`${url}/update/${rowId}`, { status: status },{headers});

        } catch (err) {
            console.log(err);
        }
        const updatedRow = data.find(row => row._id === rowId);
        if (updatedRow) {
            updatedRow.verified = status;
            setUpdatedRows([...updatedRows, updatedRow]);
        }
    };

    const rows = data.map((item, index) => ({
        id: index + 1,
        studentName: item.studentName,
        registrationNumber: item.registrationNumber,
        moocSemester: item.moocSemester,
        certificationId: item.certificationId,
        courseName: item.courseName,
        courseWeek: item.courseWeek,
        markObtained: item.markObtained,
        status: item.status,
        _id: item._id
    }));


    const openPDFPopup = (pdfPath) => {
        const pdfUrl = `${url}/${pdfPath}`;
        window.open(pdfUrl, 'PDF Popup', 'width=800,height=600,resizable=yes');
    };
    

    const columns = [
        { field: 'studentName', headerName: 'Studnet Name',width:150  },
        { field: 'registrationNumber', headerName: 'Registration Number',flex: 1  },
        { field: 'moocSemester', headerName: ' Semester', flex: 1  },
        { field: 'courseName', headerName: 'Course Name', flex: 2  },
        { field: 'courseWeek', headerName: 'Course Week', flex: 1  },
        { field: 'markObtained', headerName: 'Mark Obtained', width:100 , align: 'center' },
        
        {
            field: 'certificationId', 
            headerName: 'Certificate',
            width: 100, 
            renderCell: (params) => {
                return (
                    <div className='hover:underline hover:text-blue-800' onClick={() => openPDFPopup(params.value)} style={{ cursor: 'pointer' }}>Click Here</div>
                );
            }
        },        
        {
            field: 'status', headerName: 'Status', width:165 , renderCell: (params) => {
                return (
                    <>
                        <div className="flex gap-2">
                           

                            <FormControl sx={{ m: 1, minWidth: 150, }}>
                                <Select
                                    value={params.value}
                                    onChange={(e) => handleStatusUpdate(params.row._id, e.target.value)}
                                    onSubmit={(e) => setStatus(e.target.value)}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value={params.value}>
                                        {/* <>{params.value}</> */}
                                    </MenuItem>
                                    <MenuItem value={"Verified"} style={{ color: 'green' }}>Verified</MenuItem>
                                    <MenuItem value={"Pending"} style={{ color: 'orange' }}>Pending</MenuItem>
                                    <MenuItem value={"Rejected"} style={{ color: 'red' }}>Rejected</MenuItem>
                                </Select>
                            </FormControl>

                        </div>
                    </>
                );
            }
        },
    ];

    return (
        <div>
            <div>
                <div style={{ height: 480, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} slots={{ toolbar: GridToolbar }} />
                </div>
            </div>
        </div>
    );
};

export default DataShow;







import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { headers, url, gmail } from '../common';
import { CircularProgress } from '@mui/material';
const Certificate = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${url}/gmail/${gmail()}`, { headers });
            setData(res.data);
            console.log(res.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };


    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`${url}/delete/${id}`, { headers });
            console.log(res.data);
            if (res != null) {
                fetchData();
                toast.success(res.data.courseName + " Deleted successfully");
            }
        } catch (err) {
            toast.error(err.response.data);
            console.log(err);
        }
    }
    return (
        <>
            <ToastContainer />
            {loading ? (
                <div className="flex justify-center items-center pt-20 mt-8">
                    <CircularProgress />
                </div>
            ) : (
                <div className='grid pt-20 lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 gap-7 justify-evenly mb-5 pl-2 lg:pl-24 lg:pr-24'>
                    {data.map((certificate, index) => (
                        <div key={index} className="max-w-sm bg-white border mx-auto border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <embed src={`${url}/${certificate.certificationId}`} type="application/pdf" height={320} width={320} />
                            <div className="p-5 text-start">
                                <div className='text-1xl font-semibold'>{certificate.courseName}</div>
                                <div>Mooc Semester : {certificate.moocSemester}</div>
                                <div>Percentage : {certificate.markObtained}</div>
                                <div>Status : {certificate.status}</div>
                                <div>Academic Credit : {certificate.academicCredit}</div>
                                {
                                    (certificate.status === "Pending" || certificate.status === "Rejected") && (
                                        <div className='flex gap-2 mt-4'>
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-6 rounded focus:outline-none focus:shadow-outline"
                                                type="submit"
                                                onClick={() => { handleDelete(certificate._id) }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Certificate;

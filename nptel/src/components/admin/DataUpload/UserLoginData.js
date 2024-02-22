import React, { useState } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { getToken, url } from '../../common';
const UserLoginData = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    setLoading(true);
    if (!file) {
      setLoading(false);
      setMessage('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${url}/user/dataUpload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': getToken(),
        }
      });
      setLoading(false);
      setFile(null);
      setMessage(response.data);
    } catch (error) {
      setLoading(false);
      setMessage('Error Uploading file');

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-2xl font-semibold flex items-start lg:pl-20 sm:pl-2 pl-2">User Login Data Upload</div>



      <div className="flex flex-col lg:flex-row items-center justify-center lg:gap-8">
        <div className=" flex flex-col items-start">

          <label className=" text-blue-700 text-sm font-bold mb-2">Upload User Login File </label>
          <input
            className="block w-full lg:min-w-[600px] md:min-w-[400px] p-2 text-gray-900 border border-gray-300 rounded-lg cursor-pointer  bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
          />

        </div>

        {loading ? (
          <div className="flex justify-center items-center mt-6 ">
            <CircularProgress />
          </div>
        ) : (
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white mt-6 font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
              onClick={handleUpload}
            >Upload</button>
          </div>
        )}
      </div>
      <div className='flex items-start justify-center pl-2 text-justify text-xs text-gray-400'>NOTE: The headers in the Excel file should be as follows !. =&gt; name, email, branch, mobileNumber, password, userType, destination</div>




      {
        message === "Data uploaded successfully" ? (
          <div className='text-green-700 pt-2 font-sans'>{message}</div>
        ) : (
          <div className='text-red-700 pt-2 font-sans'>{message}</div>
        )
      }



    </div>
  );
};

export default UserLoginData;

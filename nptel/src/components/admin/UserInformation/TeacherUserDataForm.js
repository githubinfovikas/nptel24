import React, { useState } from 'react'
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import TeacherUserDataList from './TeacherUserDataList';
import {headers,url} from '../../common'
const TeacherUserDataForm = () => {

  const [destination, setDestination] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showText, setShowText] = useState('');
  // const handleSubmit = (e) => {
  //   console.log("submitted" , destination)
  //   setLoading(true);
  //   if (destination === "") {
  //     setLoading(false);
  //     setShowText("*** Select field ***");
  //   } else {
  //     try {
  //       const res = axios.post(`${url}/destination`, {
  //         destination
  //       });
  //       console.log(res);
  //       setData(res.data);
  //       if (res.data?.length !== 0) {
  //         setShow(true);
  //       }
  //       if (res.data?.length === 0) {
  //         setShow(false);
  //         setShowText("*** No Data Found ***");
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    setLoading(true);
    
    if (destination === "") {
      setLoading(false);
      setShowText("*** Select field ***");
    } else {
      try {
        const res = await axios.post(`${url}/destination`, {
          destination
        },{headers});
        
        console.log(res.data); // Ensure you are getting the expected response data
        
        setData(res.data);
        
        if (res.data?.length !== 0) {
          setShow(true);
        } else {
          setShow(false);
          setShowText("*** No Data Found ***");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className=" pl-10 pr-10 flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row md:flex-row items-center justify-center md:grid-cols-2 sm:grid-cols-1 lg:gap-20 gap-4 md:gap-6">
        <div >
          <label className=" flex items-start text-blue-700 text-sm font-bold mb-2 min-w-[300px]">
            Destination
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-blue-500 hover:border-blue-400"
            id="branch"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          >
            <option>Select Destination</option>
            <option>faculty</option>
            <option>admin</option>
            <option>student</option>
            

          </select>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold  px-6 py-2 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>

      </div>
      {loading ? (
        <div className="flex justify-center items-center mt-8">
          <CircularProgress />
        </div>
      ) :
        <>
          {!show ? (
            <div className="flex justify-center items-center text-red-500 font-semibold">{showText}</div>

          ) : (
            <TeacherUserDataList data={data} />
          )}
        </>
      }

    </div>
  )
}

export default TeacherUserDataForm;

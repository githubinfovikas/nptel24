import React from 'react'
import CourseDataList from './CourseDataList'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Select from "react-select";
import { CircularProgress } from '@mui/material';
import { headers,url } from '../../common'
const CourseDataForm = () => {
  const [duration, setDuration] = useState([]);
  const [useDuration, setUseDuration] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showText, setShowText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
     
      try {
        const res = await axios.get(`${url}/course/duration`, { headers });
        const durations = res.data.map((duration) => {
          return { label: duration, value: duration };
        });
        setDuration(durations);

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();

  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', useDuration.value);
    setLoading(true);

    if (duration.value === "") {
      setLoading(false);
      setShowText("*** Select field ***");
    } else {
      try {
        const res = await axios.post(`${url}/course/duration/data`,  {
          duration: useDuration.value,
        },{headers });

        console.log(res.data);

        setCourseData(res.data);

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
    <div className="pt-16">

      <div className="flex flex-col lg:flex-row md:flex-row items-center justify-center md:grid-cols-2 sm:grid-cols-1 lg:gap-20 gap-4 md:gap-6">
        <div className="flex flex-col items-start min-w-[300px]">
          <label className="block text-blue-700 text-sm font-bold mb-2 ">
            Select Duration
          </label>
          <Select
            placeholder="Batch..."
            className="shadow appearance-none border rounded w-full p-1 bg-white text-gray-700 leading-tight focus:outline-blue-500 hover:border-blue-400"
            onChange={(e) => setUseDuration(e)}
            options={duration}

          />
        </div>

        <div className=' pt-2 md:pt-10 lg:pt-10'>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-6 py-2 mb-4 rounded focus:outline-none focus:shadow-outline"
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
            <CourseDataList data={courseData} />
          )}
        </>
      }
    </div>
  )
}

export default CourseDataForm

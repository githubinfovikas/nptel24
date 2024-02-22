import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Select from "react-select";
import { CircularProgress } from '@mui/material';
import StudentUserDataList from './StudentUserDataList';
import {headers,url} from '../../common'
const StudentUserDataForm = () => {
  const [data, setData] = useState([]);
  const [allBatch, setAllBatch] = useState([]);
  const [batchFilter, setBatchFilter] = useState(null);
  const [batch, setBatch] = useState("");
  const [branch, setBranch] = useState("")
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showText, setShowText] = useState('');


  useEffect(() => {

    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await axios.get(`${url}/batch`, { headers });
      const batches = res.data.map((batch) => {
        return { label: batch, value: batch };
      });
      setAllBatch(batches);
      console.log(batches);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const val = batchFilter?.value;
    const filteredBatch = allBatch?.find((element) => element.value === val)
    setBatch(filteredBatch?.value);
  }, [batchFilter])


  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log('Form submitted:', { batch, branch });
    setLoading(true);
    if (batch === "" || branch === "") {
      setLoading(false);
      setShowText("*** Select all field ***");
    } else {
      try {
        const res = await axios.post(`${url}/batch/branch/destination`, {
          batch, branch
        },{ headers }
        );
        console.log(res);
        setData(res.data);
        if (res.data.length !== 0) {
          setShow(true);
        }
        if (res.data.length === 0) {
          setShow(false);
          setShowText("*** No Data Found ***");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  }
  return (
    <div className=" pl-10 pr-10 flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row md:flex-row items-center justify-center md:grid-cols-2 sm:grid-cols-1 lg:gap-20 gap-4 md:gap-6">
        <div className="flex flex-col items-start min-w-[300px]">
          <label className="block text-blue-700 text-sm font-bold mb-2">
            Select Batch
          </label>
          <Select
            placeholder="Batch..."
            className="shadow appearance-none border rounded w-full p-1 bg-white text-gray-700 leading-tight focus:outline-blue-500 hover:border-blue-400"
            onChange={setBatchFilter}
            options={allBatch}

          />
        </div>
        <div className=" flex flex-col items-start min-w-[300px]">
          <label className="block text-blue-700 text-sm font-bold mb-2">
            Branch
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-blue-500 hover:border-blue-400"
            id="branch"
            onChange={(e) => setBranch(e.target.value)}
            value={branch}
            required
          >
            <option>Select Branch</option>
            <option>IT</option>
            <option>CE</option>
            <option>ME</option>
            <option>ECE</option>
            <option>LT</option>
            <option>PH</option>
            <option>BMR</option>
          </select>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold  px-6 py-2 mb-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSubmit}
        >
          Submit
        </button>

        {loading ? (
        <div className="flex justify-center items-center mt-8">
          <CircularProgress />
        </div>
      ) :
        <>
          {!show ? (
            <div className="flex justify-center items-center text-red-500 font-semibold">{showText}</div>

          ) : (
            <StudentUserDataList data={data} />
          )}
        </>
      }
      </div>
    </div>
  )
}

export default StudentUserDataForm

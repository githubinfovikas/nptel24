import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Select from "react-select";
import { userType } from "../common"
import DataShow from './DataShow';
import { CircularProgress } from "@mui/material";
// import { getUserAuthToken } from '../common';
import { headers, url } from '../common';
const StudentInformation = () => {
    const [data, setData] = useState([]);
    const [allBatch, setAllBatch] = useState([]);
    const [batchFilter, setBatchFilter] = useState(null);
    const [batch, setBatch] = useState("");
    const [branch, setBranch] = useState("")
    const [moocSemester, setMoocSemester] = useState("")
    const [academicCredit, setAcademicCredit] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [showText, setShowText] = useState("");
    const batches = [];

    useEffect(() => {
        if (moocSemester === "No Semester") {
            setAcademicCredit("No");
        }
        else {
            setAcademicCredit("Yes");
        }
    })
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
        if (userType() === '101' || userType() === '102' || userType() === '103' || userType() === '104' || userType() === '106' || userType() === '107' || userType() === '109' || userType() === '117') {
            setBranch((localStorage.getItem('branch')));
        }
    }

    useEffect(() => {
        const val = batchFilter?.value;
        const filteredBatch = allBatch?.find((element) => element.value === val)
        setBatch(filteredBatch?.value);
    }, [batchFilter])


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', { batch, branch, moocSemester, academicCredit });
        setLoading(true);
        if (batch === "" || branch === "" || moocSemester === "") {
            setLoading(false);
            setShowText("*** Select all field ***");
        } else {
            try {
                const res = await axios.post(`${url}/batch/branch/list`, {
                    batch, branch, moocSemester, academicCredit
                }, { headers, timeout: 300000 })
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
            <div className="flex flex-col lg:flex-row md:flex-row justify-around md:grid-cols-2 sm:grid-cols-1 lg:gap-8 gap-4 md:gap-6">
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
                {userType() === '0' && (
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
                )}
                <div className=" flex flex-col items-start min-w-[300px]">
                    <label className="block text-blue-700 text-sm font-bold mb-2">
                        Select Semester
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-blue-500 hover:border-blue-400"
                        id="branch"
                        onChange={(e) => setMoocSemester(e.target.value)}
                        value={moocSemester}
                        required
                    >
                        <option>Select Semester</option>
                        <option>No Semester</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>8</option>
                        <option>7</option>

                    </select>
                </div>

                {/* <div className=" flex flex-col items-start min-w-[300px]">
                    <label className="block text-blue-700 text-sm font-bold mb-2">
                        Mooc Creadit
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-blue-500 hover:border-blue-400"
                        id="branch"
                        onChange={(e) => setAcademicCredit(e.target.value)}
                        value={academicCredit}
                        required
                    >
                        <option>Select Semester</option>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </div> */}

            </div>

            <div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold  px-6 py-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
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
                        <DataShow data={data} />
                    )}
                </>
            }


        </div>
    )
}

export default StudentInformation

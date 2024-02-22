import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import { gmail, headers,url } from '../common';

const Count = () => {

    const [pending, setPending] = useState(0);
    const [verified, setVerified] = useState(0);
    const [rejected, setRejected] = useState(0);
    useEffect(() => {
        fetchPending()
        featchVerified()
        fetchRejected()
    }, [])
    const fetchPending = async () => {

        try {
            const res = await axios.post(`${url}/certificate/count`, {
                gmail: gmail(),
                status: "Pending",
            }, { headers })
            setPending(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const featchVerified = async () => {

        try {
            const res = await axios.post(`${url}/certificate/count`, {
                gmail: gmail(),
                status: "Verified",
            }, { headers })
            setVerified(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const fetchRejected = async () => {
        try {
            const res = await axios.post(`${url}unt`, {
                gmail: gmail(),
                status: "Rejected",
            }, { headers })
            setRejected(res.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    console.log(pending)

    return (
        <div>
            <div className='grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 gap-7 justify-evenly mb-5 pl-2 lg:pl-24 lg:pr-24'>
                <div className='bg-slate-500 flex flex-row gap-14 items-center justify-evenly p-4 rounded-lg'>
                    <div className='flex flex-col text-justify '>
                        <div className='text-white font-semibold text-1xl'>Uploaded </div>
                        <div className='text-white font-semibold text-1xl'>Certificates </div>
                    </div>
                    <div className='text-white text-3xl flex items-end'>{pending + verified + rejected}</div>
                </div>
                <div className='bg-blue-500 flex flex-row gap-14 items-center justify-evenly p-4 rounded-lg'>
                    <div className='flex flex-col text-justify '>
                        <div className='text-white font-semibold text-1xl'>Verified </div>
                        <div className='text-white font-semibold text-1xl'>Certificates </div>
                    </div>
                    <div className='text-white text-3xl flex items-end'>{verified}</div>
                </div>
                <div className='bg-green-500 flex flex-row gap-14 items-center justify-evenly p-4 rounded-lg'>
                    <div className='flex flex-col text-justify '>
                        <div className='text-white font-semibold text-1xl'>pending </div>
                        <div className='text-white font-semibold text-1xl'>Certificates </div>
                    </div>
                    <div className='text-white text-3xl flex items-end'>{pending}</div>
                </div>
                <div className='bg-red-500 flex flex-row gap-14 items-center justify-evenly p-4 rounded-lg'>
                    <div className='flex flex-col text-justify '>
                        <div className='text-white font-semibold text-1xl'>Rejected </div>
                        <div className='text-white font-semibold text-1xl'>Certificates </div>
                    </div>
                    <div className='text-white text-3xl flex items-end'>{rejected}</div>
                </div>
            </div>
        </div>
    )
}

export default Count

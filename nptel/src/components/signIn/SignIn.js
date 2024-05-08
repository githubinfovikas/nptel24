import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import nptel from '../../images/nptel.png';
import mitLogo from '../../images/mitLogo.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsEyeFill } from "react-icons/bs";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { headers , url } from '../common';
const SignIn = () => {

    const [email, setEmail] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [password, setPassword] = useState('');
    const [branch, setBranch] = useState('');
    const [batch, setBatch] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     const userType = localStorage.getItem('userType');
    //     if (token && userType === '1') {
    //         navigate('/dashboard');
    //     }else if(token && userType === '2'){
    //         navigate('/facultyDashboard');
    //     }
    // })  


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', { email, registrationNumber, password, branch, batch, name, mobileNumber });
        try {
            let response = await fetch(`${url}/signIn`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    email, registrationNumber, password, branch, batch, name, mobileNumber
                })
            })
            const data = await response.json();
            if (response.ok) {
                toast.success("user created successfully")
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Error while submitting form");
            console.error(error);
        }

        if (name && email && registrationNumber && password && branch && batch && mobileNumber) {
            setName('');
            setEmail('');
            setRegistrationNumber('');
            setPassword('');
            setBranch('');
            setBatch('');
            setMobileNumber('');
            setShowPassword('');

        }

    };
    return (
        <div className='lg:pt-10 md:lg:10 lg:10 h-screen p-2'>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-10 mx-auto lg:w-1/3 md:w-1/2 sm:w-full " >
                <ToastContainer />
                <div className="flex justify-center py-8">
                    <img src={mitLogo} alt="NPTEL photo" className="lg:h-20 md:h-18 h-20" />
                </div>
                <div className="mb-4">

                    <input
                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-blue-500 hover:border-blue-400 "
                        placeholder='Full Name'
                        id="name"
                        value={name}
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">

                    <input
                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-blue-500 hover:border-blue-400 "
                        placeholder='Email'
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4 flex flex-col lg:flex-row gap-4">

                    <input
                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-blue-500 hover:border-blue-400"
                        placeholder='Registration Number'
                        id="registrationNumber"
                        type="text"
                        value={registrationNumber}
                        onChange={(e) => setRegistrationNumber(e.target.value)}
                        required
                    />
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
                <div className="mb-4 flex flex-col lg:flex-row gap-4">
                    <input
                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-blue-500 hover:border-blue-400"
                        placeholder='Mobile Number'
                        id="mobileNumber"
                        type="text"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        required
                    />
                    <select
                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-blue-500 hover:border-blue-400"
                        id="batch"
                        value={batch}
                        required
                        onChange={(e) => setBatch(e.target.value)}>

                        <option>Select Batch</option>
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                        <option>2027</option>
                        <option>2028</option>
                        <option>2029</option>
                        <option>2030</option>

                    </select>

                </div>

                <div className="relative">
                    <input
                        className="shadow appearance-none border rounded w-full py-3 px-3 pr-12 text-gray-700 mb-3 leading-tight focus:outline-blue-500 hover:border-blue-400"
                        placeholder='Password'
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 p-3"
                    >
                        {showPassword ? <HiMiniEyeSlash size={20} /> : <BsEyeFill size={20} />}
                    </div>
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Register
                </button>

                <div className='mt-3 '>
                    Already have an account.
                    <Link to='/' className='text-blue-500 ml-2  hover:underline'>Login</Link>
                </div>
                <div className="flex justify-center py-4">
                    <img src={nptel} alt="MIT photo" className="lg:h-20 md:h-18 h-20" />
                </div>
            </form>
        </div>
    )
}

export default SignIn

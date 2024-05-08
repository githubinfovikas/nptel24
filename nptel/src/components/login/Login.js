import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import nptel from '../../images/nptel.png';
import mitLogo from '../../images/mitLogo.png';
import { BsEyeFill } from "react-icons/bs";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { headers } from '../common';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { url } from '../common';
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userType = localStorage.getItem('userType');
        if (token) {
            if (token && userType === '1') {
                navigate('/dashboard');
            } else if (userType === '0' || userType === '2' || userType === '3' || userType === '4') {
                navigate('/facultyDashboard');
            }
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', { email, password });

        try {
            let response = await fetch(`${url}/login`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    email, password
                })
            })
            response = await response.json();
            console.log(response)
            if (response.data) {

                const token = response?.token;
                const userType = response.data?.userType;
                const email = response.data?.email;
                const name = response.data?.name;
                const isLoggedIn = response?.success;
                const registrationNumber = response.data?.registrationNumber;
                const branch = response.data?.branch;
                const batch = response.data?.batch;
                const destination = response.data?.destination;

                if (isLoggedIn) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('userType', userType);
                    localStorage.setItem('email', email);
                    localStorage.setItem('name', name);
                    localStorage.setItem('registrationNumber', registrationNumber);
                    localStorage.setItem('branch', branch);
                    localStorage.setItem('batch', batch);
                    localStorage.setItem('destination', destination);


                    if (userType === "1") {
                        toast.success("Login successful student dashboard");
                        navigate('/dashboard');
                        window.location.reload();
                    }
                    else if (userType === "0" || userType === "101" || userType === "102" || userType === "103" || userType === "104" || userType === "106" || userType === "107" || userType === "109" || userType === "117") {
                        toast.success("Login successful admin dashboard");
                        navigate('/facultyDashboard');
                        window.location.reload();
                    }
                }
            }
            else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error("Invalid credentials");
        }

    };




    return (
        <div className='lg:pt-14 md:pt-12 pt-36 p-6  h-screen'>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-10 mx-auto lg:w-1/3 md:w-1/2 sm:w-full " >
                <ToastContainer />
                <div className="flex justify-center">
                    <img src={mitLogo} alt="NPTEL photo" className="lg:h-36 md:h-32 h-20" />
                </div>
                <div className='py-4 font-semibold hover:text-blue-500 text-1xl'>
                    <p>NPTEL Certificate Management</p>
                </div>
                <div className="mb-4">

                    <input
                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight  focus:outline-blue-500 hover:border-blue-400"
                        placeholder='Email'
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
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
                {/* <Link to="forgot/password" className='flex items-end justify-end mb-6 hover:text-blue-600'>Forgot Password?</Link> */}
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-6 px-20 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Submit
                </button>

                <div className='mt-3 '>
                    Don't have an account?
                    <Link to='/signin' className='text-blue-500 ml-2  hover:underline'>Register</Link>
                </div>
                <div className="flex justify-center py-4">
                    <img src={nptel} alt="MIT photo" className="h-20 md:h-32 lg:h-36" />
                </div>
            </form>
        </div>
    )
}

export default Login;

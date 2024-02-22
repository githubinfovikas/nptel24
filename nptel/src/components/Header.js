// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import nptel from '../images/nptel.png';
// import profile from '../images/proffile photo.png';
// import { name, userType } from '../components/common';

// const Header = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const navigate = useNavigate();

//     const toggleDropdown = () => {
//         setIsOpen(!isOpen);
//     };

//     const logout = () => {
//         localStorage.clear();
//         navigate('/');
//         window.location.reload();
//     };

//     return (
//         <div>
//             <div className='flex  bg-blue-600 fixed h-16 w-full items-center justify-between'>
//                 <div className="flex justify-center py-8 pl-5">
//                     <img src={nptel} alt="NPTEL photo" className="h-10" />
//                 </div>
//                 <div className='flex flex-col'>
//                     <div className=' text-white font-semibold'>
//                         {name()}
//                     </div>
//                 </div>
//                 <div className="flex justify-center py-8 pr-5">
//                     <img src={profile} alt="NPTEL photo" className="h-10 rounded-full" onClick={toggleDropdown} />
//                     {isOpen && (
//                         <div className="dropdown-content absolute right-0 mt-14 text-justify w-48 bg-white rounded-md shadow-lg">
//                             <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white">My Profile</Link>
//                             {userType() === "0" && (
//                                 <div>
//                                     <Link to="/facultyDashboard" className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white">Certificate</Link>
//                                     <Link to="/userData" className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white">User Data</Link>
//                                     <Link to="/course" className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white">Course</Link>
//                                     <Link to="/databaseUpload" className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white">Data Upload</Link>
//                                 </div>
//                             )}
//                             <Link to="/" onClick={logout} className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white">Log out</Link>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>


//     );
// };

// export default Header;



import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import nptel from '../images/nptel.png';
import profile from '../images/proffile photo.png';
import { name, userType, destination } from '../components/common';
import { PiCertificateFill } from "react-icons/pi";
import { IoHome } from "react-icons/io5";
import { RiFileUserFill } from "react-icons/ri";
import { FaBookAtlas } from "react-icons/fa6";
import { FaFileUpload } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { IoReorderThreeOutline } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import Footer from './Footer';





const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [proffileOpen, setProffileOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const location = useLocation();

    const getSubtitle = () => {
        switch (location.pathname) {
            case '/dashboard':
                return 'Student Dashboard ';
            case '/facultyDashboard':
                return 'Certificate View ';
            case '/userData':
                return 'User Data View';
            case '/course':
                return 'Course View';
            case '/databaseUpload':
                return 'Database Data Upload ';
            case '/view/certificate':
                return 'Certificate View';
            default:
                return '';
        }
    };

    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const logout = () => {
        localStorage.clear();
        navigate('/');
        window.location.reload();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="navbar bg-white h-16 w-full fixed top-0 left-0 z-10 shadow-xl">
            <div className="flex items-center justify-between px-5 h-full">

                <div className="flex items-center bg-white" ref={dropdownRef}>

                    <div
                        onClick={toggleDropdown}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        style={{ cursor: 'pointer' }}
                    >
                        <IoReorderThreeOutline className='bg-[#93c5fd] hover:bg-[#1e3a8a] rounded' size={30} color={isHovered ? 'white' : '#1e3a8a'} />
                    </div>
                    {isOpen ? (
                        <div className="md:lg-40 lg:pl-40 text-gray-600 font-bold  ">{getSubtitle()}</div>
                    ) : (
                        <div className="lg:-40 pl-4 text-gray-600 font-bold ">{getSubtitle()}</div>
                    )}

                    {isOpen && (

                        <div className="dropdown-content absolute transition-all duration-500 transform translate-x-0 h-screen top-0 left-0  text-justify w-48 bg-white shadow-lg ">
                            <div className='flex flex-row px-5 pb-4 pt-4 gap-6'>
                                <div className='flex items-center text-justify text-xl font-sans'>Dashboard</div>
                                <div
                                    onClick={toggleDropdown}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <IoCloseSharp size={30} color={isHovered ? '#1e3a8a' : '#93c5fd'} />
                                </div>

                            </div>
                            <div class="border-b-2 border-black-500"></div>

                            {userType() === "1" && (
                                <div className='flex flex-col pt-1  gap-2'>
                                    <Link to="/dashboard" className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"><div className='flex flex-row items-center gap-2'><MdDashboard size={25} /> <div>Dashboard</div></div></Link>
                                </div>
                            )}
                            {userType() === "0" && (
                                <div className='flex flex-col pt-1 gap-2'>
                                    <Link to="/facultyDashboard" className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"><div className='flex flex-row items-center gap-2'><PiCertificateFill size={25} /> <div>Certificate</div></div></Link>
                                    <Link to="/userData" className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"><div className='flex flex-row items-center gap-2'><RiFileUserFill size={25} /> <div>User</div></div></Link>
                                    <Link to="/course" className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"><div className='flex flex-row items-center gap-2'><FaBookAtlas size={25} /> <div>Course</div></div></Link>
                                    <Link to="/databaseUpload" className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"><div className='flex flex-row items-center gap-2'><FaFileUpload size={25} /> <div>Data Upload</div></div></Link>

                                </div>
                            )}
                            <Footer />

                        </div>
                    )}
                </div>
                <div className="flex items-center">
                    <div className='flex flex-col'>

                        <div className=" pr-4  font-semibold">{name()}</div>
                        <div className="pr-4 text-gray-600 hover:underline  tracking-wider text-xs font-semibold">{destination()}</div>
                    </div>

                    <img src={profile} alt="NPTEL photo" className="h-10 rounded-full cursor-pointer" onClick={() => setProffileOpen(!proffileOpen)} />
                    {proffileOpen && (
                        <div className="dropdown-content absolute right-0 top-full mt-2 text-justify w-48 bg-gray-100 rounded-md shadow-lg">
                            <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
                                <div className='flex flex-row items-center gap-2'><IoHome size={25} /> <div>My Profile</div></div>
                            </Link>
                            <Link to="/" onClick={logout} className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"><div className='flex flex-row items-center gap-2'><RiLogoutBoxRFill size={25} /> <div>Log Out</div></div></Link>

                        </div>
                    )}


                </div>
            </div>
        </div>
    );
};

export default NavBar;

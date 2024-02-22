import { useState } from "react";
import React from 'react'
import Count from "./Count";
import { Link } from 'react-router-dom';


const Upload = () => {
 
    return (
        <div>
            <Count />
            <Link to="/view/certificate"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-20 rounded focus:outline-none focus:shadow-outline"
            >
                View Certificate
            </Link>
            <div className='pl-2 lg:pl-20 lg:pr-20 pt-2'>
                <div class="border-b-2 border-red-500 pb-4"></div>
            </div>
           
        </div>
    )
}

export default Upload

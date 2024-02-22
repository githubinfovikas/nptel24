import React from 'react'
import CourseData from './CourseData'
import UserLoginData from './UserLoginData'

const index = () => {
  return (
    <div className='pt-20'>
      <CourseData />
      <div className='pl-2 lg:pl-20 lg:pr-20 pt-4'>
        <div class="border-b-2 border-red-500 pb-4"></div>
      </div>
      <UserLoginData />
      <div className='pl-2 lg:pl-20 lg:pr-20 pt-4'>
        <div class="border-b-2 border-red-500 pb-4"></div>
      </div>

    </div>
  )
}

export default index

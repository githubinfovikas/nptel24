import React from 'react'
import Upload from './Upload'
import Certificate from '../certificate/Certificate'

const index = () => {
    return (
        <div className='pt-20 flex flex-col gap-4'>
            <Upload />
            <Certificate/>
        </div>
    )
}

export default index

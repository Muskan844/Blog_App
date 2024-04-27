import React from 'react'
import Sidebar from '../components/Sidebar'
import SinglePost from '../components/SinglePost'

const Single = () => {
  return (
    <div className='singlePage'>
        <SinglePost/>
        <Sidebar/>
    </div>
  )
}

export default Single
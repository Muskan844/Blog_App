import React from 'react'
import Sidebar from '../components/Sidebar'
const Setting = () => {
  return (
    <>
    <div className='setting'>
        <div className="settingWrapper">
            <div className="settingTitle">
                <div className="settingUpdate">Update your account</div>
                <div className="settingDelete">Delete your account</div>
            </div>
            <form className="settingForm">
                <label>Profile Picture</label>
                 <div className="settingPP">
                    <img src="https://images.unsplash.com/photo-1708804760932-d97756d67419?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D" alt="" className="settingImg" />
                    <label htmlFor="fileInput">
                    <i class=" settingPPIcon far fa-circle-user"></i>
                    </label>
                    <input type="file" className="settingPPInput" id="fileInput" style={{display:"none"}} />
                 </div>
                 <label>Username</label>
                 <input type="text" name="username" placeholder='Muskan' />
                 <label>Email</label>
                 <input type="email" name="email" placeholder='Muskan@gmail.com' />
                 <label>Password</label>
                 <input type="password" name="password" placeholder='password'/>
                 <button className='settingSubmitbtn' type='Submit'>Update</button>
            </form>
        </div>
        <Sidebar/>
    </div>
    
    </>
  )
}

export default Setting
import React, { useContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Context } from "../contextData/Context";
import axios from "axios";

const Setting = () => {
  const { user,dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const PF="https://blog-app-20-hsmc.onrender.com/images/"

  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"});
    const updatedUser = { 
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name; // date.now() is added here to prevent adding different image with same name
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("https://blog-app-20-hsmc.onrender.com/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.put(
        "https://blog-app-20-hsmc.onrender.com/api/user/" + user._id,
        updatedUser
      );
      setSuccess(true);
      dispatch({type:"UPDATE_SUCCESS",payload:res.data});
    } catch (err) {
      console.log(err);
      dispatch({type:"UPDATE_FAILURE"});
    }
  };
  return (
    <>
      <div className="setting">
        <div className="settingWrapper">
          <div className="settingTitle">
            <div className="settingUpdate">Update your account</div>
            <div className="settingDelete">Delete your account</div>
          </div>
          <form className="settingForm" onSubmit={handleUpdate}>
            <label>Profile Picture</label>
            <div className="settingPP">
              <img src={file? URL.createObjectURL(file) : PF + user.profilePic} alt="" className="settingImg" />
              <label htmlFor="fileInput">
                <i class=" settingPPIcon far fa-circle-user"></i>
              </label>
              <input
                type="file"
                className="settingPPInput"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <label>Username</label>
            <input
              type="text"
              name="username"
             
              onChange={(e) => setUsername(e.target.value)}
              placeholder={user.username}
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="settingSubmitbtn" type="Submit">
              Update
            </button>
            {success && <span style={{color:"green", textAlign:"center", marginTop:"15px"}}>Profile has been updated!</span>}
          </form>
        </div>
        <Sidebar />
      </div>
    </>
  );
};

export default Setting;

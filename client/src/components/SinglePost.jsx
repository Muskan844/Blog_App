import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../contextData/Context";

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2].slice(1);
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/"; //PublicFolder
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState("");

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:5000/api/post/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]); //whenever this path changes, fire this useEffect

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:5000/api/post/" + path, {
        data: { username: user.username },
      }); // data given for comparing post.username and user.username
      window.location.replace("/");
    } catch (error) {}
  };
  const handleUpdate = async () => {
    try {
      await axios.put("http://localhost:5000/api/post/" + path, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (error) {}
  };
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img className="singlePostImg" src={PF + post.photo} alt="img" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleEdit"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:{" "}
            <Link to={`/?user=${post.username}`} className="Link">
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            value={desc}
            className="singlePostDescEdit"
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default SinglePost;

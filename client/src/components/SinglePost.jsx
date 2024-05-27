import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2].slice(1);
  const [post, setPost] = useState({});
  const PF= "http://localhost:5000/images/"; //PublicFolder

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:5000/api/post/" + path);
      setPost(res.data);
    };
    getPost();
  }, [path]); //whenever this path changes, fire this useEffect
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && <img
          className="singlePostImg"
          src={PF+ post.photo}
          alt="img"
        />}
        <h1 className="singlePostTitle">
          {post.title}
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt"></i>
          </div>

        </h1>
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author: <Link to={`/?user=${post.username}`} className="Link"><b>{post.username}</b></Link>
          </span>
          <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
        </div> 
        <p className="singlePostDesc">
          {post.desc}
        </p>
      </div>
    </div>
  );
};

export default SinglePost;

import React from "react";
import {NavLink} from "react-router-dom";

const Post = ({ post }) => {
  const PF= "http://localhost:5000/images/"; //PublicFolder
  return (
    <div className="post">
      {post.photo && <img className="postImg" src={PF+post.photo} alt="" />}

      <div className="postInfo">
        <div className="postCategs">
          {
            (post.categories.map = (c) => (
              <span className="postCateg">{c.name}</span>
            ))
          }
        </div>
        <NavLink to={`/post/:${post._id}`} className="Link">
          <span className="postTitle">{post.title}</span>
        </NavLink>

        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <div className="postDesc">{post.desc}</div>
    </div>
  );
};

export default Post;

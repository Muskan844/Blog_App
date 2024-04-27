import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Posts from '../components/Posts'
import Sidebar from '../components/Sidebar'
import axios from "axios"
import { useLocation } from 'react-router-dom'
const Home = () => {
  const [post, setPost] = useState([]);
 const {search} = useLocation();
 
  useEffect(() => {
    const fetchPosts= async()=>{
    
        const res = await axios.get("http://localhost:5000/api/post/"+search);
        console.log(res.data);
        setPost(res.data);      
    };
    fetchPosts();
    
  }, [search]);
  
  return (
    <>
    <Header/>
    <div className='home'>
        <Posts posts={post}/>
        <Sidebar/>
    </div>
    </>
  )
}

export default Home  
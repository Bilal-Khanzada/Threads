import React from 'react';
import UserHeader from '../Components/UserHeader';
import UserPost from '../Components/UserPost';
import { useEffect,useState } from 'react';
import useShowToast from '../Hooks/useShowToast';
import postsAtom from '../Atoms/postsAtom';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import useGetUserProfile from '../Hooks/useGetUserProfile';
import userAtom from '../Atoms/UserAtom';

const UserPage = () => {
  const { username } = useParams();
	const showToast = useShowToast();
	const [posts, setPosts] = useRecoilState(postsAtom);
	const [fetchingPosts, setFetchingPosts] = useState(true);
  const [user,setUser]=useState(null);
	useEffect(()=>{
    const getUser=async()=>{
      try {
        const res=await fetch(`api/users/profile/${username}`);
        const data=await res.json();
        if(data.error){
          showToast("Error",data.error,"error")
          return;
        }
        setUser(data);
        

        
      } catch (error) {
        showToast("Error",error,"error")
      }
    }
    getUser();
  },[username,showToast]);
  if(!user) return null;

  return (
    <>
    <UserHeader user={user}/>
    <UserPost likes={1200} replies={300} postImg="/post1.png" postTitle="Let's talk about threads. "/>
    <UserPost likes={983} replies={156} postImg="/post2.png" postTitle="Let's talk about Facebook. "/>
    <UserPost likes={456} replies={280} postImg="/post3.png" postTitle="Let's talk about Instagram. "/>
    <UserPost likes={1056} replies={280} postTitle="Hello, How your weekend going on guys "/>
    </>
  )
}

export default UserPage
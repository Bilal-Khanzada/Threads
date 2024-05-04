import React,{useState,useEffect} from 'react';
import { Button,Flex, Link } from '@chakra-ui/react';
import useShowToast from "../Hooks/useShowToast"
import { useRecoilState } from 'recoil';
import postsAtom from '../Atoms/postsAtom';
import { Spinner } from '@chakra-ui/react';
import Post from '../Components/Post';
import {useNavigate} from "react-router-dom"
import { IoHome } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";






const Homepage = ({user}) => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const showToast = useShowToast();

	useEffect(() => {
		const getFeedPosts = async () => {
			setLoading(true);
			try {
				const res = await fetch("/api/posts/feed");
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				console.log(data)
				
				setPosts(data);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setLoading(false);
			}
		};
		getFeedPosts();
	}, [showToast, setPosts]);
	const handleClick = () => {
		navigate(`/${user.username}`);
	  };

  return (
	<>
	{!loading && posts.length===0 && <h1>Follow some users to see the feed</h1>}
	{loading &&(
		<Flex justify="center">
			<Spinner size="xl"/>
		</Flex>
	)}
{posts.map((post) => (
					<Post key={post._id} post={post} postedBy={post.postedBy} />
				))}
	<Button onClick={handleClick} position="fixed" top="30px" left="30px" size="small">
	<FaUserAlt />
    </Button>
				
					</>
  )
}

export default Homepage
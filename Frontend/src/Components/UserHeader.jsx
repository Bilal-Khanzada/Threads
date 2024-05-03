import React, { useState } from 'react';
import {Box,VStack,Flex,Text} from "@chakra-ui/layout";
import {Avatar} from "@chakra-ui/avatar";
import { Link } from '@chakra-ui/layout';
import { BsInstagram } from 'react-icons/bs';
import { CgMoreO } from 'react-icons/cg';
import { MenuButton } from '@chakra-ui/react';
import { Menu,Portal,MenuList,MenuItem } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import { Button } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import userAtom from '../Atoms/UserAtom';
import {Link as RouterLink} from "react-router-dom";
import useShowToast from '../Hooks/useShowToast';


const UserHeader = ({user}) => {
    // const currentUser=useRecoilState(userAtom); 
    // console.log(currentUser._id);
    const currentUser = JSON.parse(localStorage.getItem("user-threads"));
    const [following,setFollowing]=useState(user.followers.includes(currentUser._id));
    const showToast=useShowToast();
    const [updating,setUpdating]=useState(false)


    // console.log(user._id)
    const toast = useToast()
    const Copyprofile=()=>{
        const currentUrl=window.location.href;
        navigator.clipboard.writeText(currentUrl).then(()=>{
            toast({
                title: 'Profile link Copied.',
                description: "We've copied the profile link for you.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            }) 
            
        })
    }
    const handleFollowUnfollow=async()=>{
        if (!currentUser) {
			showToast("Error", "Please login to follow", "error");
			return;
		}
		if (updating) return;

		setUpdating(true);
        try{
            const res=await fetch(`api/users/follow/${user._id}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
            });
            const data=await res.json();
            if(data.error){
                showToast("Error",data.error,"error");
                return
            }
            if (following) {
				showToast("Success", `Unfollowed ${user.name}`, "success");
				user.followers.pop(); // simulate removing from followers
			} else {
				showToast("Success", `Followed ${user.name}`, "success");
				user.followers.push(currentUser?._id); // simulate adding to followers
			}

            setFollowing(!following)
            console.log(data)

        }
        catch(error){
            showToast("Error",error.message,"error")
        }
        finally {
			setUpdating(false);
		}
    }
    // console.log(user); 
  return (
    <VStack gap={4} alignItems={"start"}>
        <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
                {user.name}
            </Text>
            <Flex>
                <Text fontSize={"sm"}>{user.username}</Text>
                <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>Threads.net</Text>
            </Flex>
        </Box>
        <Box>
            { user.profilePic &&
                <Avatar name={user.name} src={user.profilePic} size={{base:"md",md:"xl"}}/>
            }
            {!user.profilePic &&
                <Avatar name={user.name} src={`https://bit.ly/broken-link`} size={{base:"md",md:"xl"}}/>
            }
        </Box>
        
        </Flex>
        <Text>{user.bio}</Text>
        {currentUser._id === user._id && (
            <Link as={RouterLink} to='/update'>
                <Button size={"sm"}>Update Profile</Button>
            </Link>
        )}
        {currentUser._id !== user._id && (
                <Button onClick={handleFollowUnfollow} isLoading={updating} size={"sm"}>{following? "Unfollow":"Follow"}</Button>
        
        )}
        <Flex w={"full"} justifyContent={'space-between'}>
            <Flex gap={2} alignItems={"center"}>
                <Text color={"gray.light"}>{user.followers.length} Followers</Text>
                <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"}></Box>
                <Link color={"gray.light"}>instagram.com</Link>
            </Flex>
            <Flex>
                <Box className="icon-container">
                    <BsInstagram size={24} cursor={"pointer"}/>
                </Box>
                <Box className="icon-container">
                    <Menu >
                 <MenuButton>
                    <CgMoreO size={24} cursor={"pointer"} bg={"gray.dark"}/>
                 </MenuButton>
                 <Portal>
    <MenuList bg={"gray.dark"}>
      <MenuItem onClick={Copyprofile}>Copy to clipboard</MenuItem>
    </MenuList>
  </Portal>

                    </Menu>
                </Box>
            </Flex>
        </Flex>
            <Flex w={"full"}>
                <Flex flex={1} pb="3" borderBottom={"1.5px solid white"} justifyContent={"center"} cursor={"pointer"} >
                    <Text>Threads</Text>
                </Flex>
                <Flex flex={1}  pb="3" borderBottom={"1px solid gray"} justifyContent={"center"} cursor={"pointer"} color={"gray.light"}>
                    <Text>Replies</Text>
                </Flex>

            </Flex>
    </VStack>
  )
}

export default UserHeader
import { Avatar, Flex } from '@chakra-ui/react'
import React from 'react';
import { Text } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import { Box } from '@chakra-ui/react';
import Actions from '../Components/Actions';
import { useState } from 'react';
import { Divider } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import Comment from '../Components/Comment';

const PostPage = () => {
  const [liked,setLiked]=useState(false)
  return (
    <>
    <Flex>
      <Flex w={"full"} alignItems={"center"} gap={3}>
        <Avatar src='/zuck-avatar.png' size={"md"} name='Mark Zuckerberg'/>
        <Flex>
          <Text fontSize={"sm"} fontWeight={"bold"}>
           markzuckerberg
          </Text>
          <Image src='/verified.png' w="4" h={4} ml={4}/ >
        </Flex>
      </Flex>
      <Flex gap={4} alignItems={"center"}>
        <Text fontSize={"sm"} color={"gray.light"}>Id</Text>
        <BsThreeDots/>
    </Flex>
    </Flex>
    <Text my={3}>Lets talk about Threads.</Text>
    <Box borderRadius={"6"} overflow={"hidden"} border={"1px solid "} borderColor={"gray.light"}>
     <Image src="/post1.png" w={"full"}/>
    </Box>
    <Flex gap={3} my={3}>
      <Actions liked={liked} setLiked={setLiked}/>
      </Flex>
    <Flex gap={2} alignItems={"center"} >
      <Text color={"gray.light"} fontSize={"sm"}>238 replies</Text>
      <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"} ></Box>
      <Text color={"gray.light"} fontSize={"sm"}>
        {200+(liked? 1:0 )} likes
      </Text>
      </Flex>
      <Divider my={4}/>
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>
            hey
          </Text>
          <Text>Get the app to like,reply and post.</Text>
          <Button>Get</Button>
        </Flex>
      </Flex>
      <Divider my={4}/>
      <Comment comment="looks really good!" createdAt="2d" likes={100} username="johndoe" useAvatar="https://bit.ly/dan-abramov"/>
      <Comment comment="Fab!" createdAt="1d" likes={30} username="pope" useAvatar="https://bit.ly/dan-abramov"/>
      <Comment comment="Awesome" createdAt="5d" likes={500} username="johnson" useAvatar="https://bit.ly/dan-abramov"/>
    </>
  )
}

export default PostPage
import React from 'react';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast,
    Show,
  } from '@chakra-ui/react'
  import { useState } from 'react'
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useSetRecoilState } from 'recoil';
import authScreenAtom from '../Atoms/authAtom';
import { CgPassword } from 'react-icons/cg';
import useShowToast from '../Hooks/useShowToast';
import userAtom from '../Atoms/UserAtom';
  
  
const LoginCard = () => {
    const Toast=useToast();
    const showToast=useShowToast();
    const setUser=useSetRecoilState(userAtom);
    const [inputs,setinputs]=useState({
        username:"",
        password: ""
    })
   
    const handleLogin=async()=>{
        try {
            const res=await fetch("/api/users/login",{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(inputs)
            });
            const data=await res.json();
            if(data.error){
                Toast({
                    title:"error",
                    description:data.error,
                    status: "error",
                    duration:3000,
                    isClosable:true
                })
                return;
            }
            localStorage.setItem("user-threads",JSON.stringify(data));
            setUser(data);
            
        } catch (error) {
            showToast("Error",error,"error")
        }
    }
    const [showPassword, setShowPassword] = useState(false)
    const setAuthScreenState=useSetRecoilState(authScreenAtom)
  return (
    <Flex 
    align={'center'}
    justify={'center'}>
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'} textAlign={'center'}>
          Login
        </Heading>
        
      </Stack>
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.dark')}
        boxShadow={'lg'}
        p={8}
        w={{
            base:"full",
            sm:"400px"
        }}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input type="text" value={inputs.username} onChange={(e)=> setinputs((inputs)=>({...inputs, username:e.target.value}))} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input type={showPassword ? 'text' : 'password'} value={inputs.password} onChange={(e)=>setinputs((inputs)=>({...inputs,password: e.target.value}))}  />
              <InputRightElement h={'full'}>
                <Button
                  variant={'ghost'}
                  
                  
                  onClick={() => setShowPassword((showPassword) => !showPassword)}>
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={10} pt={2}>
            <Button
              loadingText="Submitting"
              size="lg"
              bg={useColorModeValue("gray.600","gray.700")}
              color={'white'}
              onClick={handleLogin}
              _hover={{
                bg: useColorModeValue("gray.700","gray.800"),
              }}>
              Login
            </Button>
          </Stack>
          <Stack pt={6}>
            <Text align={'center'}>
              Dont have an Account?<Link onClick={()=>setAuthScreenState("signup")} color={'blue.400'}>Sign up</Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Flex>
  )
}

export default LoginCard
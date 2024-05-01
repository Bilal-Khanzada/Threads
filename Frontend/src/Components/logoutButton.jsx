import React from 'react';
import { Button } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import userAtom from '../Atoms/UserAtom';
import useShowToast from '../Hooks/useShowToast';
import { HiOutlineLogin } from "react-icons/hi";



const LogoutButton = () => {
    const setUser=useSetRecoilState(userAtom);
    const ShowToast=useShowToast();
    const handleLogout=async()=>{
        try{
            localStorage.removeItem("user-threads");
            const res= await fetch("/api/users/logout",{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                }
            })
            const data=await res.json();
            console.log(data);
            if(data.error){
                ShowToast("Error",data.error,"error")
            }
            setUser(null);

        }
        catch(error){
            console.log(error)
        }
    }
  return (
   
   <Button position={"fixed"} top={"30px"} right={"30px"} size={"sm"} onClick={handleLogout}>
   <HiOutlineLogin size={"20px"} />
   </Button>
   
  )
}

export default LogoutButton
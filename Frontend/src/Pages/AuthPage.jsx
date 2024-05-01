import React from 'react'
import SignupCard from '../Components/SignupCard'
import LoginCard from '../Components/LoginCard'
import authScreenAtom from '../Atoms/authAtom'
import { useRecoilValue } from 'recoil'

const AuthPage = () => {
    const authScreenState=useRecoilValue(authScreenAtom);
    console.log(authScreenState);
  return (
    <>
   {authScreenState==="login" ? <LoginCard/>:<SignupCard/>}
    {/* <SignupCard/> */}
    </>
  )
}

export default AuthPage
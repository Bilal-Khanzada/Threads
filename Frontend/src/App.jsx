import {Button} from "@chakra-ui/button";
import {Container} from "@chakra-ui/react";
import {Navigate, Route,Routes} from "react-router-dom";
import PostPage from "./Pages/PostPage";
import UserPage from "./Pages/UserPage";
import Header from "./Components/Header";
import Homepage from "./Pages/Homepage";
import AuthPage from "./Pages/AuthPage";
import { useRecoilValue } from "recoil";
import useratom from "./Atoms/UserAtom";
import LogoutButton from "./Components/logoutButton";
import UpdateProfilepage from "./Pages/UpdateProfilepage";
function App() {
  const user=useRecoilValue(useratom);
  console.log(user);
  return (
    <>
    <Container>
      <Header/>
      <Routes>
        <Route path="/" element={user? <Homepage/>: <Navigate to="/auth"/>}/>
        <Route path="/auth" element={!user? <AuthPage/>: <Navigate to ="/"/>}/>
        <Route path="/update" element={user? <UpdateProfilepage/> : <Navigate to="/auth"/>}/>

        <Route path="/:username" element={<UserPage/>}/>
        <Route path="/:username/post/:pid" element={<PostPage/>}/>
      </Routes>
      {user && <LogoutButton/>}
    
    </Container>
    </>
  )
}

export default App

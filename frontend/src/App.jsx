import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { Auth } from "./Context";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
function App() {
  const { setCurrentUser } = Auth();
  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get("/api/v1/users/get-user-profile");
        setCurrentUser(data);
      } catch (error) {
        if(error.response.status == 403){
          return navigate('/login');
        }
        // toast.error(error.response.data);
        console.log("Error : " + error);
      }
    };
    getUser();
  }, [setCurrentUser]);
  return (
    <div style={{ maxWidth: "1112px", marginBlock: "auto" }}>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;

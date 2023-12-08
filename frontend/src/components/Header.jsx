import React from "react";
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
  crossorigin="anonymous"
/>;
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Auth } from "../Context";
import toast from "react-hot-toast";
import axios from "axios";
function Header() {
  const { currentUser, setCurrentUser } = Auth();
  const handleLogout = async ()=>{
    try {
      const {data} = await axios.post('/api/v1/users/logout');
      toast.success("Logout successfully");
      setCurrentUser(null);
      console.log(data);
    } catch (error) {
      toast.error(error.response.data);
      console.log("Error logout from  frontend : " + error);
    }
    setCurrentUser(null);
  }
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/">Logo</Link>
          </Navbar.Brand>
          <Nav className="me-auto ">
            {currentUser ? (
              <>
                <Nav.Link>
                  <Link to="/create-post">Create post</Link>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link>
                  <Link to="/login">Login</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/signup">Signup</Link>
                </Nav.Link>
              </>
            )}
          </Nav>
          {currentUser && (
            <>
              {" "}
              <h1 style={{ backgroundColor: "red", color: "white" }}>
                Hi {currentUser.username}
              </h1>
              <button className="mx-4" onClick={handleLogout} type="submit">Logout</button>
            </>
          )}
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;

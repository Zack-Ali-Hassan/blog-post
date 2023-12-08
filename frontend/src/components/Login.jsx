import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Auth } from "../Context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser, setCurrentUser } = Auth();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/users/login-user", {
        username,
        password,
      });
      toast.success('Successfully login...')
      setCurrentUser(data);
      navigate("/create-post");
    } catch (error) {
      toast.error(error.response.data);
      console.log("Error are: " + error);
    }
  };
  return (
    <div className="mt-3 mx-3 ">
      <h4>Login User</h4>
      <Form className="mt-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            id="username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Button variant="secondary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;

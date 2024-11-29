import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, FloatingLabel, Alert } from "react-bootstrap";
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  let navigate = useNavigate("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("auth/login",
        {
          username,
          password
        },
        {
          withCredentials: true
        }
      );
      const { message, token } = data;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("isAuth", true);
      setIsAuth(true);
      console.log(token);
      console.log(message);
      navigate("/virtual/cards");
    } catch (error) {
      setErrMsg(error.message);
    }
  }
  return (
    <Form>
      <hw>Login</hw>
      <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
        <Form.Control type="username" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </FloatingLabel>
      <br />
      {errMsg !== "" && <Alert variant="danger" dismissible>{errMsg}</Alert>}
      <Button variant="outline-primary" type="submit" onClick={handleLogin}>
        Submit
      </Button>
    </Form>
  )
}

export default Login;
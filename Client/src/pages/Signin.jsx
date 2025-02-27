import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../ContextAPI/ContextProvider";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";

import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Signin = () => {
  const { username, setUsername, setIsLogged } = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  // for password
  const [showPassword, setShowPassword] = useState(false);

  // run this effect for auto filling login form , if user has first logged in
  useEffect(() => {
    const LoggedUser = localStorage.getItem("Logincredentials");
    function autoFill() {
      const userLogin = JSON.parse(LoggedUser);
      setForm({
        username: userLogin.username,
        password: userLogin.password,
      });
    }
    if (LoggedUser) {
      autoFill();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result;
    try {
      result = await axios.post("http://localhost:3000/auth/login", form);
      // store token in local storage
      localStorage.setItem("token", result.data.token);
      const user = JSON.parse(atob(result.data.token.split(".")[1]));
      console.log(user);
      // store user login data in context api
      setUsername(user.username);
      setIsLogged(true);
      console.log(result.data)

      if (result.status === 200) {
        // after first login , store credentials in localstorage for auto filling login details
        const LoggedUser = localStorage.getItem("Logincredentials");
        if (!LoggedUser) {
          localStorage.setItem("Logincredentials", JSON.stringify(form));
        }
        //  if login successful, redirect to home page
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.error);
      console.log("error", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            // toggle show and hide password
            InputProps={{
              endAdornment: (
                <Button onClick={handleTogglePassword} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </Button>
              ),
            }}
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
        </form>
        {error ? (
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        ) : null}
      </Box>
      <Typography
        variant="h6"
        color="error"
        sx={{ marginTop: "1em", textAlign: "center" }}
      >
        Don't have an account ? <Link to={"/signup"}>Create Account</Link>
      </Typography>
    </Container>
  );
};

export default Signin;

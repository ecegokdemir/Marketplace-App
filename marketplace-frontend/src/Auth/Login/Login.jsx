import './login.css'
import { Avatar, Button, Checkbox, CssBaseline, FormControlLabel, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { MdLockOutline } from 'react-icons/md'
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

import CopyRight from '../../Components/CopyRight/CopyRight'



const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [showPassword, setShowPassword] = useState(false);

  const url = `http://localhost:8080/api/v1/login?username=${(credentials.username)}&password=${(credentials.password)}`;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate()

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    let auth = localStorage.getItem('userInfo');
    if (auth) {
      navigate("/")
    }
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!credentials.username && !credentials.password) {
        toast.error("All fields are required", { autoClose: 500, theme: 'colored' })
      }
      else if (credentials.username.length < 3) {
        toast.error("Please enter valid username", { autoClose: 500, theme: 'colored' })
      }
      else if (credentials.password.length < 3) {
        toast.error("Please enter valid password", { autoClose: 500, theme: 'colored' })
      }
      else if (credentials.username && credentials.password) {
        const sendAuth = await axios.post(url, null, { withCredentials: true })
  
        if (sendAuth.status === 200) {
          const role = await axios.get("http://localhost:8080/api/v1/users/role", { withCredentials: true })
         
          const userInfo = role.data.payload
          
          if(userInfo == ("ADMIN")){
            localStorage.setItem('isAdmin', true)
            navigate('/admin/home')
          }else{
            localStorage.setItem('isAdmin', false)
            navigate('/product')
          }
          toast.success("Login Successfully", { autoClose: 500, theme: 'colored' })
          localStorage.setItem('userInfo', userInfo)

        }
        else{
          console.log("sendAuth", sendAuth)
          toast.error("Something went wrong, Please try again", { autoClose: 500, theme: 'colored' })
          navigate('/')
        }
      }
    }
    catch (error) {
      error.response.data.error.length === 1 ?
        toast.error(error.response.data.error[0].msg, { autoClose: 500, theme: 'colored' })
        : toast.error(error.response.data.error, { autoClose: 500, theme: 'colored' })
    }

  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
          <MdLockOutline />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            value={credentials.username}
            name='username'
            onChange={handleOnChange}
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={credentials.password}
            name='password'
            onChange={handleOnChange}
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" onClick={handleClickShowPassword} sx={{cursor:'pointer'}}>
                  {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
                </InputAdornment>
              )
            }}
            autoComplete="current-password"

          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      <CopyRight sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}

export default Login
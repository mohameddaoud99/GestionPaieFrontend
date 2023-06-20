import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import {   useNavigate } from 'react-router-dom'

const theme = createTheme();

export default function Login() {

  const navigate = useNavigate();
  const[Cin,setCin]=useState('');


  const handleSubmit = (event) => {
  

    event.preventDefault();

    const config = ({
      "Access-Control-Allow-Origin" : "*" ,
    })
    axios.get("https://localhost:44367/api/Personnel/GetEmployee?CIN="+Cin,config).then(
      (res)=>{
        if(res.data!==""){
          console.log(res.data)
          localStorage.setItem('MATREmployee',res.data.MATR ) ;
          localStorage.setItem('NOMPRENOM1Employee',res.data.NOMPRENOM1 ) ;
          navigate('/dashboard-employee/home', {replace: true});
         setCin("")
          }else{
            alert("verifier les champs")
          }
          
        });

    
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://www.orbcomm.com/img/login/login-hero.jpg?fbclid=IwAR3qoxctC3_YCQsbIFF_jH-4pgr1e8lGdgTI3Ms9Cbel0CMb04ChJ9QkhvE)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Connexion
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="Cin"
                label="Mot de passe"
                name="Cin"
                autoComplete="Cin"
                autoFocus
                value={Cin} onChange={e=>setCin(e.target.value)}
              />
 
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Connexion
              </Button>
            
              
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {  ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://www.logicom-dev.com.tn/accueil.php?idm=1">
        Logicom Entreprise
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// const theme = createTheme();



export default function SignUp() {


  const navigate = useNavigate();
  const[Compteuser,setCompteuser]=useState('');
  const[MotDePasse,setMotDePasse]=useState('');

  const handleSubmit = (event) => {
  

    event.preventDefault();
    const produitObject = {
      
        compteuser: Compteuser,
        MotDePasse: MotDePasse
       };

    const config = ({
      "Access-Control-Allow-Origin" : "*" ,
    })
    axios.post("https://localhost:44367/api/Login/LoginAdmin",produitObject,config).then(
      (res)=>{
        if(res.data.status===200){
          console.log(res.data.AdminDetails);
          console.log(res.data.AdminDetails.compteuser);
          window.localStorage.setItem('CompteUser',res.data.AdminDetails.compteuser ) 
          window.localStorage.setItem('MotDePasse',res.data.AdminDetails.motdepasse ) 
          window.localStorage.setItem('DERSOC',res.data.AdminDetails.DERSOC ) 
          navigate('/ChoixSociete', {replace: true});
          }else{
            alert("verifier les champs")
          }   
        });
  };

  const error = { color: "red" }

  return (
    <ThemeProvider  style={{backgroundColor:"red"}}>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />




        <Card sx={{ marginTop: 8, maxWidth: 345 }} >

          <CardContent>
            <Box
              sx={{
                marginTop: 8,
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
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>


                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Code"
                      name="email"
                      autoComplete="email"
                      value={Compteuser} onChange={e => setCompteuser(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Mot de passe"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={MotDePasse} onChange={e => setMotDePasse(e.target.value)}

                    />
                  </Grid>

                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Connexion
                </Button>
                {Error && <div style={error} >{Error}</div>}
              </Box>
            </Box>
          </CardContent>

        </Card>



        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
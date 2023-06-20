
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
  Card,

  
  Typography
  
} from '@mui/material';
import {  Button,  
  CardContent } from '@mui/material';
import axios from 'axios';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik } from "formik";

import * as Yup from "yup";
 import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import DialogActions from '@mui/material/DialogActions';
import * as React from 'react';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

// Alert function
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



function AjouterEmployee() {
 
 
  const navigate = useNavigate();

  
 
  const [ListEmployee, setListEmployee] = useState([]);
  const [openAdd, setOpenAdd] = React.useState(false);
  const handleCloseAdd = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpenAdd(false);
  };
  
  
  const [setOpenA] = React.useState(false);
  const handleCloseA = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenA(false);
  };


  const formik = useFormik({
    initialValues: {
      CIN: "",
      email:"",
    
      ADRESSE: "",
      TELEPHONE: "",
      
      NOMPRENOM1:"",
      NAIS:"",
      SEXE: "",
    
      BANQUEPER:"",
      numcompte:"",
      PAYEMENT:"",
      SALB:"",
      TXCNSS:"",
      nbmois:"",
      acceptTerms: true,
    },
    validationSchema: Yup.object().shape({
     

       
      email: Yup.string()
      .required("email is required"),

        CIN: Yup.string()
        .required("CIN is required")
        .min(8, "CIN must be at least 6 characters"),
        
        NAIS: Yup.string()
        .required("DATE NAISSANCE is required"),
      

        TELEPHONE: Yup.string().min(8, 'TELEPHONE must be at least 8 characters').required('TELEPHONE is required'),
      
        ADRESSE: Yup.string().required('ADRESSE est obligatoire'),
      
        NOMPRENOM1: Yup.string().min(6, 'Password must be at least 8 characters').required('Password is required'),

        BANQUEPER: Yup.string()
        .required("BANQUEPER est obligatoire"),
       
        
        numcompte: Yup.string()
        .required("numéro de compte est obligatoire")
        .min(20, "numéro de compte must be at least 6 characters"),
      
        PAYEMENT: Yup.string()
        .required("PAYEMENT de compte est obligatoire"),

        SALB: Yup.string()
        .required("SALAIRE est obligatoire"),

        TXCNSS: Yup.string()
        .required("TAXE CNSS est obligatoire"),
         
        nbmois: Yup.string()
        .required("nbmois de compte is required"),
      


      acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
    }),
    
    onSubmit: () => {
    
      const config = ({
        "Access-Control-Allow-Origin": "*",
      })
  
      const produitObject = {
        
        NOMPRENOM1: formik.values.NOMPRENOM1,
        CIN: formik.values.CIN,
        email:formik.values.email,
        TELEPHONE: formik.values.TELEPHONE,
        ADRESSE: formik.values.ADRESSE,
        NAIS:formik.values.NAIS,
        SEXE:formik.values.SEXE,
       
        BANQUEPER:formik.values.BANQUEPER,
        numcompte:formik.values.numcompte,
        PAYEMENT:formik.values.PAYEMENT,
        SALB:formik.values.SALB,
        TXCNSS:formik.values.TXCNSS,
        nbmois:formik.values.nbmois,
      };

      const Postuserpaie = {
        
        motdepasse: formik.values.CIN,
        DERSOC: localStorage.getItem('CODSOC'),
 
       

      };


      axios.post("https://localhost:44367/api/Personnel", produitObject, config).then(
        (res) => {
  
          console.log(res.data)
          localStorage.setItem('MATREmplyee', res.data.MATR);
          setListEmployee([...ListEmployee, res.data]);

          setActiveStep(activeStep + 1);
        });
       
        setActiveStep(activeStep + 1);
        setOpenAdd(true)
        console.log(produitObject);



        axios.post("https://localhost:44367/api/Personnel/Postuserpaie?email="+formik.values.email, Postuserpaie, config).then(
          (res) => {
    
            console.log(res.data)
            localStorage.setItem('compteuserEmplyee', res.data.motdepasse);
            setListEmployee([...ListEmployee, res.data]);
  
            setActiveStep(activeStep + 1);
          });
       
          
    },
    
  });

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (formik.values.ADRESSE!==""&&formik.values.CIN!==""&&formik.values.TELEPHONE!=="") { // Check if form is valid before proceeding to next step
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const Nouveauformulaire = () =>{
    setActiveStep(0);
    formik.resetForm();
  }

    
 const handleClickOpenMUP = (e, val) => {
   
  let {  CIN,  ADRESSE, TELEPHONE, NOMPRENOM1 ,NAIS,SEXE, BANQUEPER,numcompte,PAYEMENT,nbmois,motdepasse,email,SALB,TXCNSS} = val;

  localStorage.setItem('CINEmplyee', CIN);
  localStorage.setItem('emailEmplyee', email);

  localStorage.setItem('ADRESSEEmplyee', ADRESSE);
  localStorage.setItem('TELEPHONEEmplyee', TELEPHONE);
 
  localStorage.setItem('NOMPRENOM1Emplyee', NOMPRENOM1);
  localStorage.setItem('NAISEmplyee', NAIS.substring(0, 10));
  localStorage.setItem('SEXEEmplyee', SEXE);
   
  localStorage.setItem('BANQUEPEREmplyee', BANQUEPER);
 
  localStorage.setItem('numcompteEmplyee', numcompte);
  localStorage.setItem('PAYEMENTEREmplyee', PAYEMENT);
  localStorage.setItem('SALB', SALB);
  localStorage.setItem('TXCNSS', TXCNSS);
  localStorage.setItem('nbmoisEmplyee', nbmois);
  localStorage.setItem('motdepasseEmplyee', motdepasse);
  
 
  navigate('/Employee/ModifierEmployee', {replace: true});
};

  return (
    <>
     
      <PageTitleWrapper>
      <Typography variant="h5" component="h5" gutterBottom>
      Ajouter  employé 
        </Typography>
       
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          
          <Grid item xs={12}>
          <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step>
          <StepLabel>Étape 1</StepLabel>
        </Step>
        <Step>
          <StepLabel>Étape 2</StepLabel>
        </Step>
        <Step>
          <StepLabel>Étape 3</StepLabel>
        </Step>
      </Stepper>
      {activeStep === 0 && (
        
        <form onSubmit={formik.handleSubmit}>

          <Card>
                      
                        
                      <CardContent>
                      
                      <Box

                        sx={{

                          display: 'grid',
                          columnGap: 3,
                          rowGap: 3,
                          gridTemplateColumns: 'repeat(2, 1fr)',
                        }}
                      >
                    
                    <TextField
                      id="outlined-number"
                    name="CIN"
                    label="CIN"
                    variant="outlined"
                    margin="normal"
                    onBlur={formik.handleBlur}
                    value={formik.values.CIN}
                    onChange={formik.handleChange}
                    error={formik.touched.CIN && Boolean(formik.errors.CIN)}
                    helperText={formik.touched.CIN && formik.errors.CIN}
                  />
<TextField
            id="outlined-number"
          name="NOMPRENOM1"
          label="Nom et prenom"
          onBlur={formik.handleBlur}
          variant="outlined"
          margin="normal"
          value={formik.values.NOMPRENOM1}
          onChange={formik.handleChange}
          error={formik.touched.NOMPRENOM1 && Boolean(formik.errors.NOMPRENOM1)}
          helperText={formik.touched.NOMPRENOM1 && formik.errors.NOMPRENOM1}
        />


<TextField
            id="outlined-number"
          name="NAIS"
          onBlur={formik.handleBlur}
          variant="outlined"
          margin="normal"
          type="date"
          value={formik.values.NAIS}
          onChange={formik.handleChange}
          error={formik.touched.NAIS && Boolean(formik.errors.NAIS)}
          helperText={formik.touched.NAIS && formik.errors.NAIS}
        />

          <TextField
                      id="outlined-number"
                    name="ADRESSE"
                    label="Adresse"
                    variant="outlined"
                    margin="normal"
                    onBlur={formik.handleBlur}
                    value={formik.values.ADRESSE}
                    onChange={formik.handleChange}
                    error={formik.touched.ADRESSE && Boolean(formik.errors.ADRESSE)}
                    helperText={formik.touched.ADRESSE && formik.errors.ADRESSE}
                  
                  />
            
            <TextField
                      id="outlined-number"
                    name="TELEPHONE"
                    label="Telephone"
                    variant="outlined"
                    onBlur={formik.handleBlur}
                    margin="normal"
                    value={formik.values.TELEPHONE}
                    onChange={formik.handleChange}
                    error={formik.touched.TELEPHONE && Boolean(formik.errors.TELEPHONE)}
                    helperText={formik.touched.TELEPHONE && formik.errors.TELEPHONE}
                  />

<TextField
                      id="outlined-number"
                    name="email"
                    label="Email"
                    variant="outlined"
                    onBlur={formik.handleBlur}
                    margin="normal"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />

<TextField
          id="outlined-select"
          name="SEXE"
          label="Sexe"
          variant="outlined"
          margin="normal"
          select
          value={formik.values.SEXE}
          onChange={formik.handleChange}
          error={formik.touched.SEXE && Boolean(formik.errors.SEXE)}
          helperText={formik.touched.SEXE && formik.errors.SEXE}
        >
          <MenuItem value="M">Male</MenuItem>
          <MenuItem value="F">Female</MenuItem>
        
        </TextField>
          
                      </Box>
                      <DialogActions>
                  

                      <Button type="submit" variant="contained" color="primary" onClick={handleNext}>
                      Suivant
                    </Button>
            
              </DialogActions>
                    

                      </CardContent>
          </Card>



        </form>
      )}
      {activeStep === 1 && (

        
        <form onSubmit={formik.handleSubmit}>
         
         <Card>
                      
                        
                      <CardContent>
                   
                      <Box

                        sx={{

                          display: 'grid',
                          columnGap: 3,
                          rowGap: 3,
                          gridTemplateColumns: 'repeat(2, 1fr)',
                        }}
                      >
                    
                     


                     



                     
<TextField
            id="outlined-number"
          name="BANQUEPER"
          label="Banque"
          onBlur={formik.handleBlur}
          variant="outlined"
          margin="normal"
          value={formik.values.BANQUEPER}
          onChange={formik.handleChange}
          error={formik.touched.BANQUEPER && Boolean(formik.errors.BANQUEPER)}
          helperText={formik.touched.BANQUEPER && formik.errors.BANQUEPER}
        />


          <TextField
                      id="outlined-number"
                    name="numcompte"
                    label="Numéro compte"
                    onBlur={formik.handleBlur}
                    variant="outlined"
                    margin="normal"
                    value={formik.values.numcompte}
                    onChange={formik.handleChange}
                    error={formik.touched.numcompte && Boolean(formik.errors.numcompte)}
                    helperText={formik.touched.numcompte && formik.errors.numcompte}
                  />


<TextField
                      id="outlined-number"
                    name="PAYEMENT"
                    label="Payement"
                    onBlur={formik.handleBlur}
                    variant="outlined"
                    margin="normal"
                    value={formik.values.PAYEMENT}
                    onChange={formik.handleChange}
                    error={formik.touched.PAYEMENT && Boolean(formik.errors.PAYEMENT)}
                    helperText={formik.touched.PAYEMENT && formik.errors.PAYEMENT}
                  />


<TextField
                      id="outlined-number"
                    name="SALB"
                    label="Salaire"
                    onBlur={formik.handleBlur}
                    variant="outlined"
                    margin="normal"
                    value={formik.values.SALB}
                    onChange={formik.handleChange}
                    error={formik.touched.SALB && Boolean(formik.errors.SALB)}
                    helperText={formik.touched.SALB && formik.errors.SALB}
                  />

<TextField
                      id="outlined-number"
                    name="TXCNSS"
                    label="Taxe CNSS"
                    onBlur={formik.handleBlur}
                    variant="outlined"
                    margin="normal"
                    value={formik.values.TXCNSS}
                    onChange={formik.handleChange}
                    error={formik.touched.TXCNSS && Boolean(formik.errors.TXCNSS)}
                    helperText={formik.touched.TXCNSS && formik.errors.TXCNSS}
                  />


<TextField
                      id="outlined-number"
                    name="nbmois"
                    label="Nombre de mois"
                    onBlur={formik.handleBlur}
                    variant="outlined"
                    margin="normal"
                    value={formik.values.nbmois}
                    onChange={formik.handleChange}
                    error={formik.touched.nbmois && Boolean(formik.errors.nbmois)}
                    helperText={formik.touched.nbmois && formik.errors.nbmois}
                  />




                      </Box>
                      <DialogActions>
                  

                      <Button onClick={handleBack}>Précédent</Button>
          <Button type="submit" variant="contained" color="primary">
            Ajouter
          </Button>
              </DialogActions>
                  


                      </CardContent>
          </Card>
   


          
        </form>
      )}
      {activeStep === 2 && (
        <div>
           <Card>
                      
                        
                      <CardContent>
                      <p>Cordonnnéer</p>
                      <Box

                        sx={{

                          display: 'grid',
                          columnGap: 3,
                          rowGap: 3,
                          gridTemplateColumns: 'repeat(2, 1fr)',
                        }}
                      >
                    
                      <p>NOM Et PRENOM : {formik.values.NOMPRENOM1}</p>
                      <p>Cin : {formik.values.CIN}</p>
                      <p>ADRESSE : {formik.values.ADRESSE}</p>
                      <p>TELEPHONE : {formik.values.TELEPHONE}</p>
                      <p>email : {formik.values.email}</p>
                      <p>DATE NAISSANCE : {formik.values.NAIS}</p>
                      <p>SEXE : {formik.values.SEXE}</p>
                      <p>BANQUE PERSONELLE : {formik.values.BANQUEPER}</p>
                      <p>NUMéMRO DE COMPTE : {formik.values.numcompte}</p>
                      <p>PAYEMENT : {formik.values.PAYEMENT}</p>
                      <p>NOMBRE DE MOIS : {formik.values.nbmois}</p>
          </Box>
          <Button onClick={Nouveauformulaire}  variant="contained" color="primary">
          Nouveau formulaire
          </Button>
          &nbsp; &nbsp; 
          <Button  onClick={(e) => handleClickOpenMUP(e,formik.values )}  variant="contained" color="primary">
          Modifier
         </Button>
          </CardContent>
          </Card>
        </div>
      
       
      )}
         <Snackbar open={openAdd} autoHideDuration={3000} onClose={handleCloseAdd} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert onClose={handleCloseA} severity="success" lg={{ width: '100%' }}>
            Employé ajouté avec succée!
          </Alert>
        </Snackbar>
    </div>
            
          </Grid>
        
       

        </Grid>
       <br/><br/>
      </Container>
    
    </>
  );
}

export default AjouterEmployee;

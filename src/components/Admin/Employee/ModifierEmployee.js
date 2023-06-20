
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
  Card,
  
  CardContent,
  
} from '@mui/material';
import {  Button,Typography } from '@mui/material';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import * as React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
// import moment from 'moment';
import { useFormik } from "formik";
import * as Yup from "yup";
import Snackbar from '@mui/material/Snackbar';

import MuiAlert from '@mui/material/Alert';

import DialogActions from '@mui/material/DialogActions';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

// Alert function
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function ModifierEmployee() {
  const [openModifier, setOpenModifier] = React.useState(false);
  const handleCloseModifier = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpenModifier(false);
  };
  
  
  const [ setOpenA] = React.useState(false);
  const handleCloseA = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenA(false);
  };
  const navigate = useNavigate();

  const [ setListEmployee] = useState([]);

  const formikUpdate = useFormik({
    initialValues: {
      CIN: localStorage.getItem('CINEmplyee'),
      email: localStorage.getItem('emailEmplyee'),
      ADRESSE: localStorage.getItem('ADRESSEEmplyee'),
      TELEPHONE: localStorage.getItem('TELEPHONEEmplyee'),
    
      NOMPRENOM1: localStorage.getItem('NOMPRENOM1Emplyee'),

      SEXE : localStorage.getItem('SEXEEmplyee'),
      NAIS : localStorage.getItem('NAISEmplyee'),

      BANQUEPER:localStorage.getItem('BANQUEPEREmplyee'),
   
      numcompte:localStorage.getItem('numcompteEmplyee'),
      PAYEMENT:localStorage.getItem('PAYEMENTEREmplyee'),
      SALB:localStorage.getItem('SALB'),
      TXCNSS:localStorage.getItem('TXCNSS'),
      nbmois:localStorage.getItem('nbmoisEmplyee'),
      acceptTerms: true,
    },
    validationSchema: Yup.object().shape({
        CIN: Yup.string()
        .required("CIN is required")
        .min(8, "CIN must be at least 6 characters"),
        
        email: Yup.string()
        .required("email is required"),
       
        NAIS: Yup.string()
        .required("NAIS is required"),

        TELEPHONE: Yup.string().min(8, 'TELEPHONE must be at least 8 characters').required('TELEPHONE is required'),
    
        ADRESSE: Yup.string().required('La ADRESSE est requise'),
       
        NOMPRENOM1: Yup.string().min(6, 'Password must be at least 8 characters').required('Password is required'),

        BANQUEPER: Yup.string()
        .required("BANQUEPER is required"),
       
        
        numcompte: Yup.string()
        .required("numéro de compte is required")
        .min(20, "numéro de compte must be at least 6 characters"),
      
        PAYEMENT: Yup.string()
        .required("PAYEMENT de compte is required"),

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
        CIN: formikUpdate.values.CIN,
        email: formikUpdate.values.email,
        ADRESSE: formikUpdate.values.ADRESSE,
        TELEPHONE: formikUpdate.values.TELEPHONE,
       
        NOMPRENOM1: formikUpdate.values.NOMPRENOM1,
        SEXE: formikUpdate.values.SEXE,
        NAIS: formikUpdate.values.NAIS,

        BANQUEPER:formikUpdate.values.BANQUEPER,
        numcompte:formikUpdate.values.numcompte,
        PAYEMENT:formikUpdate.values.PAYEMENT,
        SALB:formikUpdate.values.SALB,
        TXCNSS:formikUpdate.values.TXCNSS,
        nbmois:formikUpdate.values.nbmois,
      };

      
      const Putuserpaie = {
        
        motdepasse: formikUpdate.values.CIN,
       

      };
  
      axios.put("https://localhost:44367/api/Personnel?MATR=" + localStorage.getItem('MATREmplyee'), 
      produitObject,
      config).then(() => {
       
        getData () ;
        navigate('/Employee/AfficherEmployee', { replace: true });
       
  
        localStorage.removeItem('CINEmplyee');
        localStorage.removeItem('emailEmplyee');
        localStorage.removeItem('MATREmplyee');
        localStorage.removeItem('ADRESSEEmplyee');
        localStorage.removeItem('TELEPHONEEmplyee');
       
        localStorage.removeItem('NOMPRENOM1Emplyee');
        localStorage.removeItem('SEXEEmplyee');
        localStorage.removeItem('NAISEmplyee');

        localStorage.removeItem('BANQUEPEREmplyee');
        localStorage.removeItem('numcompteEmplyee');
        localStorage.removeItem('PAYEMENTEREmplyee');
        localStorage.removeItem('SALB');
        localStorage.removeItem('TXCNSS');
        localStorage.removeItem('nbmoisEmplyee');
     

        formikUpdate.resetForm();
      
        
      });


      axios.put("https://localhost:44367/api/Personnel/Putuserpaie?motdepasse=" + localStorage.getItem('CINEmplyee'), 
      Putuserpaie,
      config).then(() => {
       
        getData () ;
        navigate('/Employee/AfficherEmployee', { replace: true });
       
  
     
        localStorage.removeItem('compteuserEmplyee');
       

        formikUpdate.resetForm();
      
        
      });
      setOpenModifier(true)
  
      formikUpdate.resetForm();
    
  
    
    },
  });
  const config = ({
    "Access-Control-Allow-Origin": "*",
  })



  const getData = () => {
    axios.get("https://localhost:44367/api/Personnel", config).then((res) => {
      setListEmployee(res.data)
      console.log(res.data)
         })
}

    
  
   
  useEffect(() => {
    formikUpdate.initialValues.CIN= localStorage.getItem('CINEmplyee');
    formikUpdate.initialValues.email= localStorage.getItem('emailEmplyee');

    formikUpdate.initialValues.ADRESSE= localStorage.getItem('ADRESSEEmplyee');
    formikUpdate.initialValues.TELEPHONE= localStorage.getItem('TELEPHONEEmplyee');
    
    formikUpdate.initialValues.NOMPRENOM1= localStorage.getItem('NOMPRENOM1Emplyee');

    formikUpdate.initialValues.SEXE= localStorage.getItem('SEXEEmplyee');
    formikUpdate.initialValues.NAIS= localStorage.getItem('NAISEmplyee');

    formikUpdate.initialValues.BANQUEPER= localStorage.getItem('BANQUEPEREmplyee');
    formikUpdate.initialValues.numcompte= localStorage.getItem('numcompteEmplyee');
    formikUpdate.initialValues.SALB= localStorage.getItem('SALB');
    formikUpdate.initialValues.TXCNSS= localStorage.getItem('TXCNSS');
    formikUpdate.initialValues.nbmois= localStorage.getItem('nbmoisEmplyee');
    
    
}, []);


const [activeStep, setActiveStep] = React.useState(0);

const handleNext = () => {
 // Check if form is valid before proceeding to next step
    setActiveStep(activeStep + 1);
  
};

const handleBack = () => {
  setActiveStep(activeStep - 1);
};

const Nouveauformulaire = () =>{
  setActiveStep(0);
  formikUpdate.resetForm();
}

    

    

  return (
    <>
       
     
     <PageTitleWrapper>
     <Typography variant="h5" component="h5" gutterBottom>
     Modifier employé
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
       
       <form onSubmit={formikUpdate.handleSubmit}>

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
                   onBlur={formikUpdate.handleBlur}
                   value={formikUpdate.values.CIN}
                   onChange={formikUpdate.handleChange}
                   error={formikUpdate.touched.CIN && Boolean(formikUpdate.errors.CIN)}
                   helperText={formikUpdate.touched.CIN && formikUpdate.errors.CIN}
                 />
<TextField
           id="outlined-number"
         name="NOMPRENOM1"
         label="Nom et prenom"
         onBlur={formikUpdate.handleBlur}
         variant="outlined"
         margin="normal"
         value={formikUpdate.values.NOMPRENOM1}
         onChange={formikUpdate.handleChange}
         error={formikUpdate.touched.NOMPRENOM1 && Boolean(formikUpdate.errors.NOMPRENOM1)}
         helperText={formikUpdate.touched.NOMPRENOM1 && formikUpdate.errors.NOMPRENOM1}
       />


<TextField
           id="outlined-number"
         name="NAIS"
         onBlur={formikUpdate.handleBlur}
         variant="outlined"
         margin="normal"
         type="date"
         value={formikUpdate.values.NAIS}
         onChange={formikUpdate.handleChange}
         error={formikUpdate.touched.NAIS && Boolean(formikUpdate.errors.NAIS)}
         helperText={formikUpdate.touched.NAIS && formikUpdate.errors.NAIS}
       />

         <TextField
                     id="outlined-number"
                   name="ADRESSE"
                   label="ADRESSE"
                   variant="outlined"
                   margin="normal"
                   onBlur={formikUpdate.handleBlur}
                   value={formikUpdate.values.ADRESSE}
                   onChange={formikUpdate.handleChange}
                   error={formikUpdate.touched.ADRESSE && Boolean(formikUpdate.errors.ADRESSE)}
                   helperText={formikUpdate.touched.ADRESSE && formikUpdate.errors.ADRESSE}
                 
                 />
           
           <TextField
                     id="outlined-number"
                   name="TELEPHONE"
                   label="TELEPHONE"
                   variant="outlined"
                   onBlur={formikUpdate.handleBlur}
                   margin="normal"
                   value={formikUpdate.values.TELEPHONE}
                   onChange={formikUpdate.handleChange}
                   error={formikUpdate.touched.TELEPHONE && Boolean(formikUpdate.errors.TELEPHONE)}
                   helperText={formikUpdate.touched.TELEPHONE && formikUpdate.errors.TELEPHONE}
                 />

<TextField
                     id="outlined-number"
                   name="email"
                   label="email"
                   variant="outlined"
                   onBlur={formikUpdate.handleBlur}
                   margin="normal"
                   value={formikUpdate.values.email}
                   onChange={formikUpdate.handleChange}
                   error={formikUpdate.touched.email && Boolean(formikUpdate.errors.email)}
                   helperText={formikUpdate.touched.email && formikUpdate.errors.email}
                 />

<TextField
         id="outlined-select"
         name="SEXE"
         label="SEXE"
         variant="outlined"
         margin="normal"
         select
         value={formikUpdate.values.SEXE}
         onChange={formikUpdate.handleChange}
         error={formikUpdate.touched.SEXE && Boolean(formikUpdate.errors.SEXE)}
         helperText={formikUpdate.touched.SEXE && formikUpdate.errors.SEXE}
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

       
       <form onSubmit={formikUpdate.handleSubmit}>
        
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
         label="BANQUEPER"
         onBlur={formikUpdate.handleBlur}
         variant="outlined"
         margin="normal"
         value={formikUpdate.values.BANQUEPER}
         onChange={formikUpdate.handleChange}
         error={formikUpdate.touched.BANQUEPER && Boolean(formikUpdate.errors.BANQUEPER)}
         helperText={formikUpdate.touched.BANQUEPER && formikUpdate.errors.BANQUEPER}
       />


         <TextField
                     id="outlined-number"
                   name="numcompte"
                   label="numcompte"
                   onBlur={formikUpdate.handleBlur}
                   variant="outlined"
                   margin="normal"
                   value={formikUpdate.values.numcompte}
                   onChange={formikUpdate.handleChange}
                   error={formikUpdate.touched.numcompte && Boolean(formikUpdate.errors.numcompte)}
                   helperText={formikUpdate.touched.numcompte && formikUpdate.errors.numcompte}
                 />


<TextField
                     id="outlined-number"
                   name="PAYEMENT"
                   label="PAYEMENT"
                   onBlur={formikUpdate.handleBlur}
                   variant="outlined"
                   margin="normal"
                   value={formikUpdate.values.PAYEMENT}
                   onChange={formikUpdate.handleChange}
                   error={formikUpdate.touched.PAYEMENT && Boolean(formikUpdate.errors.PAYEMENT)}
                   helperText={formikUpdate.touched.PAYEMENT && formikUpdate.errors.PAYEMENT}
                 />

<TextField
                     id="outlined-number"
                   name="SALB"
                   label="Salaire"
                   onBlur={formikUpdate.handleBlur}
                   variant="outlined"
                   margin="normal"
                   value={formikUpdate.values.SALB}
                   onChange={formikUpdate.handleChange}
                   error={formikUpdate.touched.SALB && Boolean(formikUpdate.errors.SALB)}
                   helperText={formikUpdate.touched.SALB && formikUpdate.errors.SALB}
                 />

<TextField
                     id="outlined-number"
                   name="TXCNSS"
                   label="Taxe CNSS"
                   onBlur={formikUpdate.handleBlur}
                   variant="outlined"
                   margin="normal"
                   value={formikUpdate.values.TXCNSS}
                   onChange={formikUpdate.handleChange}
                   error={formikUpdate.touched.TXCNSS && Boolean(formikUpdate.errors.TXCNSS)}
                   helperText={formikUpdate.touched.TXCNSS && formikUpdate.errors.TXCNSS}
                 />

<TextField
                     id="outlined-number"
                   name="nbmois"
                   label="nbmois"
                   onBlur={formikUpdate.handleBlur}
                   variant="outlined"
                   margin="normal"
                   value={formikUpdate.values.nbmois}
                   onChange={formikUpdate.handleChange}
                   error={formikUpdate.touched.nbmois && Boolean(formikUpdate.errors.nbmois)}
                   helperText={formikUpdate.touched.nbmois && formikUpdate.errors.nbmois}
                 />




                     </Box>
                     <DialogActions>
                 

                     <Button onClick={handleBack}>Précédent</Button>
         <Button type="submit" variant="contained" color="primary">
           Modifier
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
                     <h3>Cordonnnés</h3>
                
         <Button onClick={Nouveauformulaire}  variant="contained" color="primary">
         Nouveau formulaire
         </Button>
     

        
         </CardContent>
         </Card>
       </div>
     
      
     )
     }
        <Snackbar open={openModifier} autoHideDuration={3000} onClose={handleCloseModifier} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert onClose={handleCloseA} severity="success" lg={{ width: '100%' }}>
            Employé Modifié avec succée!
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


export default ModifierEmployee;

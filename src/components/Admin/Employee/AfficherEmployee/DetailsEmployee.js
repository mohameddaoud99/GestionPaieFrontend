
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
  Card,
  Typography,Button
  
} from '@mui/material';
import { CardContent } from '@mui/material';
import axios from 'axios';


import Box from '@mui/material/Box';

import * as React from 'react';
import {useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import { useFormik } from "formik";

function DetailsEmployee() {
    const navigate = useNavigate();

    const formik = useFormik({
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
    });
    const config = ({
      "Access-Control-Allow-Origin": "*",
  })
    useEffect(() => {
      axios.get("https://localhost:44367/api/Payement/Dali?mat=00002&month=5" , config).then((res) => {
          console.log(res.data)
          // console.log(res.data)
      })
  }, [])

    useEffect(() => {
        formik.initialValues.CIN= localStorage.getItem('CINEmplyee');
        formik.initialValues.email= localStorage.getItem('emailEmplyee');

        formik.initialValues.ADRESSE= localStorage.getItem('ADRESSEEmplyee');
        formik.initialValues.TELEPHONE= localStorage.getItem('TELEPHONEEmplyee');
        
        formik.initialValues.NOMPRENOM1= localStorage.getItem('NOMPRENOM1Emplyee');
    
        formik.initialValues.SEXE= localStorage.getItem('SEXEEmplyee');
        formik.initialValues.NAIS= localStorage.getItem('NAISEmplyee');
    
        formik.initialValues.BANQUEPER= localStorage.getItem('BANQUEPEREmplyee');
        formik.initialValues.numcompte= localStorage.getItem('numcompteEmplyee');
        formik.initialValues.PAYEMENT= localStorage.getItem('PAYEMENTEREmplyee');
        formik.initialValues.SALB= localStorage.getItem('SALB');
        formik.initialValues.TXCNSS= localStorage.getItem('TXCNSS');
        formik.initialValues.nbmois= localStorage.getItem('nbmoisEmplyee');
    }, []);
    const handleClickOpenMUP = (e, val) => {
   
        let {  CIN,email,  ADRESSE, TELEPHONE, NOMPRENOM1 ,NAIS,SEXE, BANQUEPER,numcompte,PAYEMENT,nbmois,SALB,TXCNSS} = val;
      
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
       
        navigate('/Employee/ModifierEmployee', {replace: true});
      };
      
      const handleBack = () => {
        navigate('/Employee/AfficherEmployee', {replace: true});
      };
    
  return (
    <>
     
      <PageTitleWrapper>
      <Typography variant="h4" component="h4" gutterBottom>
      Cordonnées employé <span style={{color:"green",fontWeight:"bold",fontSize:"18px",paddingLeft:"5px"}}>{localStorage.getItem("NOMPRENOM1Emplyee")}</span>
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
     
        <div>
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






                        <p style={{ marginBottom: '10px' }}> Matricule employé:<span style={{marginLeft: '10px', color: '#333', fontWeight: 'bold' }}>{localStorage.getItem("MATREmplyee")}</span> </p>
                        <p style={{ marginBottom: '10px' }}>NOM Et PRENOM :<span style={{marginLeft: '10px', color: '#333', fontWeight: 'bold' }}>{formik.values.NOMPRENOM1}</span> </p>
                        <p style={{ marginBottom: '10px' }}>Cin :<span style={{marginLeft: '10px', color: '#333', fontWeight: 'bold' }}>{formik.values.CIN}</span> </p>
                        <p style={{ marginBottom: '10px' }}>ADRESSE :<span style={{marginLeft: '10px', color: '#333', fontWeight: 'bold' }}>{formik.values.ADRESSE}</span> </p>
                        <p style={{ marginBottom: '10px' }}>TELEPHONE :<span style={{marginLeft: '10px', color: '#333', fontWeight: 'bold' }}>{formik.values.TELEPHONE}</span> </p>
                        <p style={{ marginBottom: '10px' }}>EMAIL :<span style={{marginLeft: '10px', color: '#333', fontWeight: 'bold' }}> {formik.values.email}</span></p>
                        <p style={{ marginBottom: '10px' }}>DATE NAISSANCE : <span style={{marginLeft: '10px', color: '#333', fontWeight: 'bold' }}>{formik.values.NAIS}</span></p>
                        <p style={{ marginBottom: '10px' }}>SEXE :<span style={{marginLeft: '10px', color: '#333', fontWeight: 'bold' }}> {formik.values.SEXE} </span></p>
                        <p style={{ marginBottom: '10px' }}>BANQUE PERSONELLE : <span style={{marginLeft: '10px', color: '#333', fontWeight: 'bold' }}>{formik.values.BANQUEPER}</span></p>
                        <p style={{ marginBottom: '10px' }}>NUMEMRO DE COMPTE : <span style={{marginLeft: '10px', color: '#333', fontWeight: 'bold' }}>{formik.values.numcompte}</span></p>
                        <p style={{ marginBottom: '10px' }}>PAYEMENT :  <span style={{marginLeft: '10px', color: '#333', fontWeight: 'bold' }}>{formik.values.PAYEMENT} </span></p>
                        <p style={{ marginBottom: '10px' }}>SALAIRE<span style={{marginLeft: '10px', color: '#333', fontWeight: 'bold' }}>{formik.values.SALB} DT</span> </p>
                        <p style={{ marginBottom: '10px' }}>TAXE CNSS :<span style={{marginLeft: '10px', color: '#333', fontWeight: 'bold' }}>{formik.values.TXCNSS} %</span> </p>
                        <p style={{ marginBottom: '10px' }}>NOMBRE DE MOIS :  <span style={{marginLeft: '10px', color: '#333', fontWeight: 'bold' }}>{formik.values.nbmois}</span></p>




        

          </Box>
          <br/>
          <Button  onClick={handleBack}  variant="contained" color="primary">
          Précédent
         </Button>
         &nbsp; &nbsp; 
         <Button  onClick={(e) => handleClickOpenMUP(e,formik.values )}  variant="contained" color="primary">
         Modifier
         </Button>
          
          
         
          </CardContent>
          </Card>
        </div>
      
       
     
      
    </div>
            
          </Grid>
        
       

        </Grid>
        <br/><br/>
       
      </Container>
    
    </>
  );
}

export default DetailsEmployee;

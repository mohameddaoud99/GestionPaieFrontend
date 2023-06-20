
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography, Button

} from '@mui/material';
// import axios from 'axios';


import Box from '@mui/material/Box';

import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import { useFormik } from "formik";

function DetailsPayement() {

  const Print = () => {
    // console.log('print');  
    let printContents = document.getElementById('printablediv').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }



  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      datefin: localStorage.getItem('datefin'),
      datedebut: localStorage.getItem('datedebut'),
      mois: localStorage.getItem('mois'),
      matricule: localStorage.getItem('matricule'),
      nbtot: localStorage.getItem('nbtot'),
      nbheure: localStorage.getItem('nbheure'),
      salaireb: localStorage.getItem('salaireb'),
      taxeCNSS: localStorage.getItem('taxeCNSS'),
      montantEl: localStorage.getItem('mnt_el'),
      nbheuresaut: localStorage.getItem('nbheuresaut'),
      prixheure: localStorage.getItem('prixheure'),
      nomprenom: localStorage.getItem('nomprenom'),
      salaireInit: localStorage.getItem('salaireInit'),
      montantElAutorisation: localStorage.getItem('montantElAutorisation'),
      montantElTaxe: localStorage.getItem('montantElTaxe'),

      
      acceptTerms: true,
    },
  });



  useEffect(() => {
    formik.initialValues.datedebut = localStorage.getItem('datedebut');
    formik.initialValues.datefin = localStorage.getItem('datefin');
    formik.initialValues.matricule = localStorage.getItem('matricule');
    formik.initialValues.mois = localStorage.getItem('mois');
    formik.initialValues.nbheure = localStorage.getItem('nbheure');
    formik.initialValues.nbtot = localStorage.getItem('nbtot');
    formik.initialValues.salaireb = localStorage.getItem('salaireb');
    formik.initialValues.taxeCNSS = localStorage.getItem('taxeCNSS');
    formik.initialValues.montantEl = localStorage.getItem('mnt_el');
    formik.initialValues.nbheuresaut = localStorage.getItem('nbheuresaut');
    formik.initialValues.prixheure = localStorage.getItem('prixheure');
    formik.initialValues.nomprenom = localStorage.getItem('nomprenom');
    formik.initialValues.salaireInit = localStorage.getItem('salaireInit');
    formik.initialValues.montantElAutorisation = localStorage.getItem('montantElAutorisation');
    formik.initialValues.montantElTaxe = localStorage.getItem('montantElTaxe');




  }, []);


  const handleBack = () => {
    navigate('/payement', { replace: true });
  };

  return (
    <>

      <PageTitleWrapper>
        <Typography variant="h3" component="h3" gutterBottom>
          Details  payement employé
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
                    <div id='printablediv'>

                      <Box

                        sx={{

                          display: 'grid',
                          columnGap: 3,
                          rowGap: 3,
                          gridTemplateColumns: 'repeat(3, 1fr)',
                        }}
                      >

                
                        <p style={{ marginBottom: '10px' }}> Matricule employé:<span style={{marginLeft: '10px', color: '#333', fontWeight: 'bold' }}>{formik.values.matricule}</span> </p>
                        <p style={{ marginBottom: '10px' }}> Nom et prénom:<span style={{marginLeft: '10px', color: '#333', fontWeight: 'bold' }}>{localStorage.getItem("nomprenom")}</span> </p>
                        <p style={{ marginBottom: '10px' }}>Salaire:<span style={{marginLeft: '10px', color: '#333', fontWeight: 'bold' }}>{formik.values.salaireInit} DT</span> </p>

                        <p style={{ marginBottom: '10px' }}>Date début:<span style={{marginLeft: '10px', color: '#333', fontWeight: 'bold' }}>{formik.values.datedebut}</span> </p>
                        <p style={{ marginBottom: '10px' }}>Date fin:<span style={{marginLeft: '10px', color: '#333', fontWeight: 'bold' }}>{formik.values.datefin}</span> </p>
                        <p style={{ marginBottom: '10px' }}>Prix heure:<span style={{marginLeft: '10px', color: '#333', fontWeight: 'bold' }}> {formik.values.prixheure} DT</span></p>

                        <p style={{ marginBottom: '10px' }}>Mois à payer:<span style={{marginLeft: '10px', color: '#333', fontWeight: 'bold' }}>{formik.values.mois}</span> </p>
                        <p style={{ marginBottom: '10px' }}>Nombre de jours total des congés:<span style={{marginLeft: '10px', color: '#333', fontWeight: 'bold' }}>{formik.values.nbtot}</span> </p>
                        <p style={{ marginBottom: '10px' }}>Nombre d'heures total des congés:<span style={{marginLeft: '10px', color: '#333', fontWeight: 'bold' }}> {formik.values.nbheure}</span></p>
                        <p style={{ marginBottom: '10px' }}>Montant à éliminer(congés): <span style={{marginLeft: '10px', color: '#333', fontWeight: 'bold' }}>{formik.values.montantEl} DT</span></p>

                        <p style={{ marginBottom: '10px' }}>Nombre d'heures total des autorisations: <span style={{marginLeft: '10px', color: '#333', fontWeight: 'bold' }}>{formik.values.nbheuresaut}</span></p>
                        <p style={{ marginBottom: '10px' }}>Montant à éliminer(autorisations):<span style={{marginLeft: '10px', color: '#333', fontWeight: 'bold' }}>{formik.values.montantElAutorisation} DT</span> </p>

                        <p style={{ marginBottom: '10px' }}>Taxe CNSS:<span style={{marginLeft: '10px', color: '#333', fontWeight: 'bold' }}>{formik.values.taxeCNSS} %</span> </p>
                        <p style={{ marginBottom: '10px' }}>Montant à éliminer(CNSS):<span style={{marginLeft: '10px', color: '#333', fontWeight: 'bold' }}>{formik.values.montantElTaxe} DT</span> </p>
                        <p style={{ marginBottom: '10px',color:"green",fontWeight:'bold' }}>Salaire(imposé):<span style={{marginLeft: '10px', color: '#333', fontWeight: 'bold',backgroundColor:"yellow" }}>{formik.values.salaireb} DT</span> </p>



                      </Box>
                    </div>
                    <br /><br />
                    <Button onClick={handleBack} variant="contained" color="primary">
                      Précédent
                    </Button>
                    &nbsp; &nbsp;
                    <Button type="button" variant="contained" color="primary" onClick={Print} > Imprimer facture</Button>

                  </CardContent>
                </Card>
              </div>
            </div>

            <br/><br/>
          </Grid>


        </Grid>

      </Container>




    </>
  );
}




export default DetailsPayement;

import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
  Card,


  Typography

} from '@mui/material';
import {
  Button, CardHeader, MenuItem,
  CardContent
} from '@mui/material';
import axios from 'axios';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik } from "formik";

import * as Yup from "yup";

import { useState, useEffect } from 'react';
import DialogActions from '@mui/material/DialogActions';
import * as React from 'react';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom'

import moment from 'moment';




// Alert function
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



function AjouterAutorisationADMIN() {


  const navigate = useNavigate();




  //  const [ListCongeA, setListCongeA] = useState([]);
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


  const [listConge, setListConge] = useState([]);





  const [selectedOptionPerson, setSelectedOptionPerson] = useState('');






  useEffect(() => {


    const config = ({
      "Access-Control-Allow-Origin": "*",
    })


    axios.get("https://localhost:44367/api/ChoixBD?dbName=" + localStorage.getItem("CODSOC"), config).then(
      () => {

        axios.get("https://localhost:44367/api/Personnel", config)
          .then(res => {
            //  console.log(res.data)
            setListConge(res.data);
          })
          .catch(error => {
            console.log(error);
          });




      });





  }, []);

  const handleChangePerson = event => {
    setSelectedOptionPerson(event.target.value);
    const selectedOptionValuePerson = event.target.value;
    const selectedOptionPerson = listConge.find(option => option.NOMPRENOM1 === selectedOptionValuePerson);

    formik.initialValues.NOMPRENOM1 = selectedOptionPerson.NOMPRENOM1
    formik.initialValues.MATR = selectedOptionPerson.MATR
  };







  const formik = useFormik({
    initialValues: {

      MATR: "",
      NOMPRENOM1: "",
      date: "",
      nbrheure: "",
      description: "",

      acceptTerms: true,
    },

    validationSchema: Yup.object().shape({





      description: Yup.string()
        .required("description est obligatoire")
        .min(3, "description doit etre au minimum 3 characteres")
        .max(20, "description doit etre au maximum 100 characteres"),

      date: Yup.date().required('La date de début est requise'),
      nbrheure: Yup.string().required("Le nombre d'heures est obligatoire"),

      acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
    }),
    onSubmit: () => {

      const config = ({
        "Access-Control-Allow-Origin": "*",
      });



      const produitObject = {

        date: moment(formik.values.date).format("Y-M-D"),
        nbrheure: formik.values.nbrheure,

        matricule: formik.values.MATR,
        nomprenom: formik.values.NOMPRENOM1,

        description: formik.values.description,
      };

      console.log(produitObject)


      axios.post("https://localhost:44367/api/Autorisation/PostAutorisationADMIN", produitObject, config).then(
        (res) => {

          console.log(res.data)


          navigate('/Autorisations/ListeAutorisationA', { replace: true });
          setOpenAdd(true)
          setActiveStep(activeStep + 1);

        });
      setActiveStep(activeStep + 1);
      formik.resetForm();
      console.log(produitObject);





    },

  });

  const [activeStep, setActiveStep] = React.useState(0);









  return (
    <>

      <PageTitleWrapper>
        <Typography variant="h3" component="h3" gutterBottom>
          Ajouter  autorisation
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
              <form onSubmit={formik.handleSubmit}>

                <Card>
                  <CardHeader title="Ajouter autorisation" />

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
                        id="outlined-select"
                        name="NOMPRENOM1"
                        label="NOM ET PRENOM"
                        variant="outlined"
                        margin="normal"
                        select
                        value={selectedOptionPerson}
                        onChange={handleChangePerson}
                      >
                        {listConge.map(option => (
                          <MenuItem key={option.MATR} value={option.NOMPRENOM1}>
                            {option.NOMPRENOM1}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        id="outlined-number"
                        name="MATR"
                        label="MATRICULE"
                        disabled
                        variant="outlined"
                        margin="normal"
                        value={formik.values.MATR}
                        onChange={formik.handleChange}
                        error={formik.touched.MATR && Boolean(formik.errors.MATR)}
                        helperText={formik.touched.MATR && formik.errors.MATR}
                      />




















                      <TextField
                        id="outlined-number"
                        name="date"

                        variant="outlined"
                        margin="normal"
                        type="date"
                        value={formik.values.date}
                        onChange={formik.handleChange}
                        error={formik.touched.date && Boolean(formik.errors.date)}
                        helperText={formik.touched.date && formik.errors.date}

                      />

                      <TextField
                        id="outlined-number"
                        name="nbrheure"
                        label="NOMBRE D'HEURES"
                        variant="outlined"
                        type="number"
                        margin="normal"
                        value={formik.values.nbrheure}
                        onChange={formik.handleChange}
                        error={formik.touched.nbrheure && Boolean(formik.errors.nbrheure)}
                        helperText={formik.touched.nbrheure && formik.errors.nbrheure}
                      />




                      <TextField
                        id="outlined-number"
                        name="description"
                        label="DESCRIPTION"
                        variant="outlined"

                        margin="normal"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                      />






                    </Box>



                    <DialogActions>


                      <Button type="submit" variant="contained" color="primary" >
                        Valider
                      </Button>

                    </DialogActions>


                  </CardContent>
                </Card>



              </form>







              <Snackbar open={openAdd} autoHideDuration={3000} onClose={handleCloseAdd} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={handleCloseA} severity="success" lg={{ width: '100%' }}>
                  Employee ajouter avec succée!
                </Alert>
              </Snackbar>
            </div>

          </Grid>



        </Grid>

      </Container>

    </>
  );
}

export default AjouterAutorisationADMIN;
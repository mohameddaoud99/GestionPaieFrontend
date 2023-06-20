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



function AjouterCongeADMIN() {


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


  const [options, setOptions] = useState([]);
  // const [optionsPerson, setOptionsPerson] = useState([]);

  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptionPerson, setSelectedOptionPerson] = useState('');


  useEffect(() => {
    /*  const config = ({
        "Access-Control-Allow-Origin": "*",
      })
     
      axios.get("https://localhost:44367/api/TypeCoge/GetTypeCoge", config)
      .then(res => {
      //  console.log(res.data)
        setOptions(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  */
    fetch('https://localhost:44367/api/TypeCoge/GetTypeCoge')
      .then(response => response.json())
      .then(data => setOptions(data));

  })


  useEffect(() => {
    /*
     fetch('https://localhost:44367/api/TypeCoge/GetTypeCoge')
       .then(response => response.json())
       .then(data => setOptions(data));
       */


    /*   fetch('https://localhost:44367/api/Personnel')
       .then(response => response.json())
       .then(data => setOptionsPerson(data));
       */

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


  const handleChange = event => {

    const selectedOptionValue = event.target.value;
    setSelectedOption(selectedOptionValue);

    const selectedOption = options.find(option => option.libelle === selectedOptionValue);

    formik.initialValues.libelle = selectedOption.libelle
    formik.initialValues.type = selectedOption.type
    formik.initialValues.code = selectedOption.code


  };




  /*
 
   const handleChangePerson = eventpersonne => {
     const selectedOptionValuePerson = eventpersonne.target.value;
     setSelectedOptionPerson(selectedOptionValuePerson);
     
     const selectedOptionPerson = optionsPerson.find(option => option.NOMPRENOM1 === selectedOptionValuePerson);
   
     formik.initialValues.NOMPRENOM1 =selectedOptionPerson.NOMPRENOM1
     formik.initialValues.MATR =selectedOptionPerson.MATR
   
    
   };
   */



  const formik = useFormik({
    initialValues: {
      code: "",
      type: "",
      MATR: "",
      NOMPRENOM1: "",
      datedepart: "",
      datefin: "",
      description: "",
      acceptTerms: true,
    },

    validationSchema: Yup.object().shape({



      libelle: Yup.string().required("libelle est obligatoire"),
      description: Yup.string()
        .required("description is required")
        .min(6, "description must be at least 6 characters")
        .max(20, "description must not exceed 20 characters"),

      datedepart: Yup.date().required('La date de début est requise'),
      datefin: Yup.date()
        .required('La date de fin est requise')
        .min(Yup.ref('datedepart'), 'La date de fin doit être supèrireure la date début'),

      acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
    }),
    onSubmit: () => {

      const config = ({
        "Access-Control-Allow-Origin": "*",
      });



      const produitObject = {
        code: formik.values.code,
        libelle: formik.values.libelle,
        datedepart: moment(formik.values.datedepart).format("Y-M-D"),
        datefin: moment(formik.values.datefin).format("Y-M-D"),
        description: formik.values.description,
        matricule: formik.values.MATR,
        nomprenom: formik.values.NOMPRENOM1,
        type: formik.values.type,
      };

      console.log(produitObject)


      axios.post("https://localhost:44367/api/MajCoge/PostMajCogePartieAdmin", produitObject, config).then(
        (res) => {

          console.log(res.data)

          //   setListCongeA([...ListCongeA, res.data]);
          navigate('/CongeAdmin/ListeCongeA', { replace: true });
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
          Ajouter  Congé
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
                  <CardHeader title="Ajouter Congé" />

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

                      <input type='hidden' value={formik.values.NOMPRENOM1} onChange={formik.handleChangePerson} />


                      <TextField
                        id="outlined-number"
                        name="code"
                        label="CODE"
                        disabled
                        variant="outlined"
                        margin="normal"
                        value={formik.values.code}
                        onChange={formik.handleChange}
                        error={formik.touched.code && Boolean(formik.errors.code)}
                        helperText={formik.touched.code && formik.errors.code}
                      />

                      <TextField
                        id="outlined-select"
                        name="libelle"
                        label="TYPE CONGE"
                        variant="outlined"
                        margin="normal"
                        select
                        value={selectedOption}
                        onChange={handleChange}>
                        {options.map(option => (
                          <MenuItem key={option.code} value={option.libelle}>
                            {option.libelle}
                          </MenuItem>
                        ))}
                      </TextField>




                      <TextField
                        id="outlined-number"
                        name="type"
                        label="TYPE"
                        disabled
                        variant="outlined"
                        margin="normal"
                        value={formik.values.type}
                        onChange={formik.handleChange}
                        error={formik.touched.type && Boolean(formik.errors.type)}
                        helperText={formik.touched.code && formik.errors.type}
                      />

                      <input type='hidden' value={formik.values.libelle} onChange={formik.handleChange} />




                      <TextField
                        id="outlined-number"
                        name="datedepart"

                        variant="outlined"
                        margin="normal"
                        type="date"
                        value={formik.values.datedepart}
                        onChange={formik.handleChange}
                        error={formik.touched.datedepart && Boolean(formik.errors.datedepart)}
                        helperText={formik.touched.datedepart && formik.errors.datedepart}

                      />


                      <TextField
                        id="outlined-number"
                        name="datefin"

                        variant="outlined"
                        margin="normal"
                        type="date"
                        value={formik.values.datefin}
                        onChange={formik.handleChange}
                        error={formik.touched.datefin && Boolean(formik.errors.datefin)}
                        helperText={formik.touched.datefin && formik.errors.datefin}

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
        <br />
        <br />
      </Container>

    </>
  );
}

export default AjouterCongeADMIN;
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography

} from '@mui/material';
import { Button } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';

import moment from 'moment';

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useForm } from 'react-hook-form';


import { useNavigate } from 'react-router-dom'


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AjouterConge() {

  const [open, setOpen] = React.useState(false);

  const [elements, setElements] = useState([]);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const navigate = useNavigate();

  const [id, setID] = useState(null);
  const [code, setcode] = useState('');
  const [DateD, setDateD] = useState('');
  const [DateF, setDateF] = useState('');
  const [Description, setDescription] = useState("");

  useEffect(() => {
    setID(localStorage.getItem('IDEmployee'))
    console.log(localStorage.getItem('IDEmployee'))

  }, []);


  const { register, handleSubmit, formState: { errors } } = useForm();


  const onSubmit = () => {
    
    // setOpen(true);
    // event.preventDefault();
    const produitObject = {
      code: code,
      DateD: moment(DateD).format("Y-M-D"),
      DateF: moment(DateF).format("Y-M-D"),
      Description: Description,
      EmployeeId: id
    };

    const config = ({
      "Access-Control-Allow-Origin": "*",
    })


    axios.post("https://localhost:44333/api/Conge", produitObject, config).then(
      (res) => {
        console.log(res.data)
        setElements([...elements, produitObject]);
       // window.location.reload(true)
       navigate('/Conge/ListeCongeE', {replace: true});
      
        setOpen(true);
      });
      
    console.log(produitObject);





  }

  return (
    <>

      <PageTitleWrapper>
        <Typography variant="h3" component="h3" gutterBottom>
          Ajouter  Congé
        </Typography>
      </PageTitleWrapper>
      <Container maxWidth="lg" >

        <Grid item xs={12} >
          <Card>
            <CardHeader title="Ajouter Congé" />

            <CardContent>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Box

                  sx={{

                    display: 'grid',
                    columnGap: 3,
                    rowGap: 3,
                    gridTemplateColumns: 'repeat(2, 1fr)',
                  }}
                >
                  <TextField
                    {...register('code', { required: true, pattern: /^[0-9]/i, })} 
                    margin="normal"
                    variant="outlined"
                    error={errors.code}
                    helperText={errors.code ? 'verifier votre code ' : ' '}
                    fullWidth
                    id="outlined-number"
                    label="Code"
                    name="code"
                    value={code}
                    onChange={e => setcode(e.target.value)}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />

                  <TextField
                   {...register('dateD', { required: true })}
                   name="dateD"
                   error={errors.dateD}
                   helperText={errors.dateD ? 'verifier votre date début ' : ' '}
                    margin="normal"
                    required
                    fullWidth
                    id="outlined-number"
                    label="Date début"
                    type="Date"
                    value={DateD}
                    onChange={e => setDateD(e.target.value)}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                  <TextField
                   {...register('DateF', { required: true })}
                   name="DateF"
                   error={errors.DateF}
                   helperText={errors.DateF ? 'verifier votre date fin ' : ' '}
                    margin="normal"
                    required
                    fullWidth
                    id="outlined-number"
                    label="Date Fin"
                    type="Date"
                    value={DateF}
                    onChange={e => setDateF(e.target.value)}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />


      <TextField
        label="Description"
        name="Description"
        {...register('Description',  { required: true, pattern: /^[a-zA-Z0-9]/i, })} 
        variant="outlined"
        margin="normal"
        error={errors.Description }
        helperText={errors.Description  ? 'verifier votre description ' : ''} 
        value={Description}
                    onChange={e => setDescription(e.target.value)}
                    InputLabelProps={{
                      shrink: true
                    }}
      />


                </Box>

                <Stack m={1}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 10, sm: 20, md: 134 }} lg={{ width: '100%' }}>

                  <Button type='submit' variant="contained" color="primary" sx={{ width: 70, height: 40 }} onClick={handleSubmit(onSubmit)} >
                    Ajouter
                  </Button>

                  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" lg={{ width: '100%' }}>
                      Ajouter avec success !
                    </Alert>
                  </Snackbar>

                </Stack>
              </Box>





            </CardContent>
          </Card>



        </Grid>
      </Container>




    </>
  );
}

export default AjouterConge;
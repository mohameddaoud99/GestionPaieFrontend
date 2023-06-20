import * as React from 'react';
import { useState, useEffect } from 'react';
// import { format } from 'date-fns';
// import numeral from 'numeral';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';


import {
  Card, IconButton, Grid, CardHeader, CardContent
} from '@mui/material';

// import Label from 'src/components/Label';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { useNavigate } from 'react-router-dom'




// Modal ajouter code

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
// end code Modal ajouter


const EmployeeForm = () => {



  // Modal state
  const [openM, setOpenM] = React.useState(false);

  const handleClickOpenM = () => {
    setOpenM(true);
  };
  const handleCloseM = () => {
    setOpenM(false);
  };
  // end modal state

  const navigate = useNavigate();
  const [ListConge, setListConge] = useState([]);

  const [id, setID] = useState(null);
  const [code, setcode] = useState('');
  const [DateD, setDateD] = useState('');
  const [DateF, setDateF] = useState('');
  const [Description, setDescription] = useState('');

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
        // window.location.reload(true)
         setListConge([...ListConge, produitObject]);
         navigate('/Conge/ListeConge', { replace: true });
         

        // setOpenA(true);
      });

      
    
      
    // navigate('/Conge/ListeConge', { replace: true });
    setcode("");
    setDateD("");
    setDateF("");
    setDescription("");
    console.log(produitObject);
    setOpenM(false);

  }

  

  //  const [elements, setElements] = useState([]);
  


  return (
    <>
      <CardHeader sm={{

        display: 'grid',

        columnGap: 2,
        rowGap: 1,
        gridTemplateColumns: 'repeat(1, 1fr)',
        spacing: 2,
      }}
        action={
          <Button sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />} margin={20} spacing={10} onClick={handleClickOpenM}>
            Ajouter
          </Button>

        }
        title="Liste des congés"

      />

      <BootstrapDialog
        onClose={handleCloseM}
        aria-labelledby="customized-dialog-title"
        open={openM}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseM}>
          Modal title
        </BootstrapDialogTitle>
        <DialogContent dividers>

          <Grid maxWidth="lg" item xs={12} >
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
                      {...register('Description', { required: true, pattern: /^[a-zA-Z0-9]/i, })}
                      variant="outlined"
                      margin="normal"
                      error={errors.Description}
                      helperText={errors.Description ? 'verifier votre description ' : ''}
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

                    <Button to="/Conge/AjouterConge" type='submit' variant="contained" color="primary" sx={{ width: 70, height: 40 }} onClick={handleSubmit(onSubmit)} >
                      Ajouter
                    </Button>



                  </Stack>
                </Box>





              </CardContent>
            </Card>



          </Grid>

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseM}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};
export default EmployeeForm;
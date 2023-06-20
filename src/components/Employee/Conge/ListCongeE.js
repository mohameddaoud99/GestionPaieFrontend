
import { TextField, Button,  MenuItem } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './AffichageConge/PageHeader';
import Snackbar from '@mui/material/Snackbar';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import moment from 'moment';



import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';

import { useNavigate } from 'react-router-dom'




import {
  Divider, Card, Tooltip, IconButton, useTheme,
  CardHeader, Container, CardContent, Typography, Link
} from '@mui/material';

import { NavLink as RouterLink } from 'react-router-dom';


import { DataGrid } from '@mui/x-data-grid'

import {
  GridToolbar,

} from '@mui/x-data-grid-premium';

import MuiAlert from '@mui/material/Alert';


// Alert function
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


// Modal functions
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



const ListCongeE = () => {
  
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    fetch('https://localhost:44367/api/TypeCoge/GetTypeCoge')
      .then(response => response.json())
      .then(data => setOptions(data));
  }, []);

  const handleChange = event => {
    const selectedOptionValue = event.target.value;
    setSelectedOption(selectedOptionValue);

    const selectedOption = options.find(option => option.libelle === selectedOptionValue);
  
    formik.initialValues.libelle =selectedOption.libelle
    formik.initialValues.type =selectedOption.type
    formik.initialValues.code =selectedOption.code

    formikUpdate.initialValues.libelle =selectedOption.libelle
    formikUpdate.initialValues.type =selectedOption.type
    formikUpdate.initialValues.code =selectedOption.code
   
   
  };



  const formik = useFormik({
    initialValues: {
      code: "",
      type:"",

      datedepart: "",
      datefin: "",
      description: "",
      acceptTerms: true,
    },
    validationSchema: Yup.object().shape({


      code: Yup.string().required("code is required"),
      libelle: Yup.string().required("libelle is required"),
      description: Yup.string()
        .required("description is required")
        .min(6, "description must be at least 6 characters")
        .max(20, "description must not exceed 20 characters"),

      datedepart: Yup.date().required('La date de début est requise'),
      datefin: Yup.date()
        .required('La date de fin est requise')
        .min(Yup.ref('datedepart'), 'La date de fin doit être après la date de début'),

      acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
    }),
    onSubmit: () => {
      // alert(values.datedepart).format("Y-M-D");
      const config = ({
        "Access-Control-Allow-Origin": "*",
      })

      const produitObject = {
        code: formik.values.code,
        libelle:formik.values.libelle,
        datedepart: moment(formik.values.datedepart).format("Y-M-D"),
        datefin: moment(formik.values.datefin).format("Y-M-D"),
        description: formik.values.description,
        matricule : localStorage.getItem('MATREmployee'),
        nomprenom : localStorage.getItem('NOMPRENOM1Employee'),
        type:  formik.values.type,
      };



      axios.post("https://localhost:44367/api/majconge", produitObject, config).then(
        (res) => {

          console.log(res.data)

          setListConge([...ListConge, res.data]);
          navigate('/Conge/ListeCongeE', { replace: true });
          setOpenAdd(true)


        });
      formik.resetForm();
      console.log(produitObject);
      setOpenM(false);

    },
  });




  // *********************************************Modal state Add*****************************************
  const [openM, setOpenM] = React.useState(false);
  const handleCloseM = () => {
    setOpenM(false);
    formik.resetForm();

  };
  const handleClickOpenM = () => {
    setOpenM(true);
  };


  // *************************************************Modal state Update************************************
  const [openMUP, setOpenMUP] = React.useState(false);

  const handleClickOpenMUP = (e, val) => {
    setOpenMUP(true);
    let {  code,libelle, datedepart, datefin, description,type } = val;
  
    localStorage.setItem('code', code);
    localStorage.setItem('libelle', libelle);
    localStorage.setItem('datedepart', datedepart.substring(0, 10));
    localStorage.setItem('datefin', datefin.substring(0, 10));
    localStorage.setItem('description', description);
    localStorage.setItem('type', type);
    



    formikUpdate.initialValues.code = localStorage.getItem('code');
    formikUpdate.initialValues.type = localStorage.getItem('type');
    formikUpdate.initialValues.libelle = localStorage.getItem('libelle');
    formikUpdate.initialValues.datedepart = localStorage.getItem('datedepart');
    formikUpdate.initialValues.datefin = localStorage.getItem('datefin');
    formikUpdate.initialValues.description = localStorage.getItem('description');



  };
  const handleCloseMUP = () => {
    setOpenMUP(false);
    formikUpdate.resetForm();

  };

  // *************************************************Modal state Delete************************************
  const [open, setOpen] = React.useState(false);
  const [deleteData, setDeleteData] = useState({});

  const handleClickOpen = (e, val) => {
    localStorage.setItem('datedepart',val.datedepart.substring(0, 10));
    setOpen(true);
    setDeleteData(val)
  };
  const handleClose = () => {
    setOpen(false);
  };


  // ********************************************************************************************************************************
  const [openAdd, setOpenAdd] = React.useState(false);
  const handleCloseAdd = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAdd(false);
  };


  const [openModifier, setOpenModifier] = React.useState(false);
  const handleCloseModifier = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenModifier(false);
  };






  const navigate = useNavigate();



  const [ListConge, setListConge] = useState([]);


  useEffect(() => {

   

  }, []);









  const formikUpdate = useFormik({
    initialValues: {
      code: localStorage.getItem('code'),
      libelle:localStorage.getItem('libelle'),
      datedepart: localStorage.getItem('datedepart'),
      datefin: localStorage.getItem('datefin'),
      description: localStorage.getItem('description'),
      acceptTerms: true,
    },
    validationSchema: Yup.object().shape({
      datedepart: Yup.date().required('La date de début est requise'),
      datefin: Yup.date()
        .required('La date de fin est requise')
        .min(Yup.ref('datedepart'), 'La date de fin doit être après la date de début'),

      code: Yup.string().required("code is required"),
      libelle: Yup.string().required("libelle is required"),
      description: Yup.string()
        .required("description is required")
        .min(6, "description must be at least 6 characters")
        .max(20, "description must not exceed 20 characters"),
      acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
    }),
    onSubmit: () => {

      const config = ({
        "Access-Control-Allow-Origin": "*",
      })

      const produitObject = {
        code: formikUpdate.values.code,
        type:formikUpdate.values.type,
        libelle:formikUpdate.values.libelle,
        matricule : localStorage.getItem('MATREmployee'),
        nomprenom : localStorage.getItem('NOMPRENOM1Employee'),
       // datedepart: formikUpdate.values.datedepart,
        datefin: formikUpdate.values.datefin,
        description: formikUpdate.values.description,
      };
      console.log();

      axios.put("https://localhost:44367/api/MajConge?datedepart=" + localStorage.getItem('datedepart'),
        produitObject,
        config).then(() => {

          getData();
          navigate('/Conge/ListeCongeE', { replace: true });
          setOpenModifier(true)

      
          localStorage.removeItem('code');
          localStorage.removeItem('libelle');
          localStorage.removeItem('datedepart');
          localStorage.removeItem('datefin');
          localStorage.removeItem('description');
          localStorage.removeItem('type');
          formikUpdate.resetForm();


        });
      formikUpdate.resetForm();
      setOpenMUP(false);


    },
  });



  const theme = useTheme();


  const columns = [

   
    { field: 'libelle', headerName: 'Type conge', width: 250 },
    { field: 'nbrjour', headerName: 'Nombre des jours', width: 200 },
    { field: 'datedepart', headerName: 'Date depart', width: 250 },
    { field: 'datefin', headerName: 'Date fin', width: 250 },
    { field: 'type', headerName: 'Type', width: 200 },
    {
      field: "Actions",
      headerName: "Actions",
      description: "Actions column.",
      sortable: false,
      width: 100,






      renderCell: (params) => {
        return (
          <>
            <Tooltip title="Modifier Congé" arrow>

              <Link to="/Conge/ListeCongeE"
                component={RouterLink}
              >

                <IconButton
                  onClick={(e) => handleClickOpenMUP(e, params.row)}
                  sx={{
                    '&:hover': {
                      background: theme.colors.primary.lighter
                    },
                    color: theme.palette.primary.main
                  }}
                  color="inherit"
                  size="small"
                >
                  <EditTwoToneIcon fontSize="small" />

                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Supprimer Employee" arrow>

              <IconButton
                onClick={(e) => handleClickOpen(e, params.row)}
                sx={{
                  '&:hover': { background: theme.colors.error.lighter },
                  color: theme.palette.error.main
                }}
                color="inherit"
                size="small"
              >
                <DeleteTwoToneIcon fontSize="small" />

              </IconButton>
            </Tooltip>



          </>

        );
      }

    }

  ]



  const config = ({
    "Access-Control-Allow-Origin": "*",
  })



  const getData = () => {
    axios.get("https://localhost:44367/api/MajCoge/GetMajCogeUtilisateur?matricule=" + localStorage.getItem('MATREmployee')+"&nomprenom="+localStorage.getItem('NOMPRENOM1Employee'), config).then((res) => {
      setListConge(res.data)
      console.log(res.data)
    })
  }

  useEffect(() => {
    axios.get("https://localhost:44367/api/MajCoge/GetMajCogeUtilisateur?matricule=" + localStorage.getItem('MATREmployee')+"&nomprenom="+localStorage.getItem('NOMPRENOM1Employee'), config).then((res) => {
    
      setListConge(res.data)
      console.log(res.data)
      // res.data.datedepart.substring(0, 10)
    })
  }, [])



  const onDelete = () => {

    axios.delete("https://localhost:44367/api/MajCoge/DeleteMajCogeUtilisateur?matricule="+ localStorage.getItem('MATREmployee')+"&nomprenom="+localStorage.getItem('NOMPRENOM1Employee')+"&datedepart="+localStorage.getItem('datedepart') , config).then((res) => {
      console.log(res.data);
      setListConge(ListConge.filter(element => element.datedepart !== deleteData.datedepart));
      setOpenA(true)
      // window.location.reload(true)
    })
    setOpen(false)

  }





  const [openA, setOpenA] = React.useState(false);
  const handleCloseA = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenA(false);
  };


  const Addbtn = { padding: 24 }

  return (

    <><>


      <BootstrapDialog
        PaperProps={{
          sx: {
            width: "100%",
            Height: "100%"
          }
        }}

        onClose={handleCloseM}
        aria-labelledby="customized-dialog-title"
        open={openM}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseM}>
          Ajouter Congé
        </BootstrapDialogTitle>
        <DialogContent dividers>



          <form onSubmit={formik.handleSubmit}>
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
                name="code"
                label="Code"
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
                    label="Type conge"
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
                label="type"
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
                label="description"
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


              <Button color="error" autoFocus variant="contained" onClick={handleCloseM}>
                Annuler
              </Button>
            </DialogActions>
          </form>




        </DialogContent>


      </BootstrapDialog>




      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Attention!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tu es sur de supprimer ce congé !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={onDelete} autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog> </>




      <BootstrapDialog
        PaperProps={{
          sx: {
            width: "100%",
            Height: "100%"
          }
        }}

        onClose={handleCloseMUP}
        aria-labelledby="customized-dialog-title"
        open={openMUP}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseMUP}>
          Modifier Congé
        </BootstrapDialogTitle>
        <DialogContent dividers>

          <form onSubmit={formikUpdate.handleSubmit}>
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
                name="code"
                label="Code"
                disabled
                variant="outlined"
                margin="normal"
                value={formikUpdate.values.code}
                onChange={formikUpdate.handleChange}
                error={formikUpdate.touched.code && Boolean(formikUpdate.errors.code)}
                helperText={formikUpdate.touched.code && formikUpdate.errors.code}
              />

            <TextField
                    id="outlined-select"
                    name="libelle"
                    label="Type conge"
                    variant="outlined"
                    margin="normal"
                    select
                    value={formikUpdate.values.libelle}
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
                label="type"
                disabled
                variant="outlined"
                margin="normal"
                value={formikUpdate.values.type}
                onChange={formikUpdate.handleChange}
                error={formikUpdate.touched.type && Boolean(formikUpdate.errors.type)}
                helperText={formikUpdate.touched.code && formikUpdate.errors.type}
              />

<input type='hidden' value={formikUpdate.values.libelle} onChange={formikUpdate.handleChange} />


              <TextField
                id="outlined-number"
                name="datedepart"
                disabled
                variant="outlined"

                margin="normal"
                type="date"
                value={formikUpdate.values.datedepart}
                onChange={formikUpdate.handleChange}
                error={formikUpdate.touched.datedepart && Boolean(formikUpdate.errors.datedepart)}
                helperText={formikUpdate.touched.datedepart && formikUpdate.errors.datedepart}

              />

              <TextField
                id="outlined-number"
                name="datefin"

                variant="outlined"
                margin="normal"
                type="date"
                value={formikUpdate.values.datefin}
                onChange={formikUpdate.handleChange}
                error={formikUpdate.touched.datefin && Boolean(formikUpdate.errors.datefin)}
                helperText={formikUpdate.touched.datefin && formikUpdate.errors.datefin}

              />

              <TextField
                id="outlined-number"
                name="description"
                label="description"
                variant="outlined"

                margin="normal"
                value={formikUpdate.values.description}
                onChange={formikUpdate.handleChange}
                error={formikUpdate.touched.description && Boolean(formikUpdate.errors.description)}
                helperText={formikUpdate.touched.description && formikUpdate.errors.description}
              />

            </Box>
            <DialogActions>
              <Button type="submit" variant="contained" color="primary" >
                Valider
              </Button>
              <Button color="error" autoFocus variant="contained" onClick={handleCloseM}>
                Annuler
              </Button>
            </DialogActions>
          </form>



        </DialogContent>

      </BootstrapDialog>


      <PageTitleWrapper>

        <PageHeader />
      </PageTitleWrapper>

      <Container maxWidth="xl">
        <Card>


          <CardHeader style={Addbtn} sm={{

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
            title="Liste des congé(s) en attente(s)"

          />

          <Divider />
          <CardContent>

            <div style={{ height: 500, width: '100%' }}>
              <DataGrid
                // getRowId={(row) => row.internalId}
                rows={ListConge}
                columns={columns}
                // getRowId={(row: generateRandom) =>  generateRandom()}
              
                pageSize={5}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row: any) => row.datedepart}

              />
            </div>
          </CardContent>
        </Card>


        <Snackbar open={openA} autoHideDuration={3000} onClose={handleCloseA} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert onClose={handleCloseA} severity="error" lg={{ width: '100%' }}>
            Congé supprimé avec succée!
          </Alert>
        </Snackbar>
        <Snackbar open={openAdd} autoHideDuration={3000} onClose={handleCloseAdd} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert onClose={handleCloseA} severity="success" lg={{ width: '100%' }}>
            Congé ajouter avec succée!
          </Alert>
        </Snackbar>


        <Snackbar open={openModifier} autoHideDuration={3000} onClose={handleCloseModifier} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert onClose={handleCloseA} severity="success" lg={{ width: '100%' }}>
            Congé Modifier avec succée!
          </Alert>
        </Snackbar>

      </Container>

      <Typography style={{ color: 'transparent' }}>aaaaa </Typography>
      <Typography style={{ color: 'transparent' }}>aaaaa </Typography>
    </>
  );
};


export default ListCongeE;
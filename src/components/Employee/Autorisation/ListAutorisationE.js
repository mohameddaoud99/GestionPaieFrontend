import { TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import PageHeader from './PageHeader';
import Snackbar from '@mui/material/Snackbar';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DialogTitle from '@mui/material/DialogTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { useTheme } from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';



import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom'
import {
  Divider, Card, Tooltip, IconButton,
  CardHeader, Container, CardContent, Link
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


function ListAutorisationE() {






  const formik = useFormik({
    initialValues: {
      date: "",
      nbrheure: "",
   
      description: "",
      acceptTerms: true,
    },
    validationSchema: Yup.object().shape({



      date: Yup.date().required("date is required"),
      nbrheure: Yup.string().required('La Nom est requise'),
     
      description: Yup.string().required('Email is required'),

      acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
    }),
    onSubmit: () => {

      const config = ({
        "Access-Control-Allow-Origin": "*",
      })

      const produitObject = {
        date: formik.values.date,
        nbrheure: formik.values.nbrheure,
        matricule: localStorage.getItem('MATREmployee'),
        nomprenom: localStorage.getItem('NOMPRENOM1Employee'),
        description: formik.values.description,
       
       

      };

      console.log(produitObject);

      axios.post("https://localhost:44367/api/Autorisation", produitObject, config).then(
        (res) => {

          console.log(res.data)

          setListTypeConge([...ListTypeConge, res.data]);
          navigate('/Autorisation/ListeAutorisationE', { replace: true });
          setOpenAddSnack(true)


        });
      formik.resetForm();
      console.log(produitObject);
      setOpenModalAdd(false);




    },
  });


  const formikUpdate = useFormik({
    initialValues: {
      date: "",
      nbrheure: "",
      
      description: "",
      acceptTerms: true,
    },
    validationSchema: Yup.object().shape({
      date: Yup.string().required("date est requis"),
      nbrheure: Yup.string().required('nbrheure is requis'),
      
      description: Yup.string().required('description est requis'),
      acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
    }),
    onSubmit: () => {

      const config = ({
        "Access-Control-Allow-Origin": "*",
      })

      const produitObject = {
        date: formikUpdate.values.date,
        nbrheure: formikUpdate.values.nbrheure,
      
        description: formikUpdate.values.description,
        matricule: localStorage.getItem('MATREmployee'),
        nomprenom: localStorage.getItem('NOMPRENOM1Employee'),
      };
      console.log();

      axios.put("https://localhost:44367/api/Autorisation?date=" + localStorage.getItem('date'),
        produitObject,
        config).then(() => {

          getData();
          navigate('/Autorisation/ListeAutorisationE', { replace: true });
          setopenModifierSnack(true)


          localStorage.removeItem('date');
          localStorage.removeItem('nbrheure');
         
          localStorage.removeItem('description');
          formikUpdate.resetForm();


        });
      formikUpdate.resetForm();
      setOpenMUP(false);


    },
  });



  // *********************************************Modal state Add*****************************************
  const [openModalAdd, setOpenModalAdd] = React.useState(false);
  const handleCloseModalAdd = () => {
    setOpenModalAdd(false);
    formik.resetForm();
  };
  const handleClickOpenModalAdd = () => {
    setOpenModalAdd(true);
  };


  // *************************************************Modal state Update************************************
  const [openMUP, setOpenMUP] = React.useState(false);

  const handleClickOpenMUP = (e, val) => {
    setOpenMUP(true);
    let { date, nbrheure,  description } = val;

    localStorage.setItem('date', date.substring(0, 10));
    localStorage.setItem('nbrheure', nbrheure);
  
    localStorage.setItem('description', description);



    formikUpdate.initialValues.date = localStorage.getItem('date');
    formikUpdate.initialValues.nbrheure = localStorage.getItem('nbrheure');
  
    formikUpdate.initialValues.description = localStorage.getItem('description');

  };
  const handleCloseMUP = () => {
    setOpenMUP(false);
    formikUpdate.resetForm();
  };

  // *************************************************Modal state Delete************************************
  const [openModalDelete, setopenModalDelete] = React.useState(false);
  const [deleteData, setDeleteData] = useState({});

  const handleClickOpenModalDelete = (e, val) => {
    setopenModalDelete(true);
    setDeleteData(val)
  };
  const handleCloseModalDelete = () => {
    setopenModalDelete(false);
  };




  // *************************************************snackbar Add*******************************************************************************
  const [openAddSnack, setOpenAddSnack] = React.useState(false);
  const handleCloseAddSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAddSnack(false);
  };

  // ****************************************************snackbar update**********************************************************************

  const [openModifierSnack, setopenModifierSnack] = React.useState(false);
  const handleCloseModifierSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setopenModifierSnack(false);
  };

  // ****************************************************snackbar delete*************************************************************
  const [openDeleteSnack, setopenDeleteSnack] = React.useState(false);
  const handleCloseDeleteSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setopenDeleteSnack(false);
  };
  // **************************************************************************************************************************



  const navigate = useNavigate();

  const theme = useTheme();



  const behavior = {
    columnResizeMode: 'growAndShrink'
  }

  const appearance = {
    alternationCount: 2,
    showRowHeader: true,
    showRowHeaderSelectIcon: true,
    showRowHeaderFocusIcon: true
  }

  const columns = [


    { field: 'date', headerName: 'Date', width: 250 },
    { field: "nbrheure", headerName: "Nombres d'heures", width: 300 },
    { field: 'description', headerName: 'Description', width: 300 },
    {
      field: "Actions",
      headerName: "Actions",
      description: "Actions column.",
      sortable: false,
      width: 100,




      renderCell: (params) => {
        return (
          <>
            <Tooltip title="Modifier Employee" arrow>

              <Link to="/Autorisation/ListeAutorisationE"
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
            <Tooltip title="Supprimer type congé" arrow>

              <IconButton
                onClick={(e) => handleClickOpenModalDelete(e, params.row)}
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



  const [ListTypeConge, setListTypeConge] = useState([]);

  const config = ({
    "Access-Control-Allow-Origin": "*",
  })

  const getData = () => {
    axios.get("https://localhost:44367/api/Autorisation/GetAutorisationByUser?matricule=" + localStorage.getItem('MATREmployee') + "&nomprenom=" + localStorage.getItem('NOMPRENOM1Employee'), config).then((res) => {
      setListTypeConge(res.data)
      console.log(res.data)
    })
  }

  useEffect(() => {
    axios.get("https://localhost:44367/api/Autorisation/GetAutorisationByUser?matricule=" + localStorage.getItem('MATREmployee') + "&nomprenom=" + localStorage.getItem('NOMPRENOM1Employee'), config).then((res) => {
      setListTypeConge(res.data)
      // console.log(res.data)
    })
  }, [])

  const onDelete = () => {

    axios.delete("https://localhost:44367/api/Autorisation/DeleteMajCogeUtilisateur?matricule=" + localStorage.getItem('MATREmployee') + "&nomprenom=" + localStorage.getItem('NOMPRENOM1Employee') + "&date=" + deleteData.date, config).then((res) => {
      console.log(res.data);
      setListTypeConge(ListTypeConge.filter(element => element.date !== deleteData.date));
      setopenDeleteSnack(true)
      // window.location.reload(true)
    })
    setopenModalDelete(false)
  }




  return (

    <>

      <BootstrapDialog
        PaperProps={{
          sx: {
            width: "100%",
            Height: "100%"
          }
        }}

        onClose={handleCloseModalAdd}
        aria-labelledby="customized-dialog-title"
        open={openModalAdd}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseModalAdd}>
          Ajouter autorisation       </BootstrapDialogTitle>
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
                name="date"
                label=""
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
                label="Nombre heures"
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
                label="Description"
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


              <Button color="error" autoFocus variant="contained" onClick={handleCloseModalAdd}>
                Annuler
              </Button>
            </DialogActions>
          </form>

        </DialogContent>
      </BootstrapDialog>



      <Dialog
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-Telephone"
      >
        <DialogTitle id="alert-dialog-title">
          {"Attention!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-Telephone">
            Tu es sur de supprimer cette autorisation !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalDelete}>Annuler</Button>
          <Button onClick={onDelete} autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>


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
          Modifier Autorisation
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
                name="date"
                label=""
                variant="outlined"
                margin="normal"
                type="date"
                value={formikUpdate.values.date}
                onChange={formikUpdate.handleChange}
                error={formikUpdate.touched.date && Boolean(formikUpdate.errors.date)}
                helperText={formikUpdate.touched.date && formikUpdate.errors.date}
              />

              <TextField
                id="outlined-number"
                name="nbrheure"
                variant="outlined"

                margin="normal"
                type="number"
                value={formikUpdate.values.nbrheure}
                onChange={formikUpdate.handleChange}
                error={formikUpdate.touched.nbrheure && Boolean(formikUpdate.errors.nbrheure)}
                helperText={formikUpdate.touched.nbrheure && formikUpdate.errors.nbrheure}

              />


            



              <TextField
                id="outlined-number"
                name="description"
                label="Autre Type"
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
              <Button color="error" autoFocus variant="contained" onClick={handleCloseMUP}>
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
          <CardHeader style={{ padding: 24 }} sm={{

            display: 'grid',
            columnGap: 2,
            rowGap: 1,
            gridTemplateColumns: 'repeat(1, 1fr)',
            spacing: 2,
          }}
            action={
              <Button sx={{ mt: { xs: 2, md: 0 } }}
                variant="contained"
                startIcon={<AddTwoToneIcon fontSize="small" />} margin={20} onClick={handleClickOpenModalAdd}>
                Ajouter
              </Button>
            }
            title="Liste des autorisation(s) en attente(s)"
          />
          <Divider />
          <CardContent>
            <div style={{ height: 500, width: '100%' }}>
              <DataGrid
                // getRowId={(row) => row.internalId}
                rows={ListTypeConge}
                columns={columns}
                // getRowId={(row: generateRandom) =>  generateRandom()}
                // getRowId={(row) => row.EmployeeId}
                // getRowId={(row: any) => row.EmployeeId} 
                pageSize={5}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row: any) => row.date}
                appearance={appearance}
                behavior={behavior}
              />
            </div>
          </CardContent>
        </Card>
        <Snackbar open={openAddSnack} autoHideDuration={3000} onClose={handleCloseAddSnack} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert onClose={handleCloseAddSnack} severity="success" lg={{ width: '100%' }}>
            Type congé ajouté avec succée!
          </Alert>
        </Snackbar>
        <Snackbar open={openDeleteSnack} autoHideDuration={3000} onClose={handleCloseDeleteSnack} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert onClose={handleCloseDeleteSnack} severity="error" lg={{ width: '100%' }}>
            Type congé supprimé avec succée!
          </Alert>
        </Snackbar>
        <Snackbar open={openModifierSnack} autoHideDuration={3000} onClose={handleCloseModifierSnack} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert onClose={handleCloseModifierSnack} severity="success" lg={{ width: '100%' }}>
            Employee Modifier avec succée!
          </Alert>
        </Snackbar>

        <br/><br/>

      </Container>
      
    </>
  );
}
export default ListAutorisationE;
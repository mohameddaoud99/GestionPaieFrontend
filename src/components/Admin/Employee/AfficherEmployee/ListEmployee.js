
import {   Button  } from "@mui/material";


import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';
import Snackbar from '@mui/material/Snackbar';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import GradingTwoToneIcon from '@mui/icons-material/GradingTwoTone';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { useNavigate } from 'react-router-dom'


import {
  Divider, Card, Tooltip, IconButton, useTheme, 
  CardHeader, Container, CardContent,Link
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








const AfficherEmployee = () => {
  
 const handleClickOpenMUP = (e, val) => {
   
    let {  CIN,  ADRESSE,MATR, TELEPHONE, NOMPRENOM1 ,NAIS,SEXE, BANQUEPER,numcompte,PAYEMENT,nbmois,email,SALB,TXCNSS} = val;

    localStorage.setItem('CINEmplyee', CIN);
    localStorage.setItem('emailEmplyee', email);
    localStorage.setItem('ADRESSEEmplyee', ADRESSE);
    localStorage.setItem('TELEPHONEEmplyee', TELEPHONE);
    localStorage.setItem('MATREmplyee', MATR);
    localStorage.setItem('NOMPRENOM1Emplyee', NOMPRENOM1);
    localStorage.setItem('NAISEmplyee', NAIS.substring(0, 10));
    localStorage.setItem('SEXEEmplyee', SEXE);
     
    localStorage.setItem('BANQUEPEREmplyee', BANQUEPER);
   
    localStorage.setItem('numcompteEmplyee', numcompte);
    localStorage.setItem('PAYEMENTEREmplyee', PAYEMENT);
    localStorage.setItem('SALB', SALB);
    localStorage.setItem('TXCNSS', TXCNSS);
    localStorage.setItem('nbmoisEmplyee', nbmois);

  };


 // *************************************************Modal state Delete************************************
  const [open, setOpen] = React.useState(false);
  const [deleteData, setDeleteData] = useState({});

  const handleClickOpen = (e, val) => {
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

  const navigate = useNavigate();

  
 
  const [ListEmployee, setListEmployee] = useState([]);


  useEffect(() => {
    
    console.log(localStorage.getItem('MATREmplyee'))

  }, []);



  


  const DetailsEmployee = (e, val) => {
    navigate('/Employee/DetailsEmployee')
    let {  CIN, MATR, ADRESSE, TELEPHONE,NOMPRENOM1,SEXE, NAIS,BANQUEPER,numcompte,PAYEMENT,nbmois,email,SALB,TXCNSS} = val;
  
    localStorage.setItem('CINEmplyee', CIN);
    localStorage.setItem('emailEmplyee', email);
    localStorage.setItem('MATREmplyee', MATR);
    localStorage.setItem('ADRESSEEmplyee', ADRESSE);
    localStorage.setItem('TELEPHONEEmplyee', TELEPHONE);
  
    localStorage.setItem('NOMPRENOM1Emplyee', NOMPRENOM1);
    localStorage.setItem('SEXEEmplyee', SEXE);
    localStorage.setItem('NAISEmplyee', NAIS);

    localStorage.setItem('BANQUEPEREmplyee', BANQUEPER);
    localStorage.setItem('numcompteEmplyee', numcompte);
    localStorage.setItem('PAYEMENTEREmplyee', PAYEMENT);
    
    localStorage.setItem('nbmoisEmplyee', nbmois);
    localStorage.setItem('SALB', SALB);
    localStorage.setItem('TXCNSS', TXCNSS);


  };


 


  const Details = (e, val) => {
    navigate('/Employee/CongeEmployee')
    let {   MATR,NOMPRENOM1} = val;
    
    
    localStorage.setItem('MATREmplyee', MATR);
   
  
    localStorage.setItem('NOMPRENOM1Employee', NOMPRENOM1);
  
  

  };

  const DetailsAutorisation = (e, val) => {
    navigate('/Employee/AutorisationEmployee')
    let {   MATR,NOMPRENOM1} = val;
    
    
    localStorage.setItem('MATREmplyee', MATR);
   
  
    localStorage.setItem('NOMPRENOM1Employee', NOMPRENOM1);
  
  

  };

  const theme = useTheme();


  const columns = [

    { field: 'CIN', headerName: 'CIN', width: 160 },
    { field: 'NOMPRENOM1', headerName: 'NOM ET PERNOM', width: 200 },
    { field: 'ADRESSE', headerName: 'ADRESSE', width: 285},
    { field: 'TELEPHONE', headerName: 'TELEPHONE' , width: 165},
    { field: 'email', headerName: 'EMAIL', width: 250},
   
   
   

    {
      field: "Actions",
      headerName: "ACTIONS",
      TELEPHONE: "Actions column.",
      sortable: false,
      width: 165,






      renderCell: (params) => {
        return (
          <>
            <Tooltip title="Modifier employé" arrow>

              <Link to="/Employee/ModifierEmployee"
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

            <Tooltip title="Supprimer employé" arrow>

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

            

            <Tooltip title="Details autorisation d'employé" arrow>

            <IconButton
            onClick={(e) => DetailsAutorisation(e, params.row)}
              
              sx={{
                '&:hover': { background: theme.colors.error.lighter },
                color: theme.palette.grey.main
              }}
              color="inherit"
              size="small"
            >
              <GradingTwoToneIcon fontSize="small" />

            </IconButton>
            </Tooltip>


            <Tooltip title="Details Conge d'employé" arrow>

              <IconButton
               onClick={(e) => Details(e, params.row)}
                
                sx={{
                  '&:hover': { background: theme.colors.error.lighter },
                  color: theme.palette.warning.main
                }}
                color="inherit"
                size="small"
              >
                <GradingTwoToneIcon fontSize="small" />

              </IconButton>
            </Tooltip>


            <Tooltip title="Details employé" arrow>

              <IconButton
               onClick={(e) => DetailsEmployee(e, params.row)}
                
                sx={{
                  '&:hover': { background: theme.colors.error.lighter },
                  color: theme.palette.success.main
                }}
                color="inherit"
                size="small"
              >
                <VisibilityIcon fontSize="small" />

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





  useEffect(() => {
    axios.get("https://localhost:44367/api/Personnel" , config).then((res) => {
      setListEmployee(res.data)
      console.log(res.data)
      // res.data.MATR.substring(0, 10)
    })
  }, [])



  const onDelete = () => {

    axios.delete("https://localhost:44367/api/Personnel?MATR=" + deleteData.MATR, config).then((res) => {
      console.log(res.data);
      setListEmployee(ListEmployee.filter(element => element.MATR !== deleteData.MATR));
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


   




      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-TELEPHONE"
      >
        <DialogTitle id="alert-dialog-title">
          {"Attention!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-TELEPHONE">
            Tu es sur de supprimer ce Employé !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={onDelete} autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog> </>




     
    

     
        
    


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
           
   <Button
   to="/Employee/AjouterEmployee"
   component={RouterLink}
     sx={{ mt: { xs: 2, md: 0 } }}
     variant="contained"
     startIcon={<AddTwoToneIcon fontSize="small" />}
   >
     Ajouter
   </Button>
            }
            title="Liste des employés"

          />

          <Divider />
          <CardContent>

            <div style={{ height: 500, width: '100%' }}>
              <DataGrid
                // getRowId={(row) => row.internalId}
                rows={ListEmployee}
                columns={columns}
                // getRowId={(row: generateRandom) =>  generateRandom()}
              
                pageSize={5}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row: any) => row.MATR}

              />
            </div>
          </CardContent>
        </Card>

      
        <Snackbar open={openA} autoHideDuration={3000} onClose={handleCloseA} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert onClose={handleCloseA} severity="error" lg={{ width: '100%' }}>
            Employé supprimé avec succée!
          </Alert>
        </Snackbar>
        
        <Snackbar open={openAdd} autoHideDuration={3000} onClose={handleCloseAdd} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert onClose={handleCloseA} severity="success" lg={{ width: '100%' }}>
            Employé ajouté avec succée!
          </Alert>
        </Snackbar>


     <br/><br/>
      </Container>

     
    </>
  );
};


export default AfficherEmployee;
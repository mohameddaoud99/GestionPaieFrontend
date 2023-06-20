
import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import Snackbar from '@mui/material/Snackbar';

import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';

import DoneAllSharpIcon from '@mui/icons-material/DoneAllSharp';
import RemoveDoneSharpIcon from '@mui/icons-material/RemoveDoneSharp';

import {
    Tooltip, IconButton, useTheme, 
   Container, CardContent, Typography,Divider, Card, CardHeader
} from '@mui/material';

import { DataGrid } from '@mui/x-data-grid'
import {  Grid } from '@mui/material';


import {
  GridToolbar,

} from '@mui/x-data-grid-premium';
// import Footer from '../../Footer/index'

import MuiAlert from '@mui/material/Alert';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

// Alert function
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



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



const AllConge = () => {


  const [ListConge, setListConge] = useState([]);


  useEffect(() => {
  
    console.log(localStorage.getItem('IDEmployee'))

  }, []);


  const theme = useTheme();
  const columns = [

    { field: 'nomprenom', headerName: 'EMPLOYE ', width: 180  },
    { field: 'libelle', headerName: 'TYPE CONGE', width: 290 },
    { field: 'nbrjour', headerName: 'NOMBRE DE JOURS', width: 170 },
    { field: 'datedepart', headerName: 'DATE DEBUT', width: 200 },
    { field: 'datefin', headerName: 'DATE FIN', width: 200 },
    { field: 'type', headerName: 'TYPE', width: 120 },
  
    {
      field: "Actions",
      headerName: "Actions",
      description: "Actions column.",
      sortable: false,
      width: 90,

      renderCell: (params) => {
        return (
          <>
            <Tooltip title="Refuser congé" arrow>

              <IconButton
                onClick={(e) => handleClickOpenMUP(e, params.row)}
                sx={{
                  '&:hover': {
                    background: theme.colors.error.lighter
                  },
                  color: theme.palette.error.main
                }}
                color="inherit"
                size="small"
              >
                <RemoveDoneSharpIcon fontSize="medium" />

              </IconButton>
            </Tooltip>
            
            <Tooltip title="Accepter congé" arrow>

              <IconButton
                onClick={(e) => handleClickOpen(e, params.row)}
                sx={{
                  '&:hover': { background: theme.colors.success.lighter },
                  color: theme.palette.success.main
                }}
                color="inherit"
                size="small"
              >
                <DoneAllSharpIcon fontSize="medium" />

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
    axios.get("https://localhost:44367/api/MajCoge/GetAllCongeEnAttante" , config).then((res) => {
      setListConge(res.data)
      console.log(res.data)
     
    })
  }, [])


  const AccepteConge = () => {

    axios.put("https://localhost:44367/api/MajCoge/PutAccepter?datedepart=" + AccepteData.datedepart.substring(0, 10), config).then((res) => {
      console.log(res.data);
      setListConge(ListConge.filter(element => element.datedepart !== AccepteData.datedepart));
      setOpen(false)
      setOpenAdd(true)
     
    })
    setOpen(false)

  }

 const RefuseConge = () => {

    axios.put("https://localhost:44367/api/MajCoge/PutCongeRefuser?datedepart=" + RefuseData.datedepart, config).then((res) => {
      console.log(res.data);
      setListConge(ListConge.filter(element => element.datedepart !== RefuseData.datedepart));
      setOpenMUP(false)
      setOpenA(true)
    
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

  const [openAdd, setOpenAdd] = React.useState(false);
  const handleCloseAdd = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAdd(false);
  };


  const [open, setOpen] = React.useState(false);
  const [AccepteData, setAccepteData] = useState({});
  const [RefuseData, setRefuseData] = useState({});


  const handleClickOpen = (e, val) => {
    setOpen(true);
    setAccepteData(val)
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Modal state Update
  const [openMUP, setOpenMUP] = React.useState(false);

  const handleClickOpenMUP = (e, val) => {
    setOpenMUP(true);
    setRefuseData(val)
  };
  const handleCloseMUP = () => {
    setOpenMUP(false);
  };
  // end modal state Update



  return (

    <><>


    <Dialog
        open={openMUP}
        onClose={handleCloseMUP}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Attention!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tu es sur de refuser cet congé !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMUP}>Annuler</Button>
          <Button onClick={RefuseConge} autoFocus>
            Oui
          </Button>
        </DialogActions>
      </Dialog> 
      





      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">

        <DialogTitle id="alert-dialog-title">
          {"Attention!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tu es sur d'accepter ce congé !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={AccepteConge} autoFocus>
            Oui
          </Button>
        </DialogActions>
      </Dialog> 
       
      </>

      <PageTitleWrapper>

        
      <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom >
          Liste des congé(s) en attente(s)
        </Typography>
       
      </Grid>
     
    </Grid>
      </PageTitleWrapper>

      <Container maxWidth="xl">
        <Card >


          <CardHeader sm={{

            display: 'grid',

            columnGap: 2,
            rowGap: 1,
            gridTemplateColumns: 'repeat(1, 1fr)',
            spacing: 2,
          }}
           
            title="Liste des congé(s) en attente(s)"

          />

          <Divider />


      <Container maxWidth="xl">
      
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
        
        

        <Snackbar open={openA} autoHideDuration={3000} onClose={handleCloseA} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert onClose={handleCloseA} severity="error" lg={{ width: '100%' }}>
            Congé refusé avec succée!
          </Alert>
        </Snackbar>
        <Snackbar open={openAdd} autoHideDuration={3000} onClose={handleCloseAdd} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert onClose={handleCloseA} severity="success" lg={{ width: '100%' }}>
            Congé accepté avec succée!
          </Alert>
        </Snackbar>
      </Container>

      </Card>

</Container>
      <Typography style={{ color: 'transparent' }}>aaaaa </Typography>
      <Typography style={{ color: 'transparent' }}>aaaaa </Typography>
    </>
  );
};


export default AllConge;

 
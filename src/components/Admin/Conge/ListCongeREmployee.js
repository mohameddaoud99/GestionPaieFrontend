import * as React from 'react';
import { useState, useEffect } from 'react';
// import { format } from 'date-fns';
// import numeral from 'numeral';
import axios from 'axios';

import DialogTitle from '@mui/material/DialogTitle';

import Snackbar from '@mui/material/Snackbar';

import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';


import {
     IconButton,  
   Container, CardContent, Typography
} from '@mui/material';

import { DataGrid } from '@mui/x-data-grid'

import {
  GridToolbar,

} from '@mui/x-data-grid-premium';
// import Footer from '../../Footer/index'

import MuiAlert from '@mui/material/Alert';


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



const ListCongeREmployee = () => {


  const [ListConge, setListConge] = useState([]);


  useEffect(() => {
  
    console.log(localStorage.getItem('IDEmployee'))

  }, []);



  const columns = [

    { field: 'libelle', headerName: 'Type conge', width: 220 },
    { field: 'nbrjour', headerName: 'Nombre de jour', width: 150 },
    { field: 'datedepart', headerName: 'Date depart', width: 220 },
    { field: 'datefin', headerName: 'Date fin', width: 220 },
    { field: 'type', headerName: 'Type', width: 120 },
    
 

  ]


  const config = ({
    "Access-Control-Allow-Origin": "*",
  })

  useEffect(() => {
    axios.get("https://localhost:44367/api/MajCoge/GetCongesRefuserByIdE?matricule=" + localStorage.getItem('MATREmplyee'), config).then((res) => {
      setListConge(res.data)
      console.log(res.data)
     
    })
  }, [])



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



  // end modal state Update



  return (

    <><>


    



       
      </>




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

      <Typography style={{ color: 'transparent' }}>aaaaa </Typography>
      <Typography style={{ color: 'transparent' }}>aaaaa </Typography>
    </>
  );
};


export default ListCongeREmployee;
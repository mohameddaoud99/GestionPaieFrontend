import * as React from 'react';
import { useState, useEffect } from 'react';
// import { format } from 'date-fns';
// import numeral from 'numeral';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Snackbar from '@mui/material/Snackbar';
import { Grid } from '@mui/material';


import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';


import {
  Divider, Card, IconButton,
  CardHeader, Container, CardContent, Typography
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



const ListCongeR = () => {

  // Modal state Add
  const [openM, setOpenM] = React.useState(false);


  const handleCloseM = () => {
    setOpenM(false);
  };
  // end modal state Add



  // Modal state Update
  const [openMUP, setOpenMUP] = React.useState(false);


  const handleCloseMUP = () => {
    setOpenMUP(false);
  };
  // end modal state Update



  const [ListConge, setListConge] = useState([]);


  useEffect(() => {

    console.log(localStorage.getItem('IDEmployee'))

  }, []);



  const columns = [
    { field: 'nomprenom', headerName: 'EMPLOYE ', width: 220 },
    { field: 'libelle', headerName: 'TYPE CONGE', width: 300 },
    { field: 'nbrjour', headerName: 'NOMBRE DE JOURS', width: 200 },
    { field: 'datedepart', headerName: 'DATE DEBUT', width: 220 },
    { field: 'datefin', headerName: 'DATE FIN', width: 220 },
    { field: 'type', headerName: 'TYPE', width: 120 },


  ]


  const config = ({
    "Access-Control-Allow-Origin": "*",
  })




  useEffect(() => {
    axios.get("https://localhost:44367/api/MajCoge/GetAllCongeRefuser", config).then((res) => {
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


        <DialogActions>
          <Button type='submit' color="primary" autoFocus variant="contained">
            Valider
          </Button>
          <Button color="error" autoFocus variant="contained" onClick={handleCloseM}>
            Annuler
          </Button>
        </DialogActions>
      </BootstrapDialog>







    </>


      <BootstrapDialog
        PaperProps={{
          sx: {
            width: "100%",
            Height: "100%"
          }
        }}
        onClose={handleCloseMUP}
        aria-labelledby="customized-dialog-title"
        open={openMUP}>


        <DialogActions>
          <Button type='submit' color="primary" autoFocus variant="contained">
            Valider
          </Button>
          <Button color="error" autoFocus variant="contained" onClick={handleCloseM}>
            Annuler
          </Button>
        </DialogActions>
      </BootstrapDialog>


      <PageTitleWrapper>

        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Liste des congé(s) refusé(s)
            </Typography>

          </Grid>

        </Grid>
      </PageTitleWrapper>

      <Container maxWidth="xl">
        <Card>


          <CardHeader sm={{

            display: 'grid',

            columnGap: 2,
            rowGap: 1,
            gridTemplateColumns: 'repeat(1, 1fr)',
            spacing: 2,
          }}

            title="Liste des congés(s) refusé(s)"

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
      </Container>

      <Typography style={{ color: 'transparent' }}>aaaaa </Typography>
      <Typography style={{ color: 'transparent' }}>aaaaa </Typography>
    </>
  );
};


export default ListCongeR;
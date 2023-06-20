import * as React from 'react';
import { useState, useEffect } from 'react';
// import { format } from 'date-fns';
// import numeral from 'numeral';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { NavLink as RouterLink } from 'react-router-dom';

// import PageTitleWrapper from 'src/components/PageTitleWrapper';
// import PageHeader from './PageHeader';
import {
  Tooltip,
  Divider,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  CardHeader,
  Link,
  Container
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';


const ListCongeE = () => {

  const theme = useTheme();
  const [ListConge, setListeConge] = useState([]);
  const config = ({
    "Access-Control-Allow-Origin": "*",
  })


  useEffect(() => {
    axios.get("https://localhost:44333/api/Conge/GetCongesEnAttanteByIdE?idE="+localStorage.getItem('IDEmployee'),config).then((res)=>{
      setListeConge(res.data)
     // console.log(res.data)
    })
  }, [])

  


  const setData = (data) => {
    let { id, code, DateD, DateF,Description,etat } = data;
    localStorage.setItem('ID', id);
    localStorage.setItem('code', code);
    localStorage.setItem('DateD', DateD);
    localStorage.setItem('DateF', DateF);
    localStorage.setItem('Description', Description);
    localStorage.setItem('Etat', etat);
}


  const onDelete = () => {

    axios.delete("https://localhost:44333/api/Conge/" + deleteData.id, config).then((res) => {
      console.log(res.data);

      window.location.reload(true)
    })

  }


  const [open, setOpen] = React.useState(false);
  const [deleteData, setDeleteData] = useState({});


  const handleClickOpen = (val) => {
    setOpen(true);
    setDeleteData(val)
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (

    <><>  
    
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
    
 
    
    <Container maxWidth="lg">  
    <Card>
      
          <CardHeader
            />
        
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
               
                <TableCell>code</TableCell>
                <TableCell>Date Debut</TableCell>
                <TableCell>Date Fin</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Etat</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ListConge.map((val, ind) => {
               
                return (
                  <TableRow
                    hover
                    key={ind}
                  >
                    
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {val.code}
                      </Typography>

                    </TableCell>

                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {val.DateD.substring(0, 10)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {val.DateF.substring(0, 10)}
                      </Typography>

                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {val.Description}
                      </Typography>

                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {val.etat}
                      </Typography>

                    </TableCell>

                    <TableCell align="right">
                      <Tooltip title="Modifier Congé" arrow>
                      <Link to="/Conge/ModifierConge"
                      component={RouterLink}
                      >
                        <IconButton
                          onClick={() => setData(val)}
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
                      <Tooltip title="Supprimer Congé" arrow>
                        <IconButton
                          
                          onClick={() => handleClickOpen(val)}
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
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
       
      </Card>
      </Container>
      </>
  );
};



export default ListCongeE;
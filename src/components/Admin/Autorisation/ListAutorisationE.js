import { Button } from "@mui/material";

import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Grid } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import RemoveDoneSharpIcon from '@mui/icons-material/RemoveDoneSharp';


import DialogTitle from '@mui/material/DialogTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { useTheme } from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';

import DoneAllSharpIcon from '@mui/icons-material/DoneAllSharp';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

import { useNavigate } from 'react-router-dom'
import {
    Divider, Card, Tooltip, IconButton,
    CardHeader, Container, CardContent, Typography
} from '@mui/material';

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



    // *********************************************Modal state Add*****************************************
    const [openModalAdd, setOpenModalAdd] = React.useState(false);
    const handleCloseModalAdd = () => {
        setOpenModalAdd(false);

    };
    const handleClickOpenModalAdd = () => {
        // setOpenModalAdd(true);
        navigate('/Autorisations/AjouterAutorisationADMIN', { replace: true });
    };

    // *************************************************Modal state Update************************************

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

    const [openModalEdit, setopenModalEdit] = React.useState(false);
    const [EditData, setEditData] = useState({});
    const handleClickOpenModalEdit = (e, val) => {
        setopenModalEdit(true);
        setEditData(val)
    };
    const handleCloseModalEdit = () => {
        setopenModalEdit(false);
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


    // ****************************************************snackbar delete*************************************************************
    const [openDeleteSnack, setopenDeleteSnack] = React.useState(false);
    const handleCloseDeleteSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setopenDeleteSnack(false);
    };
    // **************************************************************************************************************************

    const [openEditSnack, setopenEditSnack] = React.useState(false);
    const handleCloseEditSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setopenEditSnack(false);
    };


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

        { field: 'matricule', headerName: 'MATRICULE ', width: 200 },
        { field: 'nomprenom', headerName: 'NOM ET PRENOM ', width: 250 },
        { field: 'date', headerName: 'DATE ', width: 220 },
        { field: 'nbrheure', headerName: "NOMBRE D'HEURES ", width: 200 },
        { field: 'description', headerName: 'DESCRIPTION', width: 250 },
        {
            field: "Actions",
            headerName: "ACTIONS",
            description: "Actions column.",
            sortable: false,
            width: 150,



            renderCell: (params) => {
                return (
                    <>
                        <Tooltip title="Accepter autorisation" arrow>



                            <IconButton
                                onClick={(e) => handleClickOpenModalEdit(e, params.row)}
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
                        <Tooltip title="Refuser autorisation" arrow>

                            <IconButton
                                onClick={(e) => handleClickOpenModalDelete(e, params.row)}
                                sx={{
                                    '&:hover': { background: theme.colors.error.lighter },
                                    color: theme.palette.error.main
                                }}
                                color="inherit"
                                size="small"
                            >
                                <RemoveDoneSharpIcon fontSize="medium" />

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

    /* const getData = () => {
        axios.get("https://localhost:44367/api/TypeCoge/GetTypeCoge", config).then((res) => {
            setListTypeConge(res.data)
            console.log(res.data)
        })
    } */

    useEffect(() => {
        axios.get("https://localhost:44367/api/Autorisation/GetAllCongeEnAttente", config).then((res) => {
            setListTypeConge(res.data)
            // console.log(res.data)
        })
    }, [])

    const onDelete = () => {

        axios.put("https://localhost:44367/api/Autorisation/PutAutorisationRefuser?matricule=" + deleteData.matricule + "&date=" + deleteData.date, config).then((res) => {
            console.log(res.data);
            setListTypeConge(ListTypeConge.filter(element => element.date !== deleteData.date));
            setopenDeleteSnack(true)
            // window.location.reload(true)
        })
        setopenModalDelete(false)
    }


    const onEdit = () => {

        axios.put("https://localhost:44367/api/Autorisation/PutAutorisationAccepter?matricule=" + EditData.matricule + "&date=" + EditData.date, config).then((res) => {
            console.log(res.data);
            setListTypeConge(ListTypeConge.filter(element => element.date !== EditData.date));
            setopenEditSnack(true)
            // window.location.reload(true)
        })
        setopenModalEdit(false)
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
                    Ajouter autorisation
                </BootstrapDialogTitle>

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
                        Tu es sur de refuser l'autorisation de ce employé !
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModalDelete}>Annuler</Button>
                    <Button onClick={onDelete} autoFocus>
                        Refuser autorisation
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={openModalEdit}
                onClose={handleCloseModalEdit}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-Telephone"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Attention!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-Telephone">
                        Tu es sur d'accepter l'autorisation de ce employé !
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModalEdit}>Annuler</Button>
                    <Button onClick={onEdit} autoFocus>
                        Accepter autorisation
                    </Button>
                </DialogActions>
            </Dialog>

            <PageTitleWrapper>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h3" component="h3" gutterBottom>
                            Liste des autorisation(s) en attente(s)
                        </Typography>

                    </Grid>

                </Grid>            </PageTitleWrapper>

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
                        autorisation refuser avec succée!
                    </Alert>
                </Snackbar>



                <Snackbar open={openEditSnack} autoHideDuration={3000} onClose={handleCloseEditSnack} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert onClose={handleCloseDeleteSnack} severity="success" lg={{ width: '100%' }}>
                        autorisation accepter avec succée!
                    </Alert>
                </Snackbar>

                <br /><br />
            </Container>

        </>
    );
}
export default ListAutorisationE;



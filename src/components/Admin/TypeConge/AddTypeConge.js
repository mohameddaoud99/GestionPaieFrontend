import * as React from 'react';
import { useEffect, useState } from 'react';
import { TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from '../../Employee/Conge/AffichageConge/PageHeader';
import { Divider, Card, CardHeader, Container, CardContent, Typography, IconButton, Link } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';

import { DataGrid } from '@mui/x-data-grid'
import { GridToolbar, } from '@mui/x-data-grid-premium';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar';
// import Label from 'src/components/Label';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { styled } from '@mui/material/styles';
import MuiAlert from '@mui/material/Alert';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import DialogContentText from '@mui/material/DialogContentText';
import { Tooltip, useTheme } from '@mui/material';



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


function ListTypeConge() {

    const formik = useFormik({
        initialValues: {
            
            Libelle: "",
            Type: "",
            AutreType: "",
            acceptTerms: true,
        },
        validationSchema: Yup.object().shape({



            Libelle: Yup.string().required('La Nom est requise'),
            Type: Yup.string().required('La Prenom est requise'),
            AutreType: Yup.string().required('Email is required'),

            acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
        }),
        onSubmit: () => {

            const config = ({
                "Access-Control-Allow-Origin": "*",
            })

            const produitObject = {
                
                libelle: formik.values.Libelle,
                type: formik.values.Type,
                AutreType: formik.values.AutreType,

            };



            axios.post("https://localhost:44367/api/TypeCoge", produitObject, config).then(
                (res) => {

                    console.log(res.data)

                    setListTypeConge([...ListTypeConge, res.data]);
                    navigate('/TypeConge/ListTypeConge', { replace: true });
                    setOpenAddSnack(true)


                });
            formik.resetForm();
            console.log(produitObject);
            setOpenModalAdd(false);

        },
    });


    const formikUpdate = useFormik({
        initialValues: {
           
            Libelle: localStorage.getItem('Libelle'),
            Type: localStorage.getItem('Type'),
            AutreType: localStorage.getItem('AutreType'),
            acceptTerms: true,
        },
        validationSchema: Yup.object().shape({
            
            Libelle: Yup.string().required('Libelle is requis'),
            Type: Yup.string().required('Type est requis'),
            AutreType: Yup.string(),
            acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
        }),
        onSubmit: () => {

            const config = ({
                "Access-Control-Allow-Origin": "*",
            })

            const produitObject = {
                
                libelle: formikUpdate.values.Libelle,
                type: formikUpdate.values.Type,
                AutreType: formikUpdate.values.AutreType,
            };
            console.log();

            axios.put("https://localhost:44367/api/TypeCoge?code=" + localStorage.getItem('Code'),
                produitObject,
                config).then(() => {

                    getData();
                    navigate('/TypeConge/ListTypeConge', { replace: true });
                    setopenModifierSnack(true)


                    localStorage.removeItem('Code');
                    localStorage.removeItem('Libelle');
                    localStorage.removeItem('Type');
                    localStorage.removeItem('AutreType');
                    formikUpdate.resetForm();


                });
            formikUpdate.resetForm();
            setOpenMUP(false);


        },
    });

    /* const Details = (e, val) => {
        navigate('/ListTypeConge/CongeEmployee')
        let { Code, Libelle, Type, AutreType } = val;

        localStorage.setItem('Code', Code);
        localStorage.setItem('Libelle', Libelle);
        localStorage.setItem('Type', Type);
        localStorage.setItem('AutreType', AutreType);

    }; */

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
        let { code, libelle, type, AutreType } = val;

        localStorage.setItem('Code', code);
        localStorage.setItem('Libelle', libelle);
        localStorage.setItem('Type', type);
        localStorage.setItem('AutreType', AutreType);



        formikUpdate.initialValues.Code = localStorage.getItem('Code');
        formikUpdate.initialValues.Libelle = localStorage.getItem('Libelle');
        formikUpdate.initialValues.Type = localStorage.getItem('Type');
        formikUpdate.initialValues.AutreType = localStorage.getItem('AutreType');

    };
    const handleCloseMUP = () => {
        setOpenMUP(false);
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


    /* useEffect(() => {

        console.log(localStorage.getItem('IDEmployee'))

    }, []); */




















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
        { field: 'code', headerName: 'Code', width: 100 },
        // { field: 'payer',headerName: 'payer',cellsFormat: 'c2',width: 180,},
        { field: 'libelle', headerName: 'libelle', width: 350 },
        {
            field: 'type', headerName: 'type', width: 150,
            formatFunction(settings) {
                if (settings.value === "Payé") {
                    settings.cell.background = '#00A45A';
                    settings.cell.color = '#fff';
                }
                else {
                    settings.cell.background = '#FFFDE1';
                    settings.cell.color = '#333';
                }
                settings.value = '$' + settings.value;
            }
        },
        // { field: 'esition', headerName: 'Edition', width: 180 },
        { field: 'AutreType', headerName: 'AutreType', width: 200 },
        {
            field: "Actions",
            headerName: "Actions",
            Telephone: "Actions column.",
            sortable: false,
            width: 160,


            renderCell: (params) => {
                return (
                    <>
                        <Tooltip title="Modifier Employee" arrow>

                            <Link to="/TypeConge/ListTypeConge"
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
        axios.get("https://localhost:44367/api/TypeCoge/GetTypeCoge", config).then((res) => {
            setListTypeConge(res.data)
            console.log(res.data)
        })
    }

    useEffect(() => {
        axios.get("https://localhost:44367/api/TypeCoge/GetTypeCoge", config).then((res) => {
            setListTypeConge(res.data)
            // console.log(res.data)
        })
    }, [])

    const onDelete = () => {

        axios.delete("https://localhost:44367/api/TypeCoge/DeleteTypeCoge?code=" + deleteData.code, config).then((res) => {
            console.log(res.data);
            setListTypeConge(ListTypeConge.filter(element => element.code !== deleteData.code));
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
                    Ajouter type conge
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
                                name="Libelle"
                                label="Libelle"
                                variant="outlined"
                                margin="normal"

                                value={formik.values.Libelle}
                                onChange={formik.handleChange}
                                error={formik.touched.Libelle && Boolean(formik.errors.Libelle)}
                                helperText={formik.touched.Libelle && formik.errors.Libelle}

                            />


                            <TextField
                                id="outlined-number"
                                name="Type"
                                label="Type"
                                variant="outlined"
                                margin="normal"

                                value={formik.values.Type}
                                onChange={formik.handleChange}
                                error={formik.touched.Type && Boolean(formik.errors.Type)}
                                helperText={formik.touched.Type && formik.errors.Type}

                            />


                            <TextField
                                id="outlined-number"
                                name="AutreType"
                                label="Autre type"
                                variant="outlined"

                                margin="normal"
                                value={formik.values.AutreType}
                                onChange={formik.handleChange}
                                error={formik.touched.AutreType && Boolean(formik.errors.AutreType)}
                                helperText={formik.touched.AutreType && formik.errors.AutreType}
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
                        Tu es sur de supprimer ce Employee !
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
                    Modifier type congé
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
                                name="Libelle"
                                variant="outlined"

                                margin="normal"

                                value={formikUpdate.values.Libelle}
                                onChange={formikUpdate.handleChange}
                                error={formikUpdate.touched.Libelle && Boolean(formikUpdate.errors.Libelle)}
                                helperText={formikUpdate.touched.Libelle && formikUpdate.errors.Libelle}

                            />

                            <TextField
                                id="outlined-number"
                                name="Type"

                                variant="outlined"
                                margin="normal"

                                value={formikUpdate.values.Type}
                                onChange={formikUpdate.handleChange}
                                error={formikUpdate.touched.Type && Boolean(formikUpdate.errors.Type)}
                                helperText={formikUpdate.touched.Type && formikUpdate.errors.Type}

                            />


                            <TextField
                                id="outlined-number"
                                name="Autre Type"
                                label="Autre Type"
                                variant="outlined"

                                margin="normal"
                                value={formikUpdate.values.AutreType}
                                onChange={formikUpdate.handleChange}
                                error={formikUpdate.touched.AutreType && Boolean(formikUpdate.errors.AutreType)}
                                helperText={formikUpdate.touched.AutreType && formikUpdate.errors.AutreType}
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
                        title="Liste des types de congés"
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
                                getRowId={(row: any) => row.code}
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

            </Container>
            <Typography style={{ color: 'transparent' }}>aaaaa </Typography>
            <Typography style={{ color: 'transparent' }}>aaaaa </Typography>
        </>
    );
}
export default ListTypeConge;
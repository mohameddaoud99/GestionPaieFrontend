import { TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Grid } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

import DialogTitle from '@mui/material/DialogTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

import MenuItem from '@mui/material/MenuItem';



import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom'
import {
    Divider, Card, IconButton,
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


function ListAutorisationA() {


    const [selectedOption, setSelectedOption] = useState('');


    const handleSelectChange = (event) => {
        formik.initialValues.payer = event.target.value;
        // formikUpdate.initialValues.payer = event.target.value;
        setSelectedOption(event.target.value);
    };


    const formik = useFormik({
        initialValues: {
            matricule: "",
            nom: "",
            date: "",
            nbHeures: "",
            payer: "",
            description: "",
            acceptTerms: true,
        },
        validationSchema: Yup.object().shape({


            matricule: Yup.string().required("matricule is required"),
            nom: Yup.string().required("nom is required"),
            date: Yup.date().required("date is required"),
            nbHeures: Yup.string().required('La Nom est requise'),
            payer: Yup.string().required('La Prenom est requise'),
            description: Yup.string().required('Email is required'),

            acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
        }),
        onSubmit: () => {

            const config = ({
                "Access-Control-Allow-Origin": "*",
            })

            const produitObject = {
                matricule: formik.values.matricule,
                nomprenom: formik.values.nom,
                date: formik.values.date,
                nbrheure: formik.values.nbHeures,
                payer: formik.values.payer,
                description: formik.values.description,


            };



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





    // *********************************************Modal state Add*****************************************
    const [openModalAdd, setOpenModalAdd] = React.useState(false);
    const handleCloseModalAdd = () => {
        setOpenModalAdd(false);
        formik.resetForm();
    };


    // *************************************************Modal state Update************************************


    // *************************************************Modal state Delete************************************
    const [openModalDelete, setopenModalDelete] = React.useState(false);



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
        { field: 'nomprenom', headerName: 'EMPLOYE ', width: 250 },
        { field: 'date', headerName: 'DATE ', width: 220 },
        { field: 'nbrheure', headerName: "NOMBRE D'HEURES ", width: 200 },
        { field: 'description', headerName: 'DESCRIPTION', width: 250 },


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
        axios.get("https://localhost:44367/api/Autorisation/GetAllAutorisationAccepter", config).then((res) => {
            setListTypeConge(res.data)
            // console.log(res.data)
        })
    }, [])




    const [nom, setMessagenom] = useState('');

    const handleChangperson = (event) => {

        const config = ({
            "Access-Control-Allow-Origin": "*",
        })

        axios.get("https://localhost:44367/api/Autorisation/GetUtilisateur?MATR=" + event.target.value, config)
            .then(res => {

                console.log(res.data);


                formik.values.matricule = event.target.value;

                formik.initialValues.nom = res.data[0].NOMPRENOM1;
                setMessagenom(res.data[0].NOMPRENOM1)




            })


    };



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
                                name="matricule"
                                label="matricule"
                                variant="outlined"
                                margin="normal"
                                onChange={handleChangperson}
                                error={formik.touched.matricule && Boolean(formik.errors.matricule)}
                                helperText={formik.touched.matricule && formik.errors.matricule}
                            />

                            <TextField
                                id="outlined-number"
                                name="nom"
                                label="nom"
                                disabled
                                variant="outlined"
                                margin="normal"
                                value={nom}
                                onChange={handleChangperson}
                                error={formik.touched.nom && Boolean(formik.errors.nom)}
                                helperText={formik.touched.nom && formik.errors.nom}
                            />

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
                                name="nbHeures"
                                label="Nombre heures"
                                variant="outlined"

                                margin="normal"
                                value={formik.values.nbHeures}
                                onChange={formik.handleChange}
                                error={formik.touched.nbHeures && Boolean(formik.errors.nbHeures)}
                                helperText={formik.touched.nbHeures && formik.errors.nbHeures}
                            />


                            <TextField
                                id="outlined-number"
                                name="payer"
                                label="Payement"
                                variant="outlined"
                                margin="normal"
                                select
                                value={selectedOption}
                                onChange={handleSelectChange}>
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="oui">Oui</MenuItem>
                                <MenuItem value="non">Non</MenuItem>

                            </TextField>


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


            </Dialog>



            <PageTitleWrapper>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h3" component="h3" gutterBottom>
                            Liste des autorisation(s) acceptée(s)
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

                        title="Liste des autorisation(s) acceptée(s)"
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
<br/><br/>
            </Container>
           
        </>
    );
}
export default ListAutorisationA;
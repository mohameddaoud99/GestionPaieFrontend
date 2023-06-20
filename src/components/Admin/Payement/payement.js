
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
    Divider,
    CardHeader,
    Container,
    Card,
    CardContent,
    Button,
    Typography,
    TextField

} from '@mui/material';
import axios from 'axios';
import DialogActions from '@mui/material/DialogActions';



import Box from '@mui/material/Box';

import * as React from 'react';
// import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
// import { useState } from 'react';


import { useFormik } from "formik";
import * as Yup from "yup";
import moment from 'moment';



function PayementEmployee() {
    const navigate = useNavigate();
    // const [PayementInfo, setPayementInfo] = useState([]);

    const formik = useFormik({
        initialValues: {
            datedebut: "",
            datefin: "",

            matricule: "",
            mois: "",
            acceptTerms: true,
        },
        validationSchema: Yup.object().shape({


            datedebut: Yup.date().required("date est obligatoire"),
            datefin: Yup.date().required("date est obligatoire")
            .min(Yup.ref('datedebut'), 'La date de fin doit être supèrireure la date début'),
            matricule: Yup.string().required("matricule est obligatoire"),
           
            mois: Yup.string().required("mois est obligatoire"),



            acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
        }),
        onSubmit: () => {
            // alert(values.datedepart).format("Y-M-D");


            const setData2 = (payementObject) => {
                let { datedebut, datefin, mois, matricule } = payementObject;
                localStorage.setItem('datedebut', datedebut.substring(0, 10));
                localStorage.setItem('datefin', datefin.substring(0, 10));
                localStorage.setItem('matricule', matricule);
                localStorage.setItem('mois', mois);
            }






            const config = ({
                "Access-Control-Allow-Origin": "*",
            })

            const payementObject = {
                datedebut: moment(formik.values.datedebut).format("Y-M-D"),
                datefin: moment(formik.values.datefin).format("Y-M-D"),
                matricule: formik.values.matricule,
                mois: formik.values.mois,


            };


            axios.get("https://localhost:44367/api//MajCoge/Dali?mat=" + payementObject.matricule + "&month=" + payementObject.mois + "&startDate=" + payementObject.datedebut + "&endDate=" + payementObject.datefin, config).then((res) => {

                console.log(res.data)
                console.log(res.data.nbheures)

                const aaa = {
                    nbtot: res.data.nbjours,
                    nbheure: res.data.nbheures,
                    salaireb: res.data.salaireb,
                    taxeCNSS: res.data.taxeCNSS,
                    montantEl: res.data.montantEl,
                    nbheuresaut: res.data.nbheuresaut,
                    prixheure: res.data.prixheure,
                    nomprenom:res.data.nomprenom,
                    salaireInit:res.data.salaireInit,
                    montantElAutorisation:res.data.montantElAutorisation,
                    montantElTaxe:res.data.montantElTaxe
                };

                const setData = (aaa) => {
                    let { nbtot, nbheure, salaireb, taxeCNSS, montantEl, nbheuresaut, prixheure,nomprenom,montantElTaxe,
                        montantElAutorisation,salaireInit} = aaa;
                    localStorage.setItem('nbtot', nbtot);
                    localStorage.setItem('nbheure', nbheure);
                    localStorage.setItem('salaireb', salaireb);
                    localStorage.setItem('taxeCNSS', taxeCNSS);
                    localStorage.setItem('mnt_el', montantEl);
                    localStorage.setItem('nbheuresaut', nbheuresaut);
                    localStorage.setItem('prixheure', prixheure);
                    localStorage.setItem('nomprenom', nomprenom);
                    localStorage.setItem('salaireInit', salaireInit);
                    localStorage.setItem('montantElAutorisation', montantElAutorisation);
                    localStorage.setItem('montantElTaxe', montantElTaxe);

                }

                setData(aaa);
                setData2(payementObject);
                navigate('/payement-details', { replace: true });



            });
            formik.resetForm();
            console.log(payementObject);

        },









    });



    /* useEffect(() => {
        formik.initialValues.datedebut = localStorage.getItem('datedebut');
        formik.initialValues.datefin = localStorage.getItem('datefin');
        formik.initialValues.matricule = localStorage.getItem('matricule');
        formik.initialValues.mois = localStorage.getItem('mois');

    }, []); */


    /* const handleBack = () => {
         navigate('/Employee/AfficherEmployee', { replace: true });
     }; */

    return (
        <>

            <PageTitleWrapper>
                <Typography variant="h3" component="h3" gutterBottom>
                Gérer payement
                </Typography>

            </PageTitleWrapper>
            <Container maxWidth="lg">
                <Card  >
                    <CardHeader sm={{

                        display: 'grid',

                        columnGap: 2,
                        rowGap: 1,
                        gridTemplateColumns: 'repeat(1, 1fr)',
                        spacing: 2,
                    }}

                        title="Gérer payement"

                    />

                    <Divider />
                    <CardContent>
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
                                    id="outlined-select"
                                    name="matricule"
                                    label="MATRICULE EMPLOYE"
                                    variant="outlined"
                                    margin="normal"
                                    value={formik.values.matricule}
                                    onChange={formik.handleChange}
                                    error={formik.touched.matricule && Boolean(formik.errors.matricule)}
                                    helperText={formik.touched.matricule && formik.errors.matricule}
                                />

                                <TextField
                                    id="outlined-select"
                                    name="datedebut"
                                    
                                    variant="outlined"
                                    type="DATE"
                                    margin="normal"
                                    value={formik.values.datedebut}
                                    onChange={formik.handleChange}
                                    error={formik.touched.datedebut && Boolean(formik.errors.datedebut)}
                                    helperText={formik.touched.datedebut && formik.errors.datedebut}
                                />


                                <TextField
                                    id="outlined-select"
                                    name="datefin"
                                    
                                    variant="outlined"
                                    type="date"
                                    margin="normal"
                                    value={formik.values.datefin}
                                    onChange={formik.handleChange}
                                    error={formik.touched.datefin && Boolean(formik.errors.datefin)}
                                    helperText={formik.touched.datefin && formik.errors.datefin}
                                />

                                <TextField
                                    id="outlined-select"
                                    name="mois"
                                    label="MOIS"
                                    variant="outlined"
                                    margin="normal"
                                    value={formik.values.mois}
                                    onChange={formik.handleChange}
                                    error={formik.touched.mois && Boolean(formik.errors.mois)}
                                    helperText={formik.touched.mois && formik.errors.mois}
                                />



                            </Box>
                            <DialogActions>


                                <Button type="submit" variant="contained" color="primary" >
                                    Valider
                                </Button>

                            </DialogActions>

                        </form>
                    </CardContent>
                </Card>
            </Container>

        </>
    );
}

export default PayementEmployee;

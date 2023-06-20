import * as React from 'react';
import { useState, useEffect } from 'react';
// import { format } from 'date-fns';
// import numeral from 'numeral';
import axios from 'axios';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
// import PageHeader from './PageHeader';
import {
  Divider, Card, CardHeader, Container, CardContent, Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'
import { GridToolbar } from '@mui/x-data-grid-premium';
import { Grid } from '@mui/material';



const ListCongeA = () => {




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
    axios.get("https://localhost:44367/api/MajCoge/GetAllCongeAccepter", config).then((res) => {
      setListConge(res.data)
      console.log(res.data)

    })
  }, [])


  return (

    <>
      <PageTitleWrapper>

        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Liste des congé(s) accepté(s)
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

            title="Liste des congé(s) accepté(s)"

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

      </Container>

      <Typography style={{ color: 'transparent' }}>aaaaa </Typography>
      <Typography style={{ color: 'transparent' }}>aaaaa </Typography>
    </>
  );
};


export default ListCongeA;
import * as React from 'react';
import {useEffect,useState } from 'react';
// import { format } from 'date-fns';
// import numeral from 'numeral';
import axios from 'axios';

import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './AffichageConge/PageHeader';




import {
  Divider, Card,  
  CardHeader, Container, CardContent, Typography
} from '@mui/material';

import { DataGrid } from '@mui/x-data-grid'

import {
  GridToolbar,

} from '@mui/x-data-grid-premium';








const ListCongeR = () => {




 












  //  const [elements, setElements] = useState([]);




  const columns = [

   
    { field: 'libelle', headerName: 'Type conge', width: 300 },
    { field: 'nbrjour', headerName: 'Nombre des jours', width: 200 },
    { field: 'datedepart', headerName: 'Date depart', width: 300 },
    { field: 'datefin', headerName: 'Date fin', width: 300 },
    { field: 'type', headerName: 'Type', width: 200 },
    

  ]

  const [ListConge, setListConge] = useState([]);


  const config = ({
    "Access-Control-Allow-Origin": "*",
  })

   useEffect(() => {
    axios.get("https://localhost:44367/api/MajCoge/GetCongesRefuserByIdE?matricule=" + localStorage.getItem('MATREmployee'), config).then((res) => {
      setListConge(res.data)
    })
  }, []) 


 


  return (

    <><></>
      
      


      <PageTitleWrapper>

        <PageHeader />
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
          
            title="Liste des congé(s) refusé(s)"

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


export default ListCongeR;
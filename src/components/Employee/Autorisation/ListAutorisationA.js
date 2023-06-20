import * as React from 'react';
import {useEffect,useState } from 'react';
// import { format } from 'date-fns';
// import numeral from 'numeral';
import axios from 'axios';

import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';




import {
  Divider, Card,  
  CardHeader, Container, CardContent, Typography
} from '@mui/material';

import { DataGrid } from '@mui/x-data-grid'

import {
  GridToolbar,

} from '@mui/x-data-grid-premium';



const ListAutorisationE = () => {

  const columns = [

    
   
    
    { field: 'date', headerName: 'Date', width: 300 },
    { field: "nbrheure", headerName: "Nombres d'heures", width: 300 },
    { field: 'payer', headerName: 'Payement', width: 300 },
    { field: 'description', headerName: 'Description', width: 300 },

  ]

  const [ListConge, setListConge] = useState([]);


  const config = ({
    "Access-Control-Allow-Origin": "*",
  })

  useEffect(() => {
    axios.get("https://localhost:44367/api/Autorisation/GetAutorisationAccepterByIdE?matricule=" + localStorage.getItem('MATREmployee'), config).then((res) => {
     
   // axios.get("https://localhost:44333/api/Conge/GetCongesAccepterByIdE?idE="+localStorage.getItem('IDEmployee'),config).then((res)=>{
      setListConge(res.data)
     // console.log(res.data)
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
          
            title="Liste des autorisation(s) accepté(s)"

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
    getRowId={(row: any) => row.date}

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


export default ListAutorisationE;
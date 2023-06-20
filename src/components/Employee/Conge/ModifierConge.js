
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  
} from '@mui/material';
import {  Button,Typography } from '@mui/material';
import axios from 'axios';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
// import moment from 'moment';

function ModifierConge() {
 
  const navigate = useNavigate();

  const [id, setID] = useState([]);
  const[code,setCode]=useState([]);
  const[DateD,setDateD]=useState([]);
  const[DateF,setDateF]=useState([]);
  const[Description,setDescription]=useState([]);
  
    
  
   
    useEffect(() => {
        setID(localStorage.getItem('ID'))
        setCode(localStorage.getItem('code'));
        setDateD(localStorage.getItem('DateD').substring(0, 10));
        setDateF(localStorage.getItem('DateF').substring(0, 10));
        setDescription(localStorage.getItem('Description'));
       
    }, []);



    const updateConge = () => {
        axios.put("https://localhost:44333/api/Conge/"+id, {
            code,DateD,DateF,Description
        }).then(() => {
           
        })
         navigate('/Conge/ListeConge');
    }
    

   

  return (
    <>
     
      <PageTitleWrapper>
      <Typography variant="h3" component="h3" gutterBottom>
        Congé 
        </Typography>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Modifier Congé" />
              
              <CardContent>
              
              <Box 
                onSubmit={updateConge}
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' }
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                   
                   
                
                    <TextField
                      id="outlined-number"
                      label="Code"
                      type="number"
                      value={code}
                      required
                      
                      onChange={e=>setCode(e.target.value)}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />

                    <TextField
                      id="outlined-number"
                      label="Date début"
                      type="date"
                      value={DateD}
                      onChange={e=>setDateD(e.target.value)}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />


                      <TextField
                      id="outlined-number"
                      label="Date Fin"
                      type="date"
                      value={DateF}
                      onChange={e=>setDateF(e.target.value)}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                   
                   <TextField
                      id="outlined-password-input"
                      label="Description"
                      type="text"
                      value={Description} 
                      onChange={e=>setDescription(e.target.value)}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                 
                   
                  </div>
                  
                  <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Valider
              </Button>
                </Box>


              
               
              </CardContent>
            </Card>
          </Grid>
        
     
        </Grid>
      </Container>
    
    </>
  );
}


export default ModifierConge;


import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@mui/material';
import { useState } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Footer from 'src/components/Footer';
import ListCongeEEmployee from '../../Conge/ListCongeEEmployee';
import ListCongeAEmployee from '../../Conge/ListCongeAEmployee';
import ListCongeREmployee from '../../Conge/ListCongeREmployee';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

function CongeEmployee() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // nom =localStorage.getItem('CinEmplyee');
  return (
    <>
    
      <PageTitleWrapper>
      <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h4" disableGutters='true'>
        Liste des Congés de {localStorage.getItem('NOMPRENOM1Employee')} 
        </Typography>
       
      </Grid>
      
    </Grid>
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
              <CardHeader title="Liste des congé " />
              <Divider />
              <CardContent>
                <Box sx={{ width: '100%' }}>
                  <Tabs
                    variant="scrollable"
                    scrollButtons="auto"
                    textColor="primary"
                    indicatorColor="primary"
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Conge en Attantes" {...a11yProps(0)} />
                    <Tab label="Conge Acceptés" {...a11yProps(1)} />
                    <Tab label="Conge refusés" {...a11yProps(2)} />
                  </Tabs>
                  <TabPanel value={value} index={0}>
                    <ListCongeEEmployee/>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <ListCongeAEmployee/>
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                  <ListCongeREmployee/>
                  </TabPanel>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default CongeEmployee;


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
import ListAutorisationEEmployee from '../../Autorisation/ListAutorisationEEmployee';
import ListAutorisationAEmployee from '../../Autorisation/ListAutorisationAEmployee';
import ListAutorisationREmployee from '../../Autorisation/ListAutorisationREmployee';

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

function AutorisationEmployee() {
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
        Liste des autorisation de {localStorage.getItem('NOMPRENOM1Employee')} 
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
              <CardHeader title="Liste des autorisations" />
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
                    <Tab label="Autorisation en Attantes" {...a11yProps(0)} />
                    <Tab label="Autorisation Acceptés" {...a11yProps(1)} />
                    <Tab label="Autorisation refusés" {...a11yProps(2)} />
                  </Tabs>
                  <TabPanel value={value} index={0}>
                    <ListAutorisationEEmployee/>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <ListAutorisationAEmployee/>
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                  <ListAutorisationREmployee/>
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

export default AutorisationEmployee;

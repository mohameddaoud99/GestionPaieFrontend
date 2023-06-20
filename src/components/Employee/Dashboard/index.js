import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Statistique from './Statistique';



function DashboardCrypto() {
  return (
    <>
      <Helmet>
        <title>Gestion de paie</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg" style={{ marginBottom: '10px' }}>
        <Grid style={{ marginBottom: '10px' }}
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
             <Grid item xs={12}>
            <Statistique />
          </Grid>
        </Grid>
        <br/>
      </Container>
      
    </>
  );
}

export default DashboardCrypto;

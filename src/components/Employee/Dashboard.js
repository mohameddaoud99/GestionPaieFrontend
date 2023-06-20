import React from "react";
import { Typography, Grid } from '@mui/material';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

function DashboardEmployee() {
  return (
    
<PageTitleWrapper>

      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h4" disableGutters='true'>
            Welcome {window.localStorage.getItem('Nom')}
          </Typography>

        </Grid>

      </Grid>
    </PageTitleWrapper>
  );
}

export default DashboardEmployee;
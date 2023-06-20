import { Typography, Grid } from '@mui/material';

// import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
// import { NavLink as RouterLink } from 'react-router-dom';

function PageHeader() {

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h4" disableGutters='true'>
         Les autorisations
        </Typography>
       
      </Grid>
      
    </Grid>
  );
}

export default PageHeader;

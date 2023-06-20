import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { NavLink as RouterLink } from 'react-router-dom';

function PageHeader() {

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Congé
        </Typography>
        <Typography variant="subtitle2">
         Liste des congé
        </Typography>
      </Grid>
      <Grid item>
        <Button
        to="/Conge/AjouterConge"
        component={RouterLink}
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Create transaction
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;

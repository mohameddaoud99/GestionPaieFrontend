import { Typography, Avatar, Grid, useTheme } from '@mui/material';

function PageHeader() {
  
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
        
          src="/static/images/avatars/3.jpg"
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Bienvenue, {window.localStorage.getItem('NOMPRENOM1Employee')}
        </Typography>
       
      </Grid>
    </Grid>
  );
}

export default PageHeader;

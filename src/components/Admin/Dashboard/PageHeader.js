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
        
          src="/static/images/avatars/person.png"
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Bienvenue, cher administrateur
        </Typography>
       
      </Grid>
    </Grid>
  );
}

export default PageHeader;

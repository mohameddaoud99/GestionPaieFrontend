import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Grid } from '@mui/material';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

import {
  Box,
  Container,
  Card,
  CardHeader,
  Divider,
  Avatar,
  useTheme,
  styled,
 
  // Button,
  // ListItemAvatar,
   // alpha
} from '@mui/material';

import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import { AccountBoxSharp } from '@mui/icons-material';


// import TrendingUp from '@mui/icons-material/TrendingUp';
// import Text from 'src/components/Text';
import Chart from 'react-apexcharts';


/* const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
); */
 
/* const ListItemAvatarWrapper = styled(ListItemAvatar)(
  ({ theme }) => `
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing(1)};
  padding: ${theme.spacing(0.5)};
  border-radius: 60px;
  background: ${
    theme.palette.mode === 'dark'
      ? theme.colors.alpha.trueWhite[30]
      : alpha(theme.colors.alpha.black[100], 0.07)
  };

  img {
    background: ${theme.colors.alpha.trueWhite[100]};
    padding: ${theme.spacing(0.5)};
    display: block;
    border-radius: inherit;
    height: ${theme.spacing(4.5)};
    width: ${theme.spacing(4.5)};
  }
`
); */


const AvatarPrimary = styled(Avatar)(


  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
`
);


const YourComponent = () => {
  const theme = useTheme();

  const chartOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%'
        }
      }
    },
    colors: ['#ff9900', '#1c81c2', '#333', '#5c6ac0'],
    dataLabels: {
      enabled: true,
      formatter(val) {
        return `${val}%`;
      },
      style: {
        colors: [theme.colors.alpha.trueWhite[100]]
      },
      background: {
        enabled: true,
        foreColor: theme.colors.alpha.trueWhite[100],
        padding: 8,
        borderRadius: 4,
        borderWidth: 0,
        opacity: 0.3,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: theme.colors.alpha.black[70],
          opacity: 0.5
        }
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: theme.colors.alpha.black[50],
        opacity: 0.5
      }
    },
    fill: {
      opacity: 1
    },
    labels: ['Bitcoin', 'Ripple', 'Cardano', 'Ethereum'],
    legend: {
      labels: {
        colors: theme.colors.alpha.trueWhite[100]
      },
      show: false
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    }
  };

  const chartSeries = [10, 20, 25, 45];

  const [listConge, setListConge] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:44367/api/Statistique/NbCongeParMois").then((res) => {
      setListConge(res.data);
    });
  }, []);

  const CustomCard = styled(Card)({
    width: '600px', // Set the desired width here
    // Additional styles if needed
  });

  return (


    <>
      <PageTitleWrapper>

        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h4" disableGutters='true'>
              Welcome {window.localStorage.getItem('Nom')}
            </Typography>
            {listConge}
          </Grid>

        </Grid>
      </PageTitleWrapper>

      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12} md={6}>
            <CustomCard>
              <CardHeader title="Les plus recentes activités " />
              <Divider />
              <Box px={2} py={4} display="flex" alignItems="flex-start">
                <AvatarPrimary>
                  <AccountBoxSharp />
                </AvatarPrimary>
                <Box pl={2} flex={1}>
                  <Typography sx={{ fontSize: `${theme.typography.pxToRem(18)}` }} variant="h3">Nombre des congés</Typography>

                  <Box pt={2} display="flex">
                    <Box pr={8}>
                      <Typography
                        gutterBottom
                        variant="caption"
                        sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                      >
                        Acceptés
                      </Typography>
                      <Typography variant="h2">{listConge}</Typography>
                    </Box>
                    <Box>
                      <Typography
                        gutterBottom
                        variant="caption"
                        sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                      >
                        Refusés
                      </Typography>
                      <Typography variant="h2">8</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Divider />
              <Box px={2} py={4} display="flex" alignItems="flex-start">
                <AvatarPrimary>
                  <FavoriteTwoToneIcon />
                </AvatarPrimary>
                <Box pl={2} flex={1}>
                  <Typography sx={{ fontSize: `${theme.typography.pxToRem(18)}` }} variant="h3">Nombres des autorisations</Typography>

                  <Box pt={2} display="flex">
                    <Box pr={8}>
                      <Typography
                        gutterBottom
                        variant="caption"
                        sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                      >
                        Refusés
                      </Typography>
                      <Typography variant="h2">64</Typography>
                    </Box>
                    <Box>
                      <Typography
                        gutterBottom
                        variant="caption"
                        sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                      >
                        Acceptés
                      </Typography>
                      <Typography variant="h2">15</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </CustomCard>
          </Grid>




          <Grid item xs={12} >
            <Card>
              <Grid spacing={0} container>
                
                <Grid
                  sx={{
                    position: 'relative'
                  }}
                  display="flex"
                  alignItems="center"
                  item
                  xs={12}
                  md={6}
                >
                 
                  <Box py={4} pr={4} flex={1}>
                    <Grid container spacing={0}>
                      <Grid
                        xs={12}
                        sm={5}
                        item
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Chart
                          height={250}
                          options={chartOptions}
                          series={chartSeries}
                          type="donut"
                        />
                      </Grid>
                     
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>

        </Grid>
      </Container>

      <br />

    </>



  );
};

export default YourComponent;
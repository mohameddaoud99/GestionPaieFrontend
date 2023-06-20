import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
    // Button,
    Card,
    Box,
    Grid,
    Typography,
    useTheme,
    styled,
    CardHeader,
    Avatar,
    Divider,
    alpha,
    ListItem,
    ListItemText,
    List,
    ListItemAvatar
  } from '@mui/material';
  // import TrendingUp from '@mui/icons-material/TrendingUp';
  // import Text from 'src/components/Text';
  import Chart from 'react-apexcharts';
  import AssessmentIcon from '@mui/icons-material/Assessment';
  // import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';

  
  const AvatarPrimary = styled(Avatar)(


    ({ theme }) => `
        background: ${theme.colors.primary.lighter};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(7)};
        height: ${theme.spacing(7)};
  `
  );
  
  
  const ListItemAvatarWrapper = styled(ListItemAvatar)(
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
  );
  
  function Statistique() {
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
          bar: {
            size: '60%'
          }
        }
      },
      colors: ['#ff9900', '#1c81c2', '#333'],
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
      labels: ['Accepté', 'Refusé',  'En Attente'],
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

    const [PConge, setPConge] = useState([]);

    const config = ({
        "Access-Control-Allow-Origin": "*",
      })
    
    useEffect(() => {
      axios.get("https://localhost:44367/api/Statistique/StatistiqueInfosEmployee?matricule="+localStorage.getItem('MATREmployee'),config).then((res) => {
        setPConge(res.data);
        console.log(res.data)
        console.log(PConge.nbCongeA)
        
      });
    }, []);
  


  
    const chartSeries = [ PConge.nbCongeA, PConge.nbCongeR, PConge.nbCongeE];



  
    return (
      <Card>
        <Grid spacing={0} container>
          <Grid item xs={12} md={6}>
            <Box p={4}>

              <Card>
              <CardHeader title="Les plus recentes activités du mois courant " />
              <Divider />
              <Box px={2} py={4} display="flex" alignItems="flex-start">
                <AvatarPrimary>
                  <AssessmentIcon />
                </AvatarPrimary>
                <Box pl={2} flex={1}>
                  <Typography sx={{ fontSize: `${theme.typography.pxToRem(18)}` }} variant="h3">Nombre des congés</Typography>

                  <Box pt={2} display="flex">
                    <Box pr={5}>
                      <Typography
                        gutterBottom
                        variant="caption"
                        sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                      >
                        Acceptés
                      </Typography>
                      <Typography variant="h2">{PConge.nbCongeMoisA}</Typography>
                    </Box>
                    <Box pr={5}>
                      <Typography
                        gutterBottom
                        variant="caption"
                        sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                      >
                        Refusés
                      </Typography>
                      <Typography variant="h2">{PConge.nbCongeMoisR}</Typography>
                    </Box>
                    <Box>
                      <Typography
                        gutterBottom
                        variant="caption"
                        sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                      >
                        En Attentes
                      </Typography>
                      <Typography variant="h2">{PConge.nbCongeMoisE}</Typography>
                    </Box>
                    
                  </Box>
                </Box>
              </Box>
              <Divider />
              <Box px={2} py={4} display="flex" alignItems="flex-start">
                <AvatarPrimary>
                  <AssessmentIcon />
                </AvatarPrimary>
                <Box pl={2} flex={1}>
                  <Typography sx={{ fontSize: `${theme.typography.pxToRem(18)}` }} variant="h3">Nombres des autorisations</Typography>

                  <Box pt={2} display="flex">
                    <Box pr={5}>
                      <Typography
                        gutterBottom
                        variant="caption"
                        sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                      >
                        Acceptés
                      </Typography>
                      <Typography variant="h2">{PConge.nbAutorisationA}</Typography>
                    </Box>
                    <Box pr={5}>
                      <Typography
                        gutterBottom
                        variant="caption"
                        sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                      >
                        Refusés
                      </Typography>
                      <Typography variant="h2">{PConge.nbAutorisationR}</Typography>
                    </Box>
                    <Box >
                      <Typography
                        gutterBottom
                        variant="caption"
                        sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                      >
                        En Attentes
                      </Typography>
                      <Typography variant="h2">{PConge.nbAutorisationE}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Card>

            </Box>
          </Grid>

          

          
          <Grid
          style={{display:"flex",justifyContent:"center",marginleft:"30px" ,padding:'10px' }}
            sx={{
              position: 'relative'
            }}
            textAlign="center"
            display="flex"
            alignItems="center"
            item
            xs={12}
            md={6}
          >
            <Card style={{ width: '600px', padding:'10px' }}>
              <CardHeader title="Pourcentages des types des congés du mois courant " />
            <Box
              component="span"
              sx={{
                display: { xs: 'none', md: 'inline-block' }
              }}
            >
              <Divider absolute orientation="vertical" />
            </Box>
            
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
                <Grid xs={12} sm={7} item display="flex" alignItems="center">
                  <List
                    disablePadding
                    sx={{
                      width: '100%'
                    }}
                  >
                   
                    <ListItem disableGutters>
                      <ListItemAvatarWrapper>
                        <img
                          alt="XRP"
                          src="/static/images/avatars/accepte.png"
                        />
                      </ListItemAvatarWrapper>
                      <ListItemText
                        primary="Congés acceptés"
                        primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                       
                       
                      />
                     
                    </ListItem>
                    <ListItem disableGutters >
                      <ListItemAvatarWrapper>
                        <img
                          alt="ADA"
                          src="/static/images/avatars/refuse.png"
                        />
                      </ListItemAvatarWrapper>
                      <ListItemText
                        primary="Congés refusés"
                        primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                        
                        
                      />
                     
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemAvatarWrapper>
                        <img
                          alt="ETH"
                          src="/static/images/avatars/attente.jpg"
                        />
                      </ListItemAvatarWrapper>
                      <ListItemText
                        primary="Congés en attentes"
                        primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                       
                      />
                     
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Box>
            </Card>
          </Grid>
         
         
        </Grid>
      </Card>
    );
  }
  
  export default Statistique;
  
import { useContext } from 'react';

import {
  ListSubheader,
  alpha,
  Box,
  List,
  styled,
  Button,
  ListItem
} from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import { SidebarContext } from 'src/contexts/SidebarContext';
import {   useNavigate } from 'react-router-dom'


import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import ArticleIcon from '@mui/icons-material/Article';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LogoutIcon from '@mui/icons-material/Logout';

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
    'transform',
    'opacity'
  ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

const handleRefresh = () => {
  window.location.reload();
};

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);
  const navigate = useNavigate();

  const onDelete = () => {
   
     localStorage.clear()
     
     navigate('/LoginAdmin', {replace: true});
   }

  return (
    <>
      <MenuWrapper>
      

      <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Dashboard
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">

              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/dashboard-admin/home"
                  startIcon={<TableChartTwoToneIcon />}
                >
                  Dashboard
                </Button>
              </ListItem>


            </List>
          </SubMenuWrapper>

          
        </List>



      
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Employés
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/Employee/AfficherEmployee"
                  startIcon={<AccountCircleTwoToneIcon />
                 }
                >
                  Liste des employés
                </Button>
              </ListItem>

           

             

            </List>
          </SubMenuWrapper>

          
        </List>




        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Type Congés
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/TypeConge/ListTypeConge"
                  startIcon={<FormatAlignCenterIcon />
                 }
                >
                  Types des congés
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>






        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Congés
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">

            <ListItem component="div"  onClick={handleRefresh}>
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/CongeAdmin/AjouterCongeADMIN"
                  startIcon={<AddCircleIcon />}
                >
                Ajouter  Congé
                </Button>
              </ListItem>

              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/CongeAdmin/ListeCongeAR"
                  startIcon={<ArticleIcon />}
                >
                  Congés en attentes
                </Button>
              </ListItem>
              
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/CongeAdmin/ListeCongeA"
                  startIcon={<AssignmentTurnedInIcon />}
                >
                  Congés acceptés
                </Button>
              </ListItem>

              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/CongeAdmin/ListeCongeR"
                  startIcon={<DoNotDisturbAltIcon />}
                >
                  Congés refusés
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>



        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Autorisations
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">

           
            <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/Autorisations/AjouterAutorisationADMIN"
                  startIcon={<AddCircleIcon />}
                >
                Ajouter Autorisations
                </Button>
              </ListItem>


              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/Autorisations/ListeAutorisationE"
                  startIcon={<ArticleIcon />}
                >
                  Autorisations en attentes
                </Button>
              </ListItem>
              
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/Autorisations/ListeAutorisationA"
                  startIcon={<AssignmentTurnedInIcon />}
                >
                  Autorisations acceptés
                </Button>
              </ListItem>

              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/Autorisations/ListeAutorisationR"
                  startIcon={<DoNotDisturbAltIcon />}
                >
                  Autorisations refusés
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>



        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Gérer payement
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">

           

              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/payement"
                  startIcon={<MonetizationOnIcon />}
                >
                  Gérer payement
                </Button>
              </ListItem>
              
             

            </List>
          </SubMenuWrapper>
        </List>
       

        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Compte
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
             
              <ListItem component="div">
              <Button
                  disableRipple
                  onClick={() => onDelete()}
                  startIcon={<LogoutIcon />}
                >
                  Déconnexion
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
       
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;

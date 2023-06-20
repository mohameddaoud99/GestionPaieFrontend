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



import ArticleIcon from '@mui/icons-material/Article';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import LogoutIcon from '@mui/icons-material/Logout';



import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import {   useNavigate } from 'react-router-dom'

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

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);
  const navigate = useNavigate();


  const onDelete = () => {
   
    localStorage.clear()
    
    navigate('/', {replace: true});
  }

  return (
    <>
      <MenuWrapper>



      <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Tableau de bord
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
                  to="/dashboard-employee/home"
                  startIcon={<TableChartTwoToneIcon />}
                >
                  Tableau de bord
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

             

              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/Conge/ListeCongeE"
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
                  to="/Conge/ListeCongeA"
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
                  to="/Conge/ListeCongeR"
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
                  to="/Autorisation/ListeAutorisationE"
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
                  to="/Autorisation/ListeAutorisationA"
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
                  to="/Autorisation/ListeAutorisationR"
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

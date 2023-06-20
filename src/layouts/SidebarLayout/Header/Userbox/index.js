import { useRef, useState } from 'react';

import {   useNavigate } from 'react-router-dom'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  
  Popover,
  Typography,
  styled
} from '@mui/material';

import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';



const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox() {
  const navigate = useNavigate();

  const onDelete = () => {
   
     localStorage.clear()
     
     navigate('/', {replace: true});
   }



  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar variant="rounded" alt={window.localStorage.getItem('Nom')} src="/static/images/avatars/3.jpg" />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">{window.localStorage.getItem('Nom')}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {window.localStorage.getItem('Email' )}
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar variant="rounded" alt={window.localStorage.getItem('NOMPRENOM1Employee' )} src="/static/images/avatars/3.jpg" />
          <UserBoxText>
            <UserBoxLabel variant="body1">{window.localStorage.getItem('NOMPRENOM1Employee' )}</UserBoxLabel>
          
          </UserBoxText>
        </MenuUserBox>
     
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button    onClick={() => onDelete()} color="primary" fullWidth>
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Déconnexion
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserbox;

import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import {makeStyles} from '@material-ui/core/styles';
import {useEffect,useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'




const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 400,
    minHeight:400,
    //  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    backgroundColor: theme.palette.background.paper,
    margin: 'auto',
    marginTop: theme.spacing(20),
  },
  inline: {
    display: 'inline',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
}));


export default function SelectedListItem() {

  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index , val) => {

    
    console.log(val.CODSOC);
    const CODSOC = val.CODSOC;

    const config = ({
      "Access-Control-Allow-Origin": "*",
    })


    axios.get("https://localhost:44367/api/ChoixBD?dbName="+CODSOC, config).then(
      (res) => {

        window.localStorage.setItem('CODSOC',CODSOC ) 
        console.log(res.data)
        navigate('/dashboard-admin/home', {replace: true});
        
      });



    setSelectedIndex(index);
  };
  const classes = useStyles();



  const [ListSociete, setListSociete] = useState([]);


  const config = ({
    "Access-Control-Allow-Origin": "*",
  })

  useEffect(() => {
    axios.get("https://localhost:44367/api/Login/choix?CODEUSER="+localStorage.getItem('CompteUser'),config).then((res)=>{
      setListSociete(res.data)
      console.log(res.data)
    })
  }, []) 




  return (
    <Box  className={classes.root}>
     <h2 align="center"> Choisir votre société : </h2> 
      <List component="nav" aria-label="main mailbox folders">
      {ListSociete.map((val, ind) => {

        return(
          <ListItemButton
          key={ind}
          selected={selectedIndex === ind}
          onClick={(event) => handleListItemClick(event, ind, val)}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={val.NOMSOCI} /> 
          <ListItemText type="hidden" primary={val.CODSOC} /> 
        </ListItemButton>
        );
      })}



      
      </List>
     
    
    </Box>
  );
}
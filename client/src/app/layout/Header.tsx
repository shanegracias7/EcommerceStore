import { ShoppingCartCheckout } from '@mui/icons-material';
import { AppBar, Badge, IconButton, List, ListItem, Switch, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system';
import { NavLink } from 'react-router-dom';

interface props{
    darkMode:boolean;
    handleThemeChange:()=>void;
}

const midLinks = [
  {title:'catalog', path:'/catalog'},
  {title:'contact', path:'/contact'},
  {title:'about', path:'/about'}
]

const rightLinks = [
  {title:'login', path:'/login'},
  {title:'register', path:'/register'},
]

const navStyles ={
  color:'inherit', 
  typography:'h6',
  '&:hover':{ 
    color:'grey.500'
  },
  '&.active':{color:'text.secondary'},
  textDecoration:'none'
}




export default function Header({darkMode,handleThemeChange}:props) {
  return (
    <AppBar position='static' sx={{mb:4}}>
        <Toolbar sx={{display:'flex',justifyContent:'space-between', align:'center'}}>

            <Typography 
              variant='h6'
              component={NavLink} 
              to="/" 
              exact
              sx={navStyles}
            >
              STORE
            </Typography>

            <List sx={{display:'flex'}}>
              {midLinks.map(({title,path})=>(
                <ListItem 
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navStyles}
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>

            <Box display='flex' alignItems='center'>
              <Switch checked={darkMode} onChange={handleThemeChange}/>
              <IconButton>
                  <Badge badgeContent={4} color="secondary">
                    <ShoppingCartCheckout/>
                  </Badge>
              </IconButton>
              <List sx={{display:'flex'}}>
                {rightLinks.map(({title,path})=>(
                  <ListItem 
                    component={NavLink}
                    to={path}
                    key={path}
                    sx={navStyles}
                  >
                    {title.toUpperCase()}
                  </ListItem>
                ))}
              </List>
            </Box>
            
        </Toolbar>
    </AppBar>
  )
}




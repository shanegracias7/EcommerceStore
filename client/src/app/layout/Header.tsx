import { ShoppingCartCheckout } from '@mui/icons-material';
import { AppBar, Badge, IconButton, List, ListItem, Switch, Toolbar, Typography } from '@mui/material'
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


export default function Header({darkMode,handleThemeChange}:props) {
  return (
    <AppBar position='static' sx={{mb:4}}>
        <Toolbar>
            <Typography 
              variant='h6'
              component={NavLink} 
              to="/" 
              sx={{color:'inherit',textDecoration:'none'}}
            >
              STORE
            </Typography>
            <Switch checked={darkMode} onChange={handleThemeChange}/>

            <List sx={{display:'flex'}}>
              {midLinks.map(({title,path})=>(
                <ListItem 
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={{color:'inherit', typography:'h6'}}
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>

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
                  sx={{color:'inherit', typography:'h6'}}
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>
        </Toolbar>
    </AppBar>
  )
}




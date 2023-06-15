import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import swappTransparent from '../../../public/swapp-transparent.png';
// import swappTransparent from '../../images/swapp-transparent.png';
import swappTransparent from '../../swapp-transparent.png'

const settings = ['My Account', 'Logout'];

export default function NavBar() {
 
  const [accountMenu, setAccountMenu] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAccountMenu(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAccountMenu(null);
  };

  return (
    <AppBar position="static" sx={{backgroundColor: "#018043", height: "80px"}}>
        <Toolbar disableGutters sx= {{justifyContent:"space-between", paddingLeft: "30px", paddingRight: "30px"}}>
        <Box sx={{ flexGrow: 0 }}>
          <IconButton>
            <HomeIcon sx={{fontSize: "60px"}}/>
            </IconButton>
            </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'center' }}>
            <img src={swappTransparent} alt="swapp logo" style={{height:'300px'}}/> 
            </Box>
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon sx={{fontSize: "60px"}} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={accountMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(accountMenu)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
  </AppBar>
);
}
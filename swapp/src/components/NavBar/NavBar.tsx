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
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLocation, Link,useNavigate } from 'react-router-dom';
import swappTransparent from '../../swapp-transparent.png'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import supabase from '../../supabaseClient'

const settings = ['My Account', 'Logout'];

export default function NavBar() {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const location = useLocation();
  const renderHomeIcon = location.pathname === "/myaccount"
  const renderListItButton  = location.pathname === "/home"
  const [accountMenu, setAccountMenu] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAccountMenu(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAccountMenu(null);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const renderAccountIcon = !['/', '/login'].includes(location.pathname);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#018043", height: "80px", flexShrink: 9 }}>
  <Toolbar disableGutters sx={{ justifyContent: "space-between", pl: '10px', pr: '10px'}}>
    <Box sx={{ flexGrow: 0 }}>
      {renderHomeIcon && (
          <IconButton component = {Link} to = "/home">
            <HomeIcon sx={{ fontSize: isMobile ? "40px" : "50px" }}/>
            </IconButton>)}
          
          {renderListItButton && (
          <Stack direction = "row" spacing = {2} >
            <Button role="button" variant="contained" color="success" >
          List it
            </Button>
          </Stack>)}
    </Box>
    <Box sx={{ flexGrow: 1, display: "flex", alignItem: 'center', justifyContent: 'center', paddingTop: 2 }}>
      <img src={swappTransparent} alt="swapp logo" style={{ height: isMobile ? '30px' : '47px' }} />
    </Box>
    <Box sx={{ flexGrow: 0 }}>
      {renderAccountIcon && (
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <AccountCircleIcon sx={{ fontSize: isMobile? "40px" : "50px" }} />
          </IconButton>
        </Tooltip>)}
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
             <MenuItem key={setting} onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  </Toolbar>
</AppBar>
);
}
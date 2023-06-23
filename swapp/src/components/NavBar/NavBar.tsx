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
      handleCloseUserMenu();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleAccount = () => {
    navigate('/myaccount');
  };

  const renderAccountIcon = !['/', '/login'].includes(location.pathname);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#018043", height: "80px", flexShrink: 9 }}>
  <Toolbar disableGutters sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center', pl: '10px', pr: '10px', pt: '10px'}}>
    <Box sx={{ flexGrow: 0 }}>
      {renderHomeIcon && (
          <IconButton component = {Link} to = "/home">
            <HomeIcon sx={{ fontSize: isMobile ? "40px" : "50px" }}/>
            </IconButton>)}
          
          {renderListItButton && (
          <Stack direction = "row" spacing = {2} >
            <Button role="button" variant="contained" color="success" style={{width: '43px',
    height: '40px',
    padding: '0',
    marginRight: '10px',
    minWidth: 'unset',
    color: 'black',
    backgroundColor: 'white',
    // fontWeight: 'bold',
    fontSize: '13px',
    }}>
          + ADD
            </Button>
          </Stack>)}
    </Box>
    <Box sx={{ flexGrow: 1 }}>
      <img src={swappTransparent} alt="swapp logo" style={{ height: isMobile ? '30px' : '43px', marginLeft: isMobile ? '-10px' : '0px'}} />
    </Box>
    <Box sx={{ flexGrow: 0 }}>
      {renderAccountIcon && (
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <AccountCircleIcon sx={{ fontSize: isMobile? "40px" : "50px" }} />
            <Typography sx={{borderRadius:'50%', backgroundColor: 'yellow', ml: '-15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', height: isMobile ? '20px' : '25px', width: isMobile ? '20px' : '25px', mt: isMobile ? '15px' : '20px'}} >4</Typography>
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
          <MenuItem
            key={setting}
            onClick={
              setting === 'Logout'
              ? handleLogout
              : setting === 'My Account'
              ? handleAccount
              : handleCloseUserMenu
  }
>            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  </Toolbar>
</AppBar>
);
}
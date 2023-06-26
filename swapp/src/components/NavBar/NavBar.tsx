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
import token1 from '../../images/token1.png'


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
            <Button role="button" variant="contained" color="success" title="List an Item!" style={{width: '43px',
    height: '40px',
    padding: '0',
    marginRight: '10px',
    minWidth: 'unset',
    color: 'white',
    border: '2px solid white',
    // fontWeight: 'bold',
    fontSize: '22px',
    borderRadius: '35%',
    backgroundColor: '#018043',
  
    }}>
          +
            </Button>
          </Stack>)}
    </Box>
    <Box sx={{ flexGrow: 1 }}>
      <img src={swappTransparent} alt="swapp logo" style={{ height: isMobile ? '30px' : '43px', marginLeft: isMobile ? '-10px' : '0px'}} />
    </Box>
    <Box sx={{ flexGrow: 0 }}>
      {renderAccountIcon && (
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, position: 'relative', mr: '10px' }}>
  <AccountCircleIcon sx={{ fontSize: isMobile ? "45px" : "55px", color: 'white' }} />
  <img src={token1} alt="token" style={{ height: isMobile ? '25px' : '30px', width: isMobile ? '28px' : '33px', marginTop: isMobile ? '18px' : '23px', marginLeft: '-19px' }} />
  <Typography sx={{fontWeight: 'bold', ml: isMobile ? '-19px': '-22px', mt: isMobile? '22px': '24px'}}>4</Typography>
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

// Test
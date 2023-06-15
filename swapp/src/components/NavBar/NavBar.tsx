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
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const settings = ['My Account', 'Logout'];

export default function NavBar() {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
 
  const [accountMenu, setAccountMenu] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAccountMenu(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAccountMenu(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#018043", height: "80px", flexShrink: 9 }}>
  <Toolbar disableGutters sx={{ justifyContent: "space-between", pl: '10px', pr: '10px'}}>
    <Box sx={{ flexGrow: 0 }}>
      <IconButton>
        <HomeIcon sx={{ fontSize: isMobile ? "40px" : "50px" }} />
      </IconButton>
    </Box>
    <Box>
      <img src={swappTransparent} alt="swapp logo" style={{ height: isMobile ? '150px' : '280px' }} />
    </Box>
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <AccountCircleIcon sx={{ fontSize: isMobile? "40px" : "50px" }} />
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
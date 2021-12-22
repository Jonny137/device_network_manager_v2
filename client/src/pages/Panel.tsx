import { Provider } from 'react-redux';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';

import DeviceTable from '../components/DeviceTable';
import DeviceHeader from '../components/DeviceHeader';
import { ACCESS_TOKEN, HOST, PORT, SIGN_IN_REF } from '../utils/constants';
import { store } from '../store/store';

const Panel: FC = () => {
  let navigate = useNavigate();

  const handleSignOutClick = () => {
    const headers = {
      'Authorization': `Bearer ${ localStorage.getItem(ACCESS_TOKEN) }`
    };
    axios.post(`${HOST}:${PORT}/user/logout`, null, { headers })
      .then(() => logout())
      .catch(() => logout());
  };

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    navigate(SIGN_IN_REF);
  }

  return (
    <Provider store={store}>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Signed In Username
          </Typography>
          <Button 
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
          >
            Account
          </Button>
          <Button 
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
            onClick={ handleSignOutClick }
          >
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <DeviceHeader />
      <DeviceTable />
    </Provider>
  );
}

export default Panel;

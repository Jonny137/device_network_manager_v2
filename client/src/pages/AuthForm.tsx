import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import {
  ACCESS_TOKEN,
  HOME_REF,
  HOST,
  PORT,
  SIGN_IN,
  SIGN_IN_ENDPOINT,
  SIGN_IN_LINK,
  SIGN_IN_REF,
  SIGN_UP,
  SIGN_UP_ENDPOINT,
  SIGN_UP_LINK,
  SIGN_UP_REF,
} from '../utils/constants';

interface Props {
  newUser: boolean;
}

const AuthForm: React.FC<Props> = ({ newUser }) => {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    axios
      .post(`${HOST}:${PORT}${newUser ? SIGN_UP_ENDPOINT : SIGN_IN_ENDPOINT}`, {
        username: data.get('username'),
        password: data.get('password'),
      })
      .then((payload) => payload.data.message)
      .then((token) => {
        !newUser && localStorage.setItem(ACCESS_TOKEN, token);
        (event.target as HTMLFormElement).reset();
        navigate(newUser ? SIGN_IN_REF : HOME_REF);
      })
      .catch(() => {
        // TODO: show error notification
        (event.target as HTMLFormElement).reset();
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {newUser ? SIGN_UP : SIGN_IN}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="username"
                label="Username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {newUser ? SIGN_UP : SIGN_IN }
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={newUser ? SIGN_IN_REF : SIGN_UP_REF}>
                {newUser ? SIGN_IN_LINK : SIGN_UP_LINK}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default AuthForm;

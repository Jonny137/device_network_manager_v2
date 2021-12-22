import axios from "axios";
import { FC, Fragment } from "react";

import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import GlobalStyles from "@mui/material/GlobalStyles";

import { ACCESS_TOKEN, HOST, PORT } from "../utils/constants";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { add } from "../store/reducer";

const DeviceHeader: FC = () => {

  const count = useAppSelector(state => state.devices);
  const dispatch = useAppDispatch();

  const handleAddDevice = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const headers = {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    };

    axios
      .post(`${HOST}:${PORT}/device`, {
        name: data.get('name'),
        type: data.get('type'),
        host: data.get('host'),
      }, { headers })
      .then((payload) => payload.data.message)
      .then((device) => {
        console.log(device);
        dispatch(add(device));
        console.log(count);
      })
      .catch(() => {
        // // TODO: show error notification
        // (event.target as HTMLFormElement).reset();
      });
  };

  return (
    <Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Box
            component="form"
            onSubmit={handleAddDevice}
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              required
              name="name"
              label="Name"
              variant="outlined"
            />
             <TextField
              required
              name="type"
              label="Type"
              variant="outlined"
            />
             <TextField
              required
              name="host"
              label="Host"
              variant="outlined"
            />
            <Button 
              type="submit"
              variant="outlined"
              sx={{ my: 1, mx: 1.5 }}
            >
              Add
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default DeviceHeader;

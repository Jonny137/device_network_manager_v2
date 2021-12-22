import axios from 'axios';
import { FC, useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

import { ACCESS_TOKEN, HOST, PORT } from '../utils/constants';

interface Device {
  name: string,
  type: string,
  host: string,
  status: string,
  disc_time: number,
}

const DeviceTable: FC = () => {

  const [devices, setDevices] = useState([]);

  // TODO: put ze axios in ze panel, put ze devices in ze state, use state
  useEffect(() => {
    const headers = {
      'Authorization': `Bearer ${ localStorage.getItem(ACCESS_TOKEN) }`
    };
    axios.get(`${HOST}:${PORT}/device`, { headers })
        .then(response => {
          setDevices(response.data.message);
        })
        .catch((e) => console.error(e));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Host</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Disconnected Time&nbsp;(s)</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.map((device: Device) => (
            <TableRow
              key={device.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {device.name}
              </TableCell>
              <TableCell>{device.type}</TableCell>
              <TableCell>{device.host}</TableCell>
              <TableCell>{device.status}</TableCell>
              <TableCell>{device.disc_time}</TableCell>
              <TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton> 
                <IconButton>
                  <DeleteIcon />
                </IconButton> 
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DeviceTable;

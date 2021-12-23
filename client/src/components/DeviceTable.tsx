import { FC } from 'react';

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

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Device, removeDevice, selectDevices } from '../store/reducers/devices';
import { ACCESS_TOKEN, URL } from '../utils/constants';
import axios from 'axios';

const DeviceTable: FC = () => {
	const devices = useAppSelector(selectDevices);
	const dispatch = useAppDispatch();

	// TODO: move headers to an interceptor
	const handleDeleteDevice = async (id: string) => {
		const headers = {
			Authorization: `Bearer ${ localStorage.getItem(ACCESS_TOKEN) }`,
		};

		try {
			const response = await axios.delete(`${ URL }/device/${ id }`, { headers });
			const device: Device = response.data.message;
			dispatch(removeDevice(device));
		} catch (e) {
			// TODO: show error notification
		}
	}

	return (
		<TableContainer component={ Paper }>
			<Table sx={ { minWidth: 650 } } aria-label="simple table">
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
					{ devices.map((device: Device) => (
						<TableRow
							key={ device._id }
							sx={ { '&:last-child td, &:last-child th': { border: 0 } } }
						>
							<TableCell component="th" scope="row">
								{ device.name }
							</TableCell>
							<TableCell>{ device.type }</TableCell>
							<TableCell>{ device.host }</TableCell>
							<TableCell>{ device.status }</TableCell>
							<TableCell>{ device.disc_time }</TableCell>
							<TableCell>
								<IconButton>
									<EditIcon/>
								</IconButton>
								<IconButton onClick={ () => handleDeleteDevice(device._id) }>
									<DeleteIcon/>
								</IconButton>
							</TableCell>
						</TableRow>
					)) }
				</TableBody>
			</Table>
		</TableContainer>
	);
}

// TODO: see Medium article for memo usage
export default DeviceTable;

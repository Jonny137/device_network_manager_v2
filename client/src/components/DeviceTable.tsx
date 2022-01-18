import { ChangeEvent, FC, useState } from 'react';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Device, editDevice, removeDevice, selectDevices, setDevices } from '../store/reducers/devices';
import { ACCESS_TOKEN, URL } from '../utils/constants';

const DeviceTable: FC = () => {
	const devices = useAppSelector(selectDevices);
	const dispatch = useAppDispatch();

	const [ name, setName ] = useState('');
	const [ type, setType ] = useState('');
	const [ host, setHost ] = useState('');

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
	};

	const handleEditDevice = async (device: Device) => {
		const editedDevice = { ...device };

		const allDevices = devices.map(device => ({ ...device, editing: false }));
		dispatch(setDevices(allDevices));

		if (!editedDevice.editing) {
			editedDevice.editing = true;
			dispatch(editDevice(editedDevice));
			return;
		}

		const headers = {
			Authorization: `Bearer ${ localStorage.getItem(ACCESS_TOKEN) }`,
		};

		try {
			const response = await axios.put(`${ URL }/device/${ device._id }`, {
				name: name || device.name,
				type: type || device.type,
				host: host || device.host,
			}, { headers });
			const newDevice: Device = response.data.message;
			newDevice.editing = false;
			resetInputs();
			dispatch(editDevice(newDevice));
			// TODO: show success notification
		} catch (e) {
			// TODO: show error notification
		}
	};

	const handleCancelEdit = (device: Device) => {
		const editedDevice = { ...device };
		editedDevice.editing = false;
		dispatch(editDevice(editedDevice));
		resetInputs();
	};

	const resetInputs = () => {
		setName('');
		setType('');
		setHost('');
	};

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
								{
									device.editing ?
										<TextField
											name="name"
											label="Name"
											variant="outlined"
											defaultValue={ device.name }
											onChange={ (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value) }
										/> :
										device.name
								}
							</TableCell>
							<TableCell>
								{
									device.editing ?
										<TextField
											name="type"
											label="Type"
											variant="outlined"
											defaultValue={ device.type }
											onChange={ (e: ChangeEvent<HTMLInputElement>) => setType(e.target.value) }
										/> :
										device.type
								}
							</TableCell>
							<TableCell>
								{
									device.editing ?
										<TextField
											name="host"
											label="Host"
											variant="outlined"
											defaultValue={ device.host }
											onChange={ (e: ChangeEvent<HTMLInputElement>) => setHost(e.target.value) }
										/> :
										device.host
								}
							</TableCell>
							<TableCell>{ device.status }</TableCell>
							<TableCell>{ device.disc_time }</TableCell>
							<TableCell>
								<IconButton
									disabled={
										device.editing &&
										(
											(!name && !type && !host) ||
											(name === device.name || type === device.type || host === device.host)
										)
									}
									onClick={ () => handleEditDevice(device) }
								>
									{ device.editing ? <CheckIcon/> : <EditIcon/> }
								</IconButton>
								{
									!device.editing ?
										<IconButton onClick={ () => handleDeleteDevice(device._id) }>
											<DeleteIcon/>
										</IconButton>
										:
										<IconButton onClick={ () => handleCancelEdit(device) }>
											<CancelIcon/>
										</IconButton>
								}
							</TableCell>
						</TableRow>
					)) }
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default DeviceTable;

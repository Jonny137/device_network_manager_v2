import axios from 'axios';
import { createRef, FC, useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import GlobalStyles from '@mui/material/GlobalStyles';

import { ACCESS_TOKEN, HOST, PORT, DEVICE_ADD_FAIL } from '../utils/constants';
import { useAppDispatch } from '../store/hooks';
import { addDevice } from '../store/reducers/devices';
import { Device } from '../store/state.interface';
import Notification from './Snackbar';

const DeviceHeader: FC = () => {
	const dispatch = useAppDispatch();
	const formRef = createRef<HTMLFormElement>();

	const [ deviceAddNok, setDeviceAddNok ] = useState(false);

	const resetForm = () => formRef.current!.reset();

	const handleAddDevice = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		const headers = {
			Authorization: `Bearer ${ localStorage.getItem(ACCESS_TOKEN) }`,
		};

		try {
			const response = await axios.post(`${ HOST }:${ PORT }/device`, {
				name: data.get('name'),
				type: data.get('type'),
				host: data.get('host'),
			}, { headers });

			const device: Device = response.data.message;
			dispatch(addDevice(device));
			resetForm();
		} catch (e) {
			setDeviceAddNok(true);
			resetForm();
		}
	};

	return (
		<>
			<GlobalStyles
				styles={ { ul: { margin: 0, padding: 0, listStyle: "none" } } }
			/>
			<CssBaseline/>
			{ deviceAddNok && <Notification openState={setDeviceAddNok} severity='success' text={ DEVICE_ADD_FAIL } /> }
			<AppBar
				position="static"
				color="default"
				elevation={ 0 }
				sx={ { borderBottom: (theme) => `1px solid ${ theme.palette.divider }` } }
			>
				<Toolbar sx={ { flexWrap: "wrap" } }>
					<Box
						component="form"
						ref={ formRef }
						onSubmit={ handleAddDevice }
						sx={ {
							"& > :not(style)": { m: 1, width: "25ch" },
						} }
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
							variant="contained"
							sx={ { my: 1, mx: 1.5 } }
							color="primary"
						>
							Add
						</Button>
					</Box>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default DeviceHeader;

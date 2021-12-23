import { FC, useEffect } from 'react';
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
import { ACCESS_TOKEN, HOST, PORT, SIGN_IN_REF, URL } from '../utils/constants';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Device, setDevices } from '../store/reducers/devices';
import { selectUsername } from '../store/reducers/username';

const Panel: FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const username = useAppSelector(selectUsername);

	useEffect(() => {
		const fetchData = async () => {
			const headers = {
				'Authorization': `Bearer ${ localStorage.getItem(ACCESS_TOKEN) }`
			};
			try {
				const response = await axios.get(`${ HOST }:${ PORT }/device`, { headers });
				dispatch(setDevices(response.data.message as Device[]));
			} catch (e) {
				console.error(e);
			}
		};

		fetchData();
	}, [ dispatch ]);

	const handleSignOutClick = async () => {
		const headers = {
			'Authorization': `Bearer ${ localStorage.getItem(ACCESS_TOKEN) }`
		};

		try {
			await axios.post(`${ URL }/user/logout`, null, { headers });
		} finally {
			localStorage.removeItem(ACCESS_TOKEN);
			navigate(SIGN_IN_REF);
		}
	};

	return (
		<>
			<GlobalStyles styles={ { ul: { margin: 0, padding: 0, listStyle: 'none' } } }/>
			<CssBaseline/>
			<AppBar
				position="static"
				color="default"
				elevation={ 0 }
				sx={ { borderBottom: (theme) => `1px solid ${ theme.palette.divider }` } }
			>
				<Toolbar sx={ { flexWrap: 'wrap' } }>
					<Typography variant="h6" color="inherit" noWrap sx={ { flexGrow: 1 } }>
						{ username }
					</Typography>
					<Button
						variant="outlined"
						sx={ { my: 1, mx: 1.5 } }
					>
						Account
					</Button>
					<Button
						variant="outlined"
						sx={ { my: 1, mx: 1.5 } }
						onClick={ handleSignOutClick }
					>
						Sign Out
					</Button>
				</Toolbar>
			</AppBar>
			<DeviceHeader/>
			<DeviceTable/>
		</>
	);
}

export default Panel;

import { FC } from 'react';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';

import { ACCESS_TOKEN, HOST, PORT } from '../utils/constants';
import { useAppDispatch } from '../store/hooks';
import { setDevices } from '../store/reducers/devices';
import DeviceTable from '../components/DeviceTable';
import DeviceHeader from '../components/DeviceHeader';
import Header from '../components/Header';
import { Device } from '../store/state.interface';

import useInterval from '../hooks/useInterval';

const Panel: FC = () => {
	const dispatch = useAppDispatch();

	useInterval(async () => {
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
	}, 60000, true);

	return (
		<>
			<GlobalStyles styles={ { ul: { margin: 0, padding: 0, listStyle: 'none' } } }/>
			<CssBaseline/>
			<Header/>
			<DeviceHeader/>
			<DeviceTable/>
		</>
	);
}

export default Panel;

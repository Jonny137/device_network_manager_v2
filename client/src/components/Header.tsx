import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { ACCESS_TOKEN, ACCOUNT_REF, HOME_REF, SIGN_IN_REF, URL } from '../utils/constants';
import { useAppSelector } from '../store/hooks';
import { selectUser } from '../store/reducers/user';

const Header: FC = () => {
	const navigate = useNavigate();
	const user = useAppSelector(selectUser);

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
		<AppBar
			position="static"
			color="default"
			elevation={ 0 }
			sx={ { borderBottom: (theme) => `1px solid ${ theme.palette.divider }` } }
		>
			<Toolbar sx={ { flexWrap: 'wrap' } }>
				<Typography component={ Link } to={ HOME_REF } variant="h6" color="inherit" noWrap sx={ { flexGrow: 1 } }>
					{ user.username }
				</Typography>
				<Button
					variant="outlined"
					sx={ { my: 1, mx: 1.5 } }
					component={ Link }
					to={ ACCOUNT_REF }
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
	);
};

export default Header;

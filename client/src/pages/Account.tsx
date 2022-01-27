import * as React from 'react';
import { ChangeEvent, createRef, useState } from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Header from '../components/Header';
import { 
	ACCESS_TOKEN,
	CHANGE_USERNAME_ENDPOINT,
	URL,
	USERNAME_UPDATE_SUCCESS,
	USERNAME_UPDATE_FAIL
} from '../utils/constants';
import axios from 'axios';
import { useAppDispatch } from '../store/hooks';
import { setUser } from '../store/reducers/user';
import { User } from '../store/state.interface';
import  Notification from '../components/Snackbar';

const Account: React.FC = () => {
	const dispatch = useAppDispatch();
	const [ username, setUsername ] = useState('');
	const [ changeUsernameOk, setChangeUsernameOk ] = useState(false);
	const [ changeUsernameNok, setChangeUsernameNok ] = useState(false);

	const formRef = createRef<HTMLFormElement>();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const headers = {
			Authorization: `Bearer ${ localStorage.getItem(ACCESS_TOKEN) }`,
		};

		try {
			const response = await axios.patch(`${ URL }${ CHANGE_USERNAME_ENDPOINT }`, {
				username,
			}, { headers });
			const newUser: User = response.data.message;
			formRef.current!.reset();
			setUsername('');
			dispatch(setUser(newUser));
			setChangeUsernameOk(true);
		} catch (e) {
			setChangeUsernameNok(true);
			console.error(e);
		}
	};

	return (
		<>
			<Header/>
			<Container component="main" maxWidth="xs">
				{ changeUsernameOk && <Notification openState={setChangeUsernameOk} severity='success' text={ USERNAME_UPDATE_SUCCESS } /> }
				{ changeUsernameNok && <Notification openState={setChangeUsernameNok} severity='error' text={ USERNAME_UPDATE_FAIL } /> }
				<CssBaseline/>
				<Box
					sx={ {
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					} }
				>
					<Box component="form" ref={ formRef } noValidate onSubmit={ handleSubmit } sx={ { mt: 3 } }>
						<Grid container spacing={ 2 }>
							<Grid item xs={ 12 }>
								<TextField
									required
									fullWidth
									name="username"
									label="Username"
									autoComplete="username"
									onChange={ (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value) }
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							disabled={ !username }
							sx={ { mt: 3, mb: 2 } }
						>
							Edit
						</Button>
					</Box>
				</Box>
			</Container>
		</>
	);
};

export default Account;

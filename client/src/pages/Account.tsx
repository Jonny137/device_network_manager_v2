import * as React from 'react';
import { ChangeEvent, createRef, useState } from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Header from '../components/Header';
import { ACCESS_TOKEN, CHANGE_USERNAME_ENDPOINT, URL } from '../utils/constants';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectUser, setUser } from '../store/reducers/user';
import { User } from '../utils/validateToken';

const Account: React.FC = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);
	const [ username, setUsername ] = useState('');

	const formRef = createRef<HTMLFormElement>();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const headers = {
			Authorization: `Bearer ${ localStorage.getItem(ACCESS_TOKEN) }`,
		};

		try {
			const response = await axios.patch(`${ URL }${ CHANGE_USERNAME_ENDPOINT }/${ user.id }`, {
				username,
			}, { headers });
			const newUser: User = response.data.message;
			formRef.current!.reset();
			setUsername('');
			dispatch(setUser(newUser));
			// TODO: show success notification
		} catch (e) {
			// TODO: show error notification
		}
	};

	return (
		<>
			<Header/>

			<Container component="main" maxWidth="xs">
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

import axios from 'axios';

import { ACCESS_TOKEN, URL } from './constants';
import { User } from '../store/state.interface';

export const validateToken = async (): Promise<User> => {
	const token = localStorage.getItem(ACCESS_TOKEN);

	if (!token) {
		return null as unknown as User;
	}

	const headers = {
		'Authorization': `Bearer ${ token }`
	}

	let response;
	let user: User;

	try {
		response = await axios.post(`${ URL }/user/verify`, null, { headers });
		user = response.data.message;
	} catch (e) {
		localStorage.removeItem(ACCESS_TOKEN);
		user = null as unknown as User;
	}

	return user;
}

export default validateToken;

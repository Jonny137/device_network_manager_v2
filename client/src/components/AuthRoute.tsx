import { FC, memo, useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import validateToken  from '../utils/validateToken';
import { User } from '../store/state.interface';

const AuthRoute: FC<any> = ({ children }) => {
	const location = useLocation();

	const [ loading, setLoading ] = useState(true);
	const [ isAuth, setIsAuth ] = useState(false);

	useEffect(() => {
		const checkToken = async () => {
			const user: User = await validateToken();

			setIsAuth(!!user);
			setLoading(false);
		};

		checkToken();
	}, []);

	return (
		loading ?
			(<div>LOADING</div>) :
			(isAuth ?
				<Navigate to='/home' state={ { from: location } }/> :
				children)
	);
}

export default memo(AuthRoute);

import { FC, memo, useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import validateToken from '../utils/validateToken';
import { useAppDispatch } from '../store/hooks';
import { removeUser, setUser } from '../store/reducers/user';
import { User } from '../store/state.interface';

const PrivateRoute: FC<any> = ({ children }) => {
	const location = useLocation();
	const dispatch = useAppDispatch();

	const [ loading, setLoading ] = useState(true);
	const [ isAuth, setIsAuth ] = useState(false);

	useEffect(() => {
		const checkToken = async () => {
			const user: User = await validateToken();
			dispatch(!!user ? setUser(user) : removeUser());

			setIsAuth(!!user);
			setLoading(false);
		};

		checkToken();
	}, [ dispatch ]);

	return (
		loading ?
			(<div>LOADING</div>) :
			(isAuth ?
				children :
				<Navigate to='/' state={ { from: location } }/>)
	);
}

export default memo(PrivateRoute);

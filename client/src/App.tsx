import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';

import { SIGN_UP_REF, SIGN_IN_REF, HOME_REF, ACCOUNT_REF } from './utils/constants';
import { store } from './store/store';
import AuthForm from './pages/AuthForm';
import PrivateRoute from './components/PrivateRoute';
import AuthRoute from './components/AuthRoute';
import Panel from './pages/Panel';
import Account from './pages/Account';

const App: React.FC = () => {
	return (
		<Routes>
			<Route path="/" element={ <Navigate to={ SIGN_IN_REF }/> }/>
			<Route
				path={ SIGN_IN_REF }
				element={
					<AuthRoute>
						<AuthForm newUser={ false }/>
					</AuthRoute>
				}
			/>
			<Route
				path={ SIGN_UP_REF }
				element={
					<AuthRoute>
						<AuthForm newUser={ true }/>
					</AuthRoute>
				}
			/>
			<Route
				path={ HOME_REF }
				element={
					<Provider store={ store }>
						<PrivateRoute>
							<Panel/>
						</PrivateRoute>
					</Provider>
				}
			/>
			<Route
				path={ ACCOUNT_REF }
				element={
					<Provider store={ store }>
						<PrivateRoute>
							<Account/>
						</PrivateRoute>
					</Provider>
				}
			/>
		</Routes>
	);
};

export default App;

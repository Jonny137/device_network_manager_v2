import { Routes, Route, Navigate } from 'react-router-dom';

import AuthForm from './pages/AuthForm';
import PrivateRoute from './components/PrivateRoute';
import AuthRoute from './components/AuthRoute';
import Panel from './pages/Panel';
import { SIGN_UP_REF, SIGN_IN_REF, HOME_REF } from './utils/constants';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={SIGN_IN_REF} />} />
      <Route
        path={SIGN_IN_REF}
        element={
          <AuthRoute>
            <AuthForm newUser={false} />
          </AuthRoute>
        }
      />
      <Route
        path={SIGN_UP_REF}
        element={
          <AuthRoute>
            <AuthForm newUser={true} />
          </AuthRoute>
        }
      />
      <Route
        path={HOME_REF}
        element={
          <PrivateRoute>
            <Panel />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

// TODO: default to 404
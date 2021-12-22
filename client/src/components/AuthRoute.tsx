import { FC, memo, useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import isTokenValid from '../utils/validateToken';

const AuthRoute: FC<any> = ({ children }) => {
    const location = useLocation();
  
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
  
    useEffect(() => {
        const fetchData = async () => {
            const isValid = await isTokenValid();

            setIsAuth(isValid);
            setLoading(false);
        };

        fetchData();
    }, []);
  
    return (
        loading ?
            ( <div>LOADING</div> ) :
            ( isAuth ?
                <Navigate to='/home' state={{ from: location }} /> :
                children )
    );
}

export default memo(AuthRoute);

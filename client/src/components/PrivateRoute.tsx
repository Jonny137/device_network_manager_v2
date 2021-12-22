import { FC, memo, useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import isTokenValid from '../utils/validateToken';

const PrivateRoute: FC<any> = ({ children }) => {
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
                children :
                <Navigate to='/' state={{ from: location }} /> )
    );
}

export default memo(PrivateRoute);

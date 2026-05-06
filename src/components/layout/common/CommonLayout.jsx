import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { setPreviousPage } from '../../../features/ui/previousPathSlice';
import { useEffect } from 'react';

export const CommonLayout = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [previousPageTwo, setPreviousPageTwo] = useState();

    useEffect(() => {
        setPreviousPageTwo(location.pathname);
        dispatch(setPreviousPage(previousPageTwo));
      }, [location.pathname]);
 
    return <Outlet />
}

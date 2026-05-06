import { useDispatch } from 'react-redux';
import { setLogOut } from '../features/auth/authSlice';

const useLogout = () => {

    const dispatch = useDispatch()

    const privateUrls = ["/compras", "/ventas"];

    const regex = new RegExp(privateUrls.join('|'));

    const logOut = () => {
        dispatch(setLogOut());
        if (regex.test(location.pathname)) {
            navigate("/", { replace: true });
        }
    }

    return [logOut]

}

export default useLogout

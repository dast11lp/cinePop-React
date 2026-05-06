import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useLogout from '../../../hooks/useLogout';
import useCloseComponent from '../../../hooks/useCloseComponent';

const UserMenu = () => {


    const [logOut] = useLogout()

    const refUserMenu = useRef()

    const [dropdownToggled, setDropdownToggled] = useCloseComponent(refUserMenu)


    let nameUser = useSelector((state) => state.auth.userLogin?.userData?.name) || JSON.parse(localStorage.getItem("user"))?.userData?.name;
    nameUser = nameUser && nameUser.toUpperCase() + " ";
    return (
        <div ref={refUserMenu} >
            <div className="navbar__nav__user" onClick={() => setDropdownToggled(!dropdownToggled)}>
                <div className="navbar__nav__user__button">
                    {nameUser ? <span className="navbar__nav__user__button__username">{nameUser}</span> : ''}
                    <FontAwesomeIcon icon={faUser} />
                </div>
                {/* <div className={`${dropdownToggled ? 'active-menu' : ''}` */}
                <div className={`navbar__nav__user__menu ${dropdownToggled ? 'active-menu' : ''}`}  >
                    <button onClick={logOut} to="#"> Cerrar Sesión </button>
                    <Link to="/usuario/miscompras"> Mis Compras </Link>
                </div>
            </div>
        </div>
    )
}

export default UserMenu

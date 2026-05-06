import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { NavLink } from 'react-router-dom'
import UserMenu from './UserMenu'

const Nav = ({ setOpenNavMenu, OpenNavMenu, OpenUserMenu, setOpenUserMenu }) => {

    const user = JSON.parse(localStorage.getItem("user"))?.userData;

    return (
        <div className="navbar__nav__navlinks ">
            <div className="navbar__nav__navlinks__menu-burger" onClick={() => { setOpenNavMenu(!OpenNavMenu) }}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            <ul className={`navbar__nav__navlinks__links ${OpenNavMenu && "active-menu-2"}`} >
                <li className="navbar__nav__navlinks__links__li">
                    <NavLink className="navbar__nav__navlinks__links__li__link" to="/" end>Inicio</NavLink>
                </li>
                <li className="navbar__nav__navlinks__links__li">
                    <NavLink className="navbar__nav__navlinks__links__li__link" to="/cartelera">Cartelera</NavLink>
                </li>
                <li className="navbar__nav__navlinks__links__li">
                    <NavLink className="navbar__nav__navlinks__links__li__link" to="/comidas">Comidas</NavLink>
                </li>
                {
                    !user ?
                        <li className="navbar__nav__navlinks__links__li">
                            <NavLink className="navbar__nav__navlinks__links__li__link" to="/public/registro">Registrarse</NavLink>
                        </li> :
                        <li className="navbar__nav__navlinks__links__li navbar__nav__navlinks__links__li--visibility">
                            <UserMenu />
                        </li>
                }
            </ul>
        </div>
    )
}

export default Nav

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { setLogOut } from "../../../features/auth/authSlice";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserMenu from "./UserMenu";
import Nav from "./Nav";

export const Navbar = () => {
  const location = useLocation()

  const [OpenUserMenu, setOpenUserMenu] = useState(false);
  const [OpenNavMenu, setOpenNavMenu] = useState(false);

  const privateUrls = ["/compras", "/ventas"];

  const regex = new RegExp(privateUrls.join('|'));

  // const user = useSelector((state) => state.auth.userLogin?.userData) || JSON.parse(localStorage.getItem("user"))?.userData;
  const user = JSON.parse(localStorage.getItem("user"))?.userData;
  let nameUser = useSelector((state) => state.auth.userLogin?.userData?.name) || JSON.parse(localStorage.getItem("user"))?.userData?.name;

  nameUser = nameUser && nameUser.toUpperCase() + " ";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setOpenUserMenu(false)
    setOpenNavMenu(false)
  }, [location.pathname])

  return (
    <div className="navbar">
      <div className="navbar__nav">
        <div className="navbar__nav">
          <div className="navbar__nav__brand">
            {/* <svg></svg> */}
            <Link className="navbar__nav__brand__name" to="/">
              CinePop
            </Link>
          </div>
          <Nav setOpenNavMenu={setOpenNavMenu} OpenNavMenu={OpenNavMenu} OpenUserMenu={OpenUserMenu} setOpenUserMenu={setOpenUserMenu} />
          <div className={`navbar__nav__userbox ${user ? 'navbar__nav__userbox--visibility' : ''} `} >
            {user ? (
              <UserMenu/>
            ) : (
              location.pathname != "/public/login" && <Link to="/public/login" className={`button ${location.pathname == "/" && " button--tertiary"}`}>
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import './NavbarComponent.scss';
import MainLogo from '../../assets/icons/mainLogoV1.png';
import MainLogoMobile from '../../assets/icons/mainLogoMobileV1.png';
import HamburgerWhite from '../../assets/icons/collapsedMenuPlatinum-48.png';
import HamburgerYellow from '../../assets/icons/collapsedMenuGoldenYellow-48.png';
import { Link } from 'react-router-dom';
import { keyRoutes } from '../RoutePaths/RouteConstants';

const NavbarComponent = () => {

    return (
        <>

            <nav>
                <input type="checkbox" id="menuToggle" />
                <label htmlFor="menuToggle" className="menuContainer">
                    <div className="menuIconContainer">
                        <img className="defaultMenuIcon" src={HamburgerWhite} />
                        <img className="hoverMenuIcon" src={HamburgerYellow} />
                    </div>
                </label>

                <span className="logoContainer">
                    <img className="webViewMainLogo" src={MainLogo} />
                    <img className="mobileViewMainLogo" src={MainLogoMobile} />
                </span>

                <ul className="navLinks">
                    <li><Link to="/"> <span> Home </span> </Link></li>
                    <li><Link to={keyRoutes.BOOKS_LIST}> <span> Books </span> </Link></li>
                    <li><Link to={keyRoutes.USERS_LIST}> <span> Users </span> </Link></li>
                    <li><Link to={keyRoutes.HISTORY_LIST}> <span> History </span> </Link></li>
                </ul>
            </nav>

        </>
    );

};

export default NavbarComponent;
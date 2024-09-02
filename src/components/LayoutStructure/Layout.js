import React from 'react'
import NavbarComponent from '../Navbar Container/NavbarComponent';
import FooterComponent from '../Footer Container/FooterComponent';
import { Router } from '../RoutePaths/Router';
import Toaster from '../../utility/Alerts/Toaster';

const Layout = () => {

    return (
        <div>

            <Toaster />
            <NavbarComponent />
            <Router />
            <FooterComponent />

        </div>
    );

};

export default Layout;
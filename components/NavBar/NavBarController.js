import React from 'react'
import NavBarH, { NavBarO } from './NavBar'


const NavBarController = ({ isProfilePage, isHome }) => {
    return (
        <NavBarH
            isProfilePage={isProfilePage}
            isHome={isHome}
        />
    )
}

export default NavBarController
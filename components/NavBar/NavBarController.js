import React from 'react'
import NavBarH, {NavBarO} from './NavBar'


const NavBarController = (props) => {
    return(
        props.type==='home' ? <NavBarH/> : <NavBarO/>
    )
}

export default NavBarController
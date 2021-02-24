import React from 'react';
import classes from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

// import classname from 'classnames';

const navbar = (props) => {

    return (
        <>
            <ul className={classes.navBar}>
                <li className={classes.navItem1}><NavLink to='/' exact className={classes.navLink} activeClassName={classes.navItemActive}>Home</NavLink></li>
                <li className={classes.navItem}><NavLink to='/about' className={classes.navLink} activeClassName={classes.navItemActive}>About</NavLink></li>
                <li className={classes.navItem}><NavLink to='/resources' className={classes.navLink} activeClassName={classes.navItemActive}>Resources</NavLink></li>
                <li className={classes.navItem}><NavLink to='/help' className={classes.navLink} activeClassName={classes.navItemActive}>Help</NavLink></li>
            </ul>
            <ul className={classes.navBar}>
                <li className={classes.navItem}></li>
            </ul>
        </>

    )
}

export default navbar;
import React from 'react';

import {NavLink} from 'react-router-dom';

import classes from './Toolbar.module.css';

const Toolbar = () => {
	return (
		<ul className={classes.MainNav}>
			<li><NavLink to="/recipes">Home</NavLink></li>
			<li><NavLink to="/grocery">Grocery</NavLink></li>
			<li><NavLink to="/menu">Menu</NavLink></li>
			<li><NavLink to="/new">New</NavLink></li>
		</ul>
	);
}

export default Toolbar;
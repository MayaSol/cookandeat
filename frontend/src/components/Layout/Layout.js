import React from 'react';

import Aux from '../../hoc/Aux/Aux';

import Toolbar from '../Toolbar/Toolbar';

import classes from '../Layout/Layout.module.css';

const Layout = ( props ) => (


	<Aux>
		<div>SideDrawer,Backdrop</div>
		<Toolbar />
		<main className = {classes.Content}>
			<h1>Cook and Eat</h1>
			{props.children}
		</main>
	</Aux>
);

export default Layout;
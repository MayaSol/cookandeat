import React from 'react';

import classes from './Recipe.module.css';


const Recipe = (props) => {

	return (
		<article className = {classes.Recipe}>
			<div className = {classes.Title}>{props.title}</div>
			<div className = {classes.Img}>
				<img src={props.image} alt=''/>
			</div>
			<div className={classes.Desc}>{props.desc}</div>
			<div className={classes.ButtonWrapper}>
				<button onClick={props.showMore}>More</button>
				<button onClick={props.editRecipe}>Edit</button>
			</div>
		</article>
	)
}

export default Recipe;
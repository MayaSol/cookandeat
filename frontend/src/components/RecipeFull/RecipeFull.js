import React, { Component } from 'react';

import classes from './RecipeFull.module.css';

import axios from '../../axios';


class RecipeFull extends Component {

	state = {
		loadedRecipe: {
			id: '',
			title: '',
			image: '',
			desc: '',
			ingredients: [],
			steps: []
		},
		loaded: false,
		error: null
	}

	loadPost = (id) => {
		console.log('loadPost: ' + id);
		console.log(this.state.loadedRecipe.id);
		if (!this.state.loadedRecipe.id || id !== this.state.loadedRecipe.id) {
			console.log('https://menu-a4540.firebaseio.com/recipes/' + id);
			axios({
				method: 'get',
				url: 'https://menu-a4540.firebaseio.com/recipes/' + id + '.json'
			})
			.then (response => {
					console.log('[RecipeFull resonse ' + id);
					console.log(response.data)
					this.setState({loadedRecipe: {...response.data, id: id}, loaded: true});
				}
			)
			.catch(error => {
				console.log('[RecipeFull error: ' + error);
				console.log(error);
				if (!this.state.error) {
					this.setState({error: error});
				}
			})
		}
	}

	componentDidMount() {
		console.log('[RecipeFull] ComponentDidMount');
		console.log(this.props.match.params.id);
		console.log(this.state.loadedRecipe.id);
		this.loadPost(this.props.match.params.id);
	}

	componentDidUpdate() {
		console.log('[RecipeFull] ComponentDidUpdate');
		this.loadPost(this.props.match.params.id);
	}

	render() {

		let ingredients = '';


		let recipe = <p>'Please select a recipe!'</p>;

		console.log('this.props.match.params.id');
		console.log(this.props.match.params.id);

		if (this.state.error) {
			console.log(this.state.error);
			recipe = <p>Something went wrong! {'' + this.state.error}</p>;
		}
		else if (this.props.match.params.id) {
			recipe = <p>'Loading...'</p>;
		}

		if (this.state.loaded) {

			if (this.state.loadedRecipe.ingredients.length > 0) {
				ingredients = this.state.loadedRecipe.ingredients
				.map((item, i) => {
					console.log('ingredients item');
					console.log(item);
					return (
					<div className={classes.IngredientsRow} key={i}>
						<div className={`${classes.IngredientsItem} ${classes.IngredientsTitle}`}>{item.name}</div>
						<div className={`${classes.IngredientsItem} ${classes.IngredientsAmount}`}>{item.amount}</div>
						<div className={`${classes.IngredientsItem} ${classes.IngredientsUnit}`}>{item.unit}</div>
					</div>
					)
				})
				.reduce((arr,el) => {
					return arr.concat(el);
				},[]);
			}

			console.log(ingredients);

			ingredients = ingredients ? <ul>{ingredients}</ul> : '';

			console.log('ingredients');
			console.log(ingredients);

			let steps = [...this.state.loadedRecipe.steps];
				steps = steps
					.map((step, i) => {
						let num = i + 1;
						return (
							<li key={num} num={num} className={classes.Steps__Item}>
								<span>{num}</span>
								<p>{step.text}</p>
							</li>
						)
					})
					.reduce((arr,el) => {
						return arr.concat(el);
					},[]);

			steps = steps ? <ul>{steps}</ul> : '';


			recipe = (
				<article>
					<h3>Loaded post</h3>
					<div>{this.state.loadedRecipe.title}</div>
					<div>
						<img src={this.state.loadedRecipe.image} alt=''/>
					</div>
					<div>{this.state.loadedRecipe.desc}</div>
					<div className = {classes.Ingredients}>
						{ingredients}
					</div>
					<div className = {classes.Steps}>
						<h2 className = {classes.Steps__Title}>Пошаговый рецепт</h2>
						{steps}
					</div>
				</article>
			);
		}

		return (
			<div>
			{recipe}
			</div>
		)
	}
}

export default RecipeFull;
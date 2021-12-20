import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Recipe from '../Recipe/Recipe';
import RecipeFull from '../RecipeFull/RecipeFull';

import classes from './RecipeList.module.css';

import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios';
import AddToMenuItem from '../../hoc/AddToMenu__Item/AddToMenu__Item';

class RecipeList extends Component {

	state = {
		recipes: [],
		error: false
	}

	componentDidMount() {
		console.log('[RecipeList] componentDidMount');

        axios({
          method: "get",
          url: "/recipes.json",
        })
        .then(response => {
        	console.log(response.data);
        	let recipes = [];
        	for (let key in response.data) {
        		recipes = [...recipes, {...response.data[key], id: key}]
        	}
        	this.setState({recipes: recipes});
        })
        .catch(error => {
            console.log('componentDidMount error: ');
            console.log(error);
            this.setState({error: true});
        })
	}

	showMore = (id) => {
		console.log('[RecipeList] showMore');
		console.log(this.props);
		this.props.history.push('/recipes/' + id);
	}

	editRecipe = (id) => {
		console.log('[RecipeList] editRecipe');
		this.props.history.push('/new/' + id);
	}

	render() {
		console.log('[RecipeList] render');
		console.log(this.state.recipes);
		const recipes = this.state.recipes.map(recipe => {
			const props = {
				...recipe,
				key: recipe.id,
				image: 'https://placeimg.com/640/480/nature',
				showMore: ()=>this.showMore(recipe.id),
				editRecipe: ()=>this.editRecipe(recipe.id)
			}
			return (
				<AddToMenuItem key={props.key} id={props.key}>
					<Recipe {...props}/> 
				</AddToMenuItem>
			)
		});
		return (
			<Aux>
	            <Route path={this.props.match.url + '/:id'} component={RecipeFull} />
				<h2>Some Recipes</h2>
				<div className={classes.Wrapper}>
					{recipes}
				</div>
			</Aux>
		)
	}
}

export default RecipeList;
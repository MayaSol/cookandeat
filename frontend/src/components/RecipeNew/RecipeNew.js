import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios';

import classes from './RecipeNew.module.css';

class RecipeNew extends Component {

	state = {
		title: '',
		desc: '',
		steps: [{text: 'fsfsf'}],
		img: '',
		ingredients: [{name: 'Bacon',unit: 'piece',amount: '3'}]
	};


	loadRecipe(id) {
		console.log('[RecipeNew] loadRecipe id= ' + id);
	}

	componentDidMount() {
		console.log('[RecipeNew] componentDidMount');
		console.log(this.props);
		if (this.props.match.params.id) {
			axios({
				method: 'get',
				url: 'https://menu-a4540.firebaseio.com/recipes/' + this.props.match.params.id + '.json'
			})
			.then (response => {
					console.log('[RecipeNew resonse ' + this.props.match.params.id);
					console.log(response.data);
					// let state = {...response.data};
					// console.log('state');
					// console.log(state);
					this.setState({...response.data});
				}
			)
			.catch(error => {
				console.log('[RecipeNew error: ' + error);
				console.log(error);
				if (!this.state.error) {
					this.setState({error: error});
				}
			})
		}
	}

	componentDidUpdate() {
		console.log('[RecipeNew] componentDidUpdate');
		console.log(this.state.ingredients);
	}

	stepOnChange(event,i) {
		let steps = [...this.state.steps];
		steps[i]['text'] = event.target.value;
		this.setState({steps: steps});
	}

	ingredientOnChange(event,i) {
		let ingredients = [...this.state.ingredients];
		switch (event.target.name) {
			case 'ing_name':
				ingredients[i]['name'] = event.target.value;
				break;
			case 'ing_unit':
				ingredients[i]['unit'] = event.target.value;
				break;
			case 'ing_amount':
				ingredients[i]['amount'] = event.target.value;
				break;
			default:
				return;
		}
		console.log('ingredientOnChage');
		console.log(ingredients);
		this.setState({ingredients: ingredients});
	}

	inputTextOnChange(event) {
		console.log('inputTextOnChange');
		console.log(event.target.name);
		switch (event.target.name) {
			case 'title':
				this.setState({title: event.target.value});
				break;
			case 'desc':
				this.setState({'desc': event.target.value});
				break;
			default:
				return;
		}
	}

	stepsBtnOnClick() {
		console.log('stepsBtnOnClick');
		let steps = [...this.state.steps,{text: ''}];
		this.setState({steps: steps});
	}

	ingBtnOnClick() {
		let ingredients = [...this.state.ingredients,{name: '', unit: '', amount: ''}]
		this.setState({ingredients: ingredients});
	}

	saveBtnOnClick() {
		let recipe = {...this.state};
		if (this.props.match.params.id) {
			axios.put(`/recipes/${this.props.match.params.id}.json`, recipe);
		}
		else {
			axios.post('/recipes.json',recipe);
		}
	}


	render() {

		let steps = [...this.state.steps];
		steps = steps
			.map((step, i) => {
				let num = i + 1;
				return (
					<li key={num} num={num} className={classes.Steps_Item}>
						<label htmlFor={`step${num}`}>{num}</label>
						<textarea id={`step${num}`} value = {this.state.steps[i]['text']||''} onChange = {(event) => this.stepOnChange(event,i)}/>
					</li>
				)
			})
			.reduce((arr,el) => {
				return arr.concat(el);
			},[]);

		let ingredients = [...this.state.ingredients];
		ingredients = ingredients
			.map((step, i) => {
				let num = i + 1;
				return (
					<li key={num} num={num} className={classes.Ingredients_Item}>
						<span>{num}</span>
						<input type='text' value = {this.state.ingredients[i]['name']||''} name=
						'ing_name' onChange = {(event) => this.ingredientOnChange(event,i)}/>
						<input type='text' value = {this.state.ingredients[i]['unit']||''} name='ing_unit' onChange = {(event) => this.ingredientOnChange(event,i)}/>
						<input type='text' value = {this.state.ingredients[i]['amount']||''} name='ing_amount' onChange = {(event) => this.ingredientOnChange(event,i)}/>
					</li>
				)
			})
			.reduce((arr,el) => {
				return arr.concat(el);
			},[])
			console.log(ingredients);



		return (
			<Aux>
				<div className={classes.Recipe}>
					<label htmlFor='title'>Title</label>
					<input type='text' id='title' name='title' value={this.state.title} onChange={(event)=>this.inputTextOnChange(event)}/>
					<label htmlFor='desc'>Description</label>
					<textarea id='desc' name='desc' value = {this.state.desc} onChange={(event)=>this.inputTextOnChange(event)}/>
					<h2>Steps</h2>
					<ul className={classes.Steps}>
						{steps}
						<button onClick = {() => this.stepsBtnOnClick()}>+</button>
					</ul>
					<h2>Ingredients</h2>
					<ul className={classes.Ingredients}>
						{ingredients}
						<button onClick = {() => this.ingBtnOnClick()}>+</button>
					</ul>
					<button className={classes.Btn_Save} onClick={() => this.saveBtnOnClick()}>Сохранить</button>
				</div>
			</Aux>
		)
	}
}

export default RecipeNew;
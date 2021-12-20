import React, { Component } from 'react';

import axios from '../../axios.js';

import DP from '../../components/DatePicker/DatePicker';
import Aux from '../Aux/Aux';

class AddToMenuItem extends Component {
/*
!!! meal делать по id из справочника, а не по названию
*/
		state = {
			added: false,
			showMenu: true,
			date: new Date().setHours(0,0,0,0),
			meal: 'Launch',
			data: {
				meal: 'Launch',
				date: new Date(),
				recipeId: this.props.id
			}
		}

		addToMenu = () => {
			console.log('addToMenu');
			let data = {};
			data[`${this.state.meal}`] = this.props.id;
			console.log('data');
			console.log(data);
			axios.post(`/menus2/${+this.state.date}.json`,data);
		}

		inputOnChange = (event) => {
			this.setState({added: event.target.value});
			this.addToMenu();
		}

		dateOnChange = (date) => {
			this.setState({date: date});
		}

		mealOnChange = (event) => {
			let data = this.state.data;
			console.log(data);
			console.log(event.target.value);
			data.meal = event.target.value
			this.setState({data: data})
		}

		render() {

			let addMenu  = null;

			if (this.state.showMenu) {
				addMenu = (
					<Aux>
						<select className="AddToMenu__Meal" onChange = {this.mealOnChange} value={this.state.data.meal}>
							<option value='Breakfast'>Breakfast</option>
							<option value='Launch'>Launch</option>
							<option value='Dinner'>Dinner</option>
						</select>
						<DP 
							selected={this.state.date}
							onChangeDate={ (date) => this.dateOnChange(date)}
						/>
					</Aux>
				);
			}


			return (
				<div className="AddToMenuItem">
					<input type="checkbox" value={this.state.added} onChange = {this.inputOnChange}/>
					{addMenu}
					{this.props.children}
				</div>
			)
		}
	}

export default AddToMenuItem;
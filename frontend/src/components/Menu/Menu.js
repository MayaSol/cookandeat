import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import DP from '../DatePicker/DatePicker';

class Menu extends Component {

	state = {
		date: new Date()
	}

	componentDidMount() {
	}


	dateOnChange = (date) => {
		console.log('dateOnChange');
		console.log(date);
		console.log(+date);
		this.setState({date: date})
	}


	render() {
		console.log('[Menu] render');
		return (
			<Aux>
				<p>Menu Component</p>
				<DP 
					selected={this.state.date}
					onChangeDate={ (date) => this.dateOnChange(date)}
				/>
			</Aux>
		)
	}

}

export default Menu;
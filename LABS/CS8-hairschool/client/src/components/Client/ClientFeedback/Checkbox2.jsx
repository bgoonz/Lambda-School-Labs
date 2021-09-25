import React, {Component} from 'react';
import './Checkbox2.css'

class Checkbox2 extends Component {

    constructor() {
		super();
		
		this.state = {
			checked: false,
			isAnimating: false,
		}
		
		this.toggleChecked = this.toggleChecked.bind(this);
		this.ping = this.ping.bind(this);
		this.composeStateClasses = this.composeStateClasses.bind(this);
	}
		
	//
	toggleChecked() {
		if (this.state.isAnimating) return false;
		this.setState({
			checked: !this.state.checked,
			isAnimating: true,
		});
	}
	
	//
	ping() {
		this.setState({ isAnimating: false })
	}
	
	//
	composeStateClasses(core) {
		let result = core;
		
		if (this.state.checked) { result += ' is-checked'; }
		else { result += ' is-unchecked' }
		
		if (this.state.isAnimating) { result += ' do-ping'; }
		return result;
	}
	
	
	render() {

		const cl = this.composeStateClasses('ui-checkbox-btn2');
		
		return (
            
			<div
				className={ cl }
				onClick={ this.toggleChecked }>
				
					<input className="ui ui-checkbox2" type="checkbox" checked={this.state.checked} />
				
					<label className="text">{ this.props.children }</label>
				<div className="ui-btn-ping" onTransitionEnd={this.ping}></div>
			</div>
		)
	}
}
    

export default Checkbox2;
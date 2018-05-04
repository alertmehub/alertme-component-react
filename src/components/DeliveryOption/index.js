/*
 * File: src/components/DeliveryOption/index.js
 * author: Sam Everett
 * email: everett@rdacorp.com
 * last update: 05/03/2018
 *
 */

import React, {Component} from 'react';
import { connect} from 'react-redux';
import './styles.css';
import * as actions from '../../actions';


/*
 * R E G E X   P A T T E R N S
 */

const patterns = {
    phone: /[\+]?[1]?[-\s\.]?[(]?(\d{3})[)]?[-\s\.]?(\d{3})[-\s\.]?(\d{4})/,
    e164: /^\+1(\d{3})(\d{3})(\d{4})$/,
    email: /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/,
}

class DeliveryOption extends Component {

    /*
     * C O N S T R U C T O R
     */
    
    constructor(props) {
	super(props)
	this.state = {
	    editing: props.editing || false,
	    optionValue: props.option.value || '',
	    optionName: props.option.name || '',
	    adding: props.adding || false,
	    delivertoNotApproved: props.notApproved || false
	}
    }


    /******************************************************************************************
     ********************** E V E N T   H A N D L E R S ***************************************
     *********8************************************8******************************************/

    /*
     * S A V E   D E L I V E R Y   O P T I O N
     */
    
    saveDeliveryOption() {

	console.log(`DELIVERY_OPTION <> SAVE_DELIVERY_OPTION`)
	alert('saving deliveryoption')
	alert(`this.props.adding: ${this.props.adding}`)
	let deliveryOption = {
	    id: this.props.adding ? this.props.newDeliveryOptionId : this.props.option.id,
	    deliveryType: patterns.phone.test(this.state.optionValue) ? 'sms' : 'email',
	    name: this.state.optionName,
	    value: this.state.optionValue,
	    status: this.props.option.status
	}
	alert('after obj creation')
	if (this.props.adding) {
	    alert('adding deliveryoption')
	    this.props.subscriber.deliveryOptions.push(deliveryOption)
	} else {

	    let updatedOption = this.props.subscriber.deliveryOptions.find((option) => {
		return option.id === deliveryOption.id
	    })
	    Object.keys(updatedOption).forEach((attribute) => {
		updatedOption[attribute] = deliveryOption[attribute]
	    })
	}
	alert('before sendupdate')
	this.props.sendUpdates(this.props.subscriber)
	alert('after sendupdate')
    }

    /*
     * C A N C E L   D E L I V E R Y   O P T I O N   E D I T
     */

    cancelDeliveryOptionEdit() {
	this.setState({
	    editing:false,
	    optionValue: this.props.option.value
	});

	this.props.cancelAddDeliveryOption()
    }

    /*
     * C H E C K   P A T T E R N
     */
    
    checkPattern = (event) => {
	
	const {value} = event.target;
	this.setState({optionValue: value})
	if (patterns.phone.test(value) || patterns.email.test(value) || patterns.e164.test(value)) {	    this.setState({delivertoNotApproved:false})
	}
	else {
	    this.setState({delivertoNotApproved:true})
	}
    }

    /*
     * H A N D L E   N A M E  C H A N G E
     */
    
    handleNameChange = (event) => {
	this.setState({optionName: event.target.value})
    }

    /*
     * C L I C K   D E L E T E   E V E N T   T E S T
     */
    clickDelete(e,option) {

	this.props.deleteDeliveryOptionz(e,option)
    }

    /********************8*****************************************************************8***
     ******************************** R E N D E R E R S ****************************8**********
     *********8*************************************8***************8**************************/

    /*
     * R E N D E R   S A V E   B U T T O N
     */

    renderSaveButton() {
	if (!this.state.delivertoNotApproved) {

	    return (
		    <button className="am-button" key="save"
		onClick={this.saveDeliveryOption.bind(this)}>Save</button>
	    )
	}
    }

    /*
     * R E N D E R   D E L E T E   B U T T O N
     */
    
    renderDeleteButton() {

	if (true) {
	    return (
		    <button className="am-button" key="delete"
		onClick={(e) => this.clickDelete(e,this.props.option)}>Delete</button>
		)
	    }
	if (!this.props.addingDeliveryOption) {
	    return <button className="am-button" key="delete"
	    onClick={(e) => this.props.deleteDeliveryOption(e,this.props.option)}>
		Delete</button>;
	}
    }

    /*
     * R E N D E R   I C O N 
     */
    
    renderIcon(type) {
	if (type==='sms') {
	    return (<svg className="am-icon"><use href="#chat" /></svg>);
	} else {
	    return (<svg className="am-icon"><use href="#email" /></svg>)
	}
	
    }

    /*
     * R E N D E R   I N I T I A L   V I E W
     */
     
    renderInitialView() {
	
	const {option: {value,name,deliveryType}} = this.props;
	const {optionValue,optionName} = this.state;

	if (this.state.editing) {

            return (
		    <div className="am-edit-option">
		    <form>
		    <input id="deliverto" name="deliverto" placeholder="email or mobile number"
		required
		value={optionValue}
                onChange={this.checkPattern}
                pattern="(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3})|([\+]?[(]?[0-9]{3}[)][-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6})|[\+]?[1]?[-\s\.]?[(]?(\d{3})[)]?[-\s\.]?(\d{3})[-\s\.]?(\d{4})"
		    />
		    <input id="name" name="name"
		placeholder="Nickname (optionall)" value={optionName}
		onChange={this.handleNameChange.bind(this)}
		    />
		    <span>
		    {this.renderSaveButton()}
		    <button className="am-button" key="cancel"
		onClick={()=>this.cancelDeliveryOptionEdit()}>
		    Cancel
		</button>
		    {this.renderDeleteButton()}
		</span>
		    </form>
		    </div>
	    )
	} else {

	    return (
		    <div>
		    <span className="am-delivery-option"
		onClick={() => this.setState({editing:true})}>
		    {this.renderIcon(deliveryType)}
		{value}
		    <span className="am-delivery-option-name"> - {name}</span>
		    </span>
		    </div>
	    );
	}
    }

    /*
     * O M E G A   R E N D E R
     */
    
    render() {
	return this.renderInitialView();
    }
}

/******************************************************************************************
 ******************************** R E D U X   C O N N E C T I O N *************************
 *********8*************************************8******************************************/

const mapStateToProps = state => {
    return {
	subscriber: state.subscriber 
    }
}

export default connect(mapStateToProps, actions)(DeliveryOption)

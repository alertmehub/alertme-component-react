
/*
 * File: src/components/Subscription/index.js
 * author: Sam Everett
 * email: everett@rdacorp.com
 * last update: 05/03/2018
 *
 */

import React, {Component} from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Slider from '../Slider';
import './styles.css';
import _ from 'lodash';
import {toggleActiveSubscription,loadSubscriber,updateSubscription} from '../../actions';
import {connect} from 'react-redux'

/******************************************************************************************
 ***************************** H E L P E R   F U N C T I O N S ****************************
 *********8*************************************8******************************************/

/*
 * C O N V E R T   L O O K U P   I T E M
 */

const convertLookupItem = (item) => {

    if (item.id) {

	return {
	    value: item.id,
	    label: item.itemName,
	    group: item.group
	}
    } else {

	return {
	    value: item.value,
	    label: item.label,
	    group: item.group
	}
    }
}

/*
 * U N C O N V E R T   L O O K U P   I T E M
 */

const unConvertLookupItem = (item) => {

    if (item.id) {

	return {
	    id: item.id,
	    itemName: item.itemName,
	    group: item.group
	}
    } else {

	return {
	    id: item.value,
	    itemName: item.label,
	    group: item.group
	}
    } 
}

class Subscription extends Component {

    /*
     * C O N S T R U C T O R
     */

    constructor(props) {

	super(props)

	this.state = {
	    active: null,
	    parameterValuesObjects: {},
	    dirty: false,
	    deliverTo: [],
	    deliveryOptionsBoolObject: {},
	    checked: true
	}

	this.toggleActiveHandler = this.toggleActiveHandler.bind(this);

    }
    
    /******************************************************************************************
     ******************************* L I F E C Y C L E   H O O K S ****************************
     *********8*************************************8******************************************/

    /*
     * C O M P O N E N T   D I D   M O U N T
     */ 

    componentDidMount() {

	const {subscription,subscriber} = this.props
	let obj = {}

	subscriber.deliveryOptions.forEach((option) => {
	    obj[option.value] = subscription.deliverTo.includes(option.value)
	})

	let paramVals = {}

	Object.keys(subscription.parameters).forEach((parameterName) => {
	    paramVals[parameterName] = {initialValue: subscription.parameters[parameterName],
					newValue: ''}
	})
	
	this.setState({
	    deliverTo: subscription.deliverTo,
	    active: subscription.active,
	    deliveryOptionsBoolObject: obj,
	    parameterValuesObjects: paramVals
	})
	
    }

    /******************************************************************************************
     *************************** E V E N T   H A N D L E R S **********************************
     *********8*************************************8******************************************/

    /*
     * T O G G L E   A C T I V E   H A N D L E R
     */

    toggleActiveHandler(e) {
	const { subscription, publisherId, token } = this.props
	e.preventDefault()
	this.setState({
	    active: !this.state.active,
	})
	this.props.toggleActiveSubscription(subscription,publisherId,token)
    }

    /*
     * H A N D L E   C H A N G E
     */

    handleChange = (parameter, value) => {

	let currentParamVals = this.state.parameterValuesObjects
	if (!this.state.dirty) {
	    // make sure that newValues are not empty
	    Object.keys(this.state.parameterValuesObjects).forEach((parameterName) => {
		currentParamVals[parameterName].newValue = currentParamVals[parameterName].initialValue
	    })
	}
	if (parameter.ptype !== 'lookup') {
	    currentParamVals[parameter.name].newValue = value.target.value
	} else {
	    currentParamVals[parameter.name].newValue = _.map(value, unConvertLookupItem)
	}

	this.setState({

	    parameterValuesObjects: currentParamVals,
	    dirty: true,
	})
    }

    /*
     * S E N D   U P D A T E S
     */
    
    sendUpdates() {

	const { subscription, token, publisherId } = this.props
	const { parameterValuesObjects } = this.state

	let updatedSubscription = subscription
	Object.keys(subscription.parameters).forEach((paramName) => {
	    updatedSubscription.parameters[paramName] = parameterValuesObjects[paramName].newValue
	})
	
	this.props.updateSubscription(updatedSubscription, publisherId, token)
	let newValsObjs = parameterValuesObjects
	Object.keys(parameterValuesObjects).forEach((parameterName) => {
	    newValsObjs[parameterName].initialValue = newValsObjs[parameterName].newValue
	})
	this.setState({dirty: false,
		       parameterValuesObjects: newValsObjs})

    }

    /******************************************************************************************
     ******************************* R E N D E R E R S ****************************************
     *********8*************************************8******************************************/

    /*
     * R E N D E R   M U L T I S E L E C T
     */
    
    renderMultiselect(parameter) {

	const { subscription: {topic: {lookupLists}}} = this.props;
	const { parameterValuesObjects } = this.state
	const lookupList = lookupLists.find(list => list.name === parameter.lookup)
	const initialVals = (parameterValuesObjects[parameter.name]) ? parameterValuesObjects[parameter.name].initialValue : []
	const newVals = (parameterValuesObjects[parameter.name]) ? parameterValuesObjects[parameter.name].newValue : []
	if (!this.state.dirty) {
	return (
		<Select
            name="form-field-name"
            value={_.map(initialVals, convertLookupItem)}
	    onChange={this.handleChange.bind(this, parameter)}
            multi={true}
            options={ _.map(lookupList.values,convertLookupItem)}
		/>
	);
	} else {
	    return (
		    <Select
		name="form-field-name"
		value={_.map(newVals, convertLookupItem)}
		onChange={this.handleChange.bind(this, parameter)}
		multi={true}
		options={ _.map(lookupList.values,convertLookupItem)}
		    />
	);
	}
    }

    /*
     * R E N D E R   P A R A M E T E R
     */

    renderParameter(parameter) {
	
	const { parameterValuesObjects } = this.state

	const valueNew = (parameterValuesObjects[parameter.name]) ? parameterValuesObjects[parameter.name].newValue : ''
	const valueInitial = (parameterValuesObjects[parameter.name]) ? parameterValuesObjects[parameter.name].initialValue : ''
	
	if (parameter.ptype === 'hidden') {
	    return(<div></div>);
	}

	if (parameter.ptype === 'currency') {
	    return (
		    <input
		key={parameter.name}
		className="am-input"
		value={this.state.dirty ? valueNew : valueInitial}
		onChange={this.handleChange.bind(this, parameter)}
		    />
	    );
	}

	if (parameter.ptype === 'text') {
	    return (
		    <input
		key={parameter.name}
		className="am-input"
		value={this.state.dirty ? valueNew : valueInitial}
		onChange={this.handleChange.bind(this, parameter)}
		    />
	    );
	}

	if (parameter.ptype === 'number') {
	    return (
		    <input
		key={parameter.name}
		className="am-input"
		value={this.state.dirty ? valueNew : valueInitial}
		onChange={this.handleChange.bind(this, parameter)}
		    />
	    );
	}

	if (parameter.ptype === 'lookup') {
	    return this.renderMultiselect(parameter);
	}
    }

    /*
     * R E N D E R   P A R A M E T E R S
     */
    
    renderParameters(parameters) {
	
	let paramsToRender = [];
	for (let i=0; i<parameters.length;i++) {
	    
	    paramsToRender.push(
		    <div key={i}>
		    <label>{parameters[i].label}</label><br/>
		    {this.renderParameter(parameters[i])}
		</div>
	    )
	}

	return paramsToRender;
	
    }

    /* 
     * R E N D E R   D I R T Y   B U T T O N S 
     */
    
    renderDirtyButtons() {

	if (this.state.dirty) {
	    return (
		    <span className="am-alert-save-cancel">
		    <button onClick={(e)=> this.sendUpdates(e)}>Save</button>
		    <button onClick={() => this.setState({dirty:false})}>Cancel</button>
		    </span>
	    )
	}
    }

    /*
     * H A N D L E   C H E C K B O X   E V E N T
     */

    handleCheckboxEvent(option,e) {

	let newList = this.state.deliverTo
	let index = newList.indexOf(option.value)

	if (index > -1) {
	    newList.splice(index,1)
	} else {
	    newList.push(option.value)
	}

	const {subscription,subscriber,publisherId,token} = this.props
	let obj = {}
	subscriber.deliveryOptions.forEach((option) => {
	    obj[option.value] = subscription.deliverTo.includes(option.value)
	})
	this.setState({
	    deliverTo:newList,
	    deliveryOptionsBoolObject: obj
	})

	/* perform action that updates database version of subscription deliverTo's */
	this.props.updateSubscription(this.props.subscription,publisherId,token)

    }

    /*
     * R E N D E R   D E L I V E R Y   O P T I O N
     */

    renderDeliveryOption(option, key) {

	if (option.deliveryType === 'sms') {
	    return (
		    <div  key={key}  >
		    <input type="checkbox" name="options" onChange={(e) => this.handleCheckboxEvent(option,e)} checked={this.state.deliveryOptionsBoolObject[option.value]} />
		    <label>{option.name}</label>
		    <svg className="am-icon"><use href="#chat" /></svg>
		    </div>
	    )
	}

	return (
		<div key={key}>
		<input type="checkbox" name="options" onChange={(e) => this.handleCheckboxEvent(option,e)} checked={this.state.deliveryOptionsBoolObject[option.value]} />
		<label>{option.name}</label>
		<svg className="am-icon"><use href="#email" /></svg>
		</div>
	)

    }

    /*
     * R E N D E R   D E L I V E R Y   O P T I O N S
     */
    
    renderDeliveryOptions(deliveryOptions) {
	let opts = [];
	for (let i=0;i<deliveryOptions.length;i++) {
	    opts.push(this.renderDeliveryOption(deliveryOptions[i], i))
	}
	return opts;
    }

    /*
     * R E N D E R   I N I T I A L   V I E W 
     */

    renderInitialView(deliveryOptions,parameters) {
	if (this.state.active) {
	    return (
		    <div>
		    {this.renderDirtyButtons()}
		    <div className="am-alert-parameters">
		    {this.renderParameters(parameters)}
		</div>
		    <div className="am-alert-deliver-to">
		    <label htmlFor="options">Deliver To:</label>
		    {this.renderDeliveryOptions(deliveryOptions)}
		</div>
		    </div>
	    );
	}
    }

    /*
     * O M E G A   R E N D E R
     */
    
    render() {

	const {deliveryOptions,subscription} = this.props;

	return (
		<div className="card fluid">
		<div className="section">
		<div>
		<div>
		<div className="slider">
                <Slider toggleActiveHandler = {this.toggleActiveHandler}
	    active={this.state.active} />
		</div>
		<div className="am-alert-name">{subscription.topic.label}</div>
		<div className="am-alert-description">{subscription.topic.description}</div>
		</div>
		</div> 
		{this.renderInitialView(
		    deliveryOptions,
		    subscription.topic.parameters
		)}
            </div>
		</div>
	);
    }
}

/******************************************************************************************
 ******************************* R E D U X   C O N N E C T I O N **************************
 *********8*************************************8******************************************/

const mapStateToProps = state => {
    return {
	subscriber: state.subscriber,
	publisherId: state.publisherId,
	token: state.token
    }
}

export default connect(mapStateToProps, {
    toggleActiveSubscription,
    loadSubscriber,
    updateSubscription
})(Subscription);


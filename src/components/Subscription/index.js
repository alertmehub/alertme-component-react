import React, {Component} from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import * as actions from '../../actions';
import Slider from '../Slider';
import './styles.css';
import _ from 'lodash';

const convertLookupItem = (item) => {
    return {
	value: item.id,
	label: item.itemName
    }	
}
class Subscription extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: true,
      selectedOption: '',
    }
    this.toggleActiveHandler = this.toggleActiveHandler.bind(this);
  }
  toggleActiveHandler(e) {
    e.preventDefault()
    this.setState({
      active: this.state.active ? false : true,
    })
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Selected: ${selectedOption.label}`);
  }
    renderMultiSelect(parameter,value) {
	const { subscriptions,subscriptionIndex} = this.props;
	const lookupList = subscriptions[subscriptionIndex].topic.lookupLists.find(list => list.name === parameter.lookup)
	

    const {selectedOption} = this.state;
    return (
      <Select
        name="form-field-name"
        value={_.map(value, convertLookupItem)}
        onChange={this.handleChange}
        multi={true}
        options={ _.map(lookupList.values,convertLookupItem)}
      />
    );
  }
    renderParameter(parameter) {
	const {subscriptions, subscriptionIndex} = this.props;
	const value = subscriptions[subscriptionIndex].parameters[parameter.name]
	
    if (parameter.ptype === 'hidden') {
      return(<div></div>);
    }
    if (parameter.ptype === 'currency') {
      return (<input className="am-input" value={value}/>);
    }
    if (parameter.ptype === 'text') {
	return (<input className="am-input" value={value}/>);
    }
    if (parameter.ptype === 'number') {
      return (<input className="am-input" value={value}/>);
    }
    if (parameter.ptype === 'lookup') {
	return this.renderMultiSelect(parameter,value);
    }
  }
    renderParameters(parameters) {
	console.log(`parameters.length: ${parameters.length}`)
    let paramsToPublish = [];
    for (let i=0; i<parameters.length;i++) {

      paramsToPublish.push(
        <div key={i}>
          <label>{parameters[i].label}</label><br/>
          {this.renderParameter(parameters[i])}
        </div>
      )

    }
    return paramsToPublish;
  }
    renderInitialView(active,deliveryOptions,parameters) {

    if (active) {
      return (
          <div>
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
  renderDeliveryOption(option, key) {
    if (option.deliveryType == 'sms') {
      return (
        <div className="pure-checkbox" key={key}>
          <input type="checkbox" name="options" />
          <label>{option.name}</label>
          <svg className="am-icon"><use href="#chat" /></svg>
        </div>
      )
    }
    return (
      <div className="pure-checkbox" key={key}>
        <input type="checkbox" name="options" />
        <label>{option.name}</label>
        <svg className="am-icon"><use href="#email" /></svg>
      </div>
    )
  }
  renderDeliveryOptions(deliveryOptions) {
    let opts = [];
    for (let i=0;i<deliveryOptions.length;i++) {
      opts.push(this.renderDeliveryOption(deliveryOptions[i], i))
    }
    return opts;
  }
    render() {
	
    const {subscriptionIndex,subscriptions,deliveryOptions} = this.props;
      //console.log(`Object.keys(subscriptions[subscriptionIndex].topic): ${Object.keys(subscriptions[subscriptionIndex].topic}`)
      
    return (
      <div className="card fluid">
        <div className="section">
          <div>
            <div>
              <div className="slider">
                <Slider subscriptionIndex={subscriptionIndex} toggleActiveHandler = {this.toggleActiveHandler}/>
              </div>
              <div className="am-alert-name">{subscriptions[subscriptionIndex].topic.label}</div>
              <div className="am-alert-description">{subscriptions[subscriptionIndex].topic.description}</div>
            </div>
          </div>
            {this.renderInitialView(this.state.active,deliveryOptions,subscriptions[subscriptionIndex].topic.parameters)}

        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    deliveryOptions: state.deliveryOptions,
    subscriptions: state.subscriptions,
  }
}

export default connect(mapStateToProps, actions)(Subscription);

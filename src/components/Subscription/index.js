import React, {Component} from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import * as actions from '../../actions';
import Slider from '../Slider';
import './styles.css';


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
  renderMultiSelect(parameter) {
    const {selectedOption} = this.state;
    return (
      <Select
        name="form-field-name"
        value={selectedOption}
        onChange={this.handleChange}
        multi={true}
        options={parameter.lookup}
      />
    );
  }
  renderParameter(parameter) {
    if (parameter.ptype === 'hidden') {
      return(<div></div>);
    }
    if (parameter.ptype === 'currency') {
      return (<input className="am-input" value={parameter.value}/>);
    }
    if (parameter.ptype === 'text') {
      return (<input className="am-input" value={parameter.value}/>);
    }
    if (parameter.ptype === 'number') {
      return (<input className="am-input" value={parameter.value}/>);
    }
    if (parameter.ptype === 'lookup') {
      return this.renderMultiSelect(parameter);
    }
  }
  renderParameters(parameters) {
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
  renderInitialView(active,deliveryOptions) {
    const {subscriptions,subscriptionIndex} = this.props;
    if (active) {
      return (
          <div>
            <div className="am-alert-parameters">
              {this.renderParameters(subscriptions[subscriptionIndex].parameters)}
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
    console.log(`subscriptions[subscriptionIndex].active: ${subscriptions[subscriptionIndex].active}`)
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
          {this.renderInitialView(this.state.active,deliveryOptions)}

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

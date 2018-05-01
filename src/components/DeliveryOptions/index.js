import React, {Component} from 'react';
import {connect} from 'react-redux';
import DeliveryOption from '../DeliveryOption';
import './styles.css';
import {newDeliveryOptionButtonPressed} from '../../actions';

class DeliveryOptions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adding: props.adding || false,
    }

  }

  renderOptions() {
    let options = [];
    for (let i=0; i<this.props.deliveryOptions.length;i++) {
      options.push(
        <DeliveryOption
          key={i}
          option={this.props.deliveryOptions[i]}
        />
      )
    }
    return options;
  }

  renderAddOptionSection() {
    if(!this.props.addingDeliveryOption)
      return (<button className="am-button" onClick={() => this.props.newDeliveryOptionButtonPressed()}>New Delivery Option</button>);
    else {
      return (
        <div className="am-add-delivery-option">
          <p className="am-instruction">Enter an email address or mobile phone number:</p>
          <DeliveryOption adding={true} option={{}} editing={true} notApproved={true}/>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <h4>Delivery Options</h4>
        {this.renderOptions()}
        {this.renderAddOptionSection()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    deliveryOptions: state.deliveryOptions,
    addingDeliveryOption: state.addingDeliveryOption
  }
}

export default connect(mapStateToProps, {newDeliveryOptionButtonPressed})(DeliveryOptions);

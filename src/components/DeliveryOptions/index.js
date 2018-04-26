import React, {Component} from 'react';
import DeliveryOption from '../DeliveryOption';
import './styles.css';

const deliveryOptions = [
  {value:'layne@rdacorp.com',name:'RDA',type:'email'},
  {value:'(301) 646-1876', name:'Text',type:'sms'}
]
export default class DeliveryOptions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adding: props.adding || false,
    }

  }
  renderOptions() {
    let options = [];
    for (let i=0; i<deliveryOptions.length;i++) {
      options.push(
        <DeliveryOption
          key={i}
          option={deliveryOptions[i]}
        />
      )
    }
    return options;
  }
  renderAddOptionSection() {
    if(!this.state.adding)
      return (<button className="am-button" onClick={() => this.setState({adding:true})}>New Delivery Option</button>);
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

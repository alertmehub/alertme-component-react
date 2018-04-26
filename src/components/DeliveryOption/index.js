import React, {Component} from 'react';
import './styles.css';

const patterns = {
  phone: /[\+]?[1]?[-\s\.]?[(]?(\d{3})[)]?[-\s\.]?(\d{3})[-\s\.]?(\d{4})/,
  e164: /^\+1(\d{3})(\d{3})(\d{4})$/,
  email: /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/
}
export default class DeliveryOption extends Component {
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

  saveDeliveryOption() {


  }

  cancelDeliveryOptionEdit() {
    this.setState({
      editing:false,
      adding:false
    })
  }
  renderSaveButton() {
    if (!this.state.delivertoNotApproved) {
      return <button className="am-button" key="save">Save</button>;
    }
  }
  renderDeleteButton() {
    if (!this.state.adding) {
      return <button className="am-button" key="delete">Delete</button>;
    }
  }

  checkPattern = (event) => {
    const {value} = event.target;
    if (patterns.phone.test(value) || patterns.email.test(value) || patterns.e164.test(value)) {
      this.setState({delivertoNotApproved:false})
    }
    else {
      this.setState({delvertoNotApproved:true})
    }
  }
  renderIcon(type) {
    console.log(type)
    if (type==='sms') {
      return (<svg className="am-icon"><use href="#chat" /></svg>);
    } else {
      return (<svg className="am-icon"><use href="#email" /></svg>)
    }

  }
  renderEditOption() {
    const {option: {value,name,type}} = this.props;
    return (
      <div className="am-edit-option">
        <form>
          <input id="deliverto" name="deliverto" placeholder="email or mobile number"
            required value={value}
            onChange={this.checkPattern}
            pattern="(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3})|([\+]?[(]?[0-9]{3}[)][-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6})"/>
          <input id="name" name="name" placeholder="Nickname (optionall)" value={name} />
          <span>
            {this.renderSaveButton()}
            <button className="am-button" key="cancel" onClick={()=>this.cancelDeliveryOptionEdit()}>Cancel</button>
            {this.renderDeleteButton()}
          </span>
        </form>
      </div>
    )
  }
  renderInitialView() {
    const {option: {value,name,type}} = this.props;
    if (this.state.editing) {
        return (
          <div className="am-edit-option">
            <form>
              <input id="deliverto" name="deliverto" placeholder="email or mobile number"
                required value={value}
                onChange={this.checkPattern}
                pattern="(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3})|([\+]?[(]?[0-9]{3}[)][-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6})"/>
              <input id="name" name="name" placeholder="Nickname (optionall)" value={name} />
              <span>
                {this.renderSaveButton()}
                <button className="am-button" key="cancel" onClick={()=>this.cancelDeliveryOptionEdit()}>Cancel</button>
                {this.renderDeleteButton()}
              </span>
            </form>
          </div>
        )

    } else {
      return (
        <div>
          <span className="am-delivery-option" onClick={() => this.setState({editing:true})}>
            {this.renderIcon(type)}
            {value}
            <span className="am-delivery-option-name"> - {name}</span>
          </span>
        </div>
          );
    }
  }
  render() {
    return this.renderInitialView();
  }
}

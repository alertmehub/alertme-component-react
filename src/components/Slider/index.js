import React, {Component} from 'react';
import {connect} from 'react-redux';
import './styles.css'

class Slider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      on:true
    }
  }
  handleToggle(e) {
    this.setState({on: this.state.on ? false : true,});
    this.props.toggleActiveHandler(e);
  }
  renderSlider() {

    if (this.state.on) {
      return (
        <div className="am-slider am-slider-on">
          <span className="am-slider-switch"></span>
          <span className="am-slider-on-value">On</span>
        </div>
      )
    }
    return (
      <div className="am-slider am-slider-off">
        <span className="am-slider-switch"></span>
        <span className="am-slider-off-value">Off</span>
      </div>
    )
  }
  render() {
    return (
      <div onClick={(e) => {this.handleToggle(e)}}>
        {this.renderSlider()}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    subscriptions: state.subscriptions,
  };
}

export default connect(mapStateToProps)(Slider);

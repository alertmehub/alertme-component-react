/*
 * File: src/components/DeliveryOptions/index.js
 * author: Sam Everett
 * email: everett@rdacorp.com
 * last update: 05/03/2018
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import DeliveryOption from '../DeliveryOption';
import './styles.css';

class DeliveryOptions extends Component {

    /*
     * C O N S T R U C T O R
     */
    
    constructor(props) {

	super(props)
	/*
	this.state = {
	    adding: props.adding || false,
	    newDeliveryOptionId: 0,
	}
	*/
	this.state = {
	    adding: false,
	    newDeliveryOptionId: 0,
	}

	this.deleteDeliveryOption = this.deleteDeliveryOption.bind(this)
	this.cancelAddDeliveryOption = this.cancelAddDeliveryOption.bind(this)
	this.addingNewDeliveryOption = this.addingNewDeliveryOption.bind(this)
    }

    /******************************************************************************************
     ******************************* L I F E C Y C L E   H O O K S ****************************
     *********8*************************************8******************************************/

    /*
     * C O M P O N E N T   W I L L   R E C E I V E   P R O P S
     */

    componentWillReceiveProps(nextProps) {

	this.setState({newDeliveryOptionId: nextProps.deliveryOptions.length+1})
    }

    /******************************************************************************************
     ****************************** E V E N T   H A N D L E R S *******************************
     *********8*************************************8******************************************/

    /*
     * D E L E T E   D E L I V E R Y   O P T I O N
     */
    
    deleteDeliveryOption(e,option) {

	this.props.deleteDeliveryOptionAndUpdateSubscriber(e,option)
    }

    /*
     * C A N C E L   A D D   D E L I V E R Y   O P T I O N
     */

    cancelAddDeliveryOption() {

	this.setState({adding:false})
    }

    /*
     * A D D I N G   N E W   D E l I V E R Y   O P T I O N
     */

    addingNewDeliveryOption() {

	this.setState({adding:true})
    }
    
    /******************************************************************************************
     ************************************ R E N D E R E R S ***********************************
     *********8*************************************8******************************************/

    /*
     * R E N D E R   O P T I O N S
     */

    renderOptions() {
	
	let optionsToRender = [];
	if (this.props.deliveryOptions) {
	    for (let i=0; i<this.props.deliveryOptions.length;i++) {
		optionsToRender.push(
			<DeliveryOption
		    key={i}
		    option={this.props.deliveryOptions[i]}
		    newDeliveryOptionId={this.state.newDeliveryOptionId}
		    deleteDeliveryOptionz={this.deleteDeliveryOption}
			/>
		)
	    }
	} 

	return optionsToRender;

    }

    /*
     * R E N D E R   A D D   O P T I O N   S E C T I O N
     */
    
    renderAddOptionSection() {

	if (!this.state.adding) {
	    return (
		    <button className="am-button"
		onClick={this.addingNewDeliveryOption}>
		    New Delivery Option</button>
	    );
	} else {
	    return (
		    <div className="am-add-delivery-option">
		    <p className="am-instruction">
		    Enter an email address or mobile phone number:</p>
		    <DeliveryOption adding={true} option={{}} editing={true}
		
		notApproved={true} cancelAddDeliveryOption={this.cancelAddDeliveryOption} />
		    </div>
	    )
	}
    }

    /*
     * O M E G A   R E N D E R
     */

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

/******************************************************************************************
 ******************************** R E D U X   C O N N E C T I O N *************************
 *********8*************************************8******************************************/

const mapStateToProps = state => {
    return {
	deliveryOptions: state.subscriber.deliveryOptions,
	addingDeliveryOption: state.addingDeliveryOption
    }
}

export default connect(mapStateToProps)(DeliveryOptions);

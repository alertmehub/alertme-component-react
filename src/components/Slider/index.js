/*
 * File: src/components/Slider/index.js
 * author: Sam Everett
 * email: everett@rdacorp.com
 * last update: 05/03/2018
 *
 */

import React, {Component} from 'react';
import './styles.css'

class Slider extends Component {

    /*
     * C O N S T R U C T O R
     */
    
    constructor(props) {
	super(props)
	this.state = {
	    on:false
	}

    }

    /******************************************************************************************
     ******************************* L I F E C Y C L E   H O O K S ****************************
     *********8*************************************8******************************************/

    /*
     * C O M P O N E N T   W I L L   R E C E I V E   P R O P S
     */

    componentWillReceiveProps(nextProps) {
	this.setState({on:nextProps.active})
    }
    
    /******************************************************************************************
     ****************************** E V E N T   H A N D L E R S *******************************
     *********8*************************************8******************************************/
    
    /*
     * H A N D L E   T O G G L E
     */
    
    handleToggle(e) {
	this.setState({on: !this.state.on });
	this.props.toggleActiveHandler(e);
    }

    /******************************************************************************************
     ************************************ R E N D E R E R S ***********************************
     *********8*************************************8******************************************/
    
    /*
     * R E N D E R   S L I D E R
     */
    
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

    /*
     * O M E G A   R E N D E R
     */
    
    render() {
	return (
		<div onClick={(e) => {this.handleToggle(e)}}>
		{this.renderSlider()}
	    </div>
	);
    }
}

export default Slider;

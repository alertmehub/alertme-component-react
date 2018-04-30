const deliveryOptions = [
  {value:'layne@rdacorp.com',name:'RDA',deliveryType:'email'},
  {value:'(301) 646-1876', name:'Text',deliveryType:'sms'}
]
const subscriptions = [
  {
    topic: {
      label: 'Topic Number 1',
      description: 'This is a description of topic 1'
    },
    parameters: [
      {
        ptype: 'currency',
        label: 'Currency Parameter',
        value: 100,
      },
      {
        ptype: 'lookup',
        label: 'Lookup Parameter',
        lookup:[
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' },
        ],
      }
    ]
  },
  {
    topic: {
      label: 'Topic 2',
      description: 'This is a description of topic 2'
    },
    parameters: [
      {
        ptype: 'number',
        label: 'Number Parameter',
        value: 100
      },
      {
        ptype: 'text',
        label: 'Text Parameter',
        value: 'Testing123'
      }
    ]
  }
]
export const receiveDeliveryOptions = (json) => {
    return {
	type: 'INITIAL_DELIVERY_OPTIONS_FETCH',
	payload:json.deliveryOptions,
	receivedAt: Date.now()
    }
}

export const receiveSubscriptions = (json) => {
    return {
	type: 'INITIAL_SUBSCRIPTIONS_FETCH',
	payload: json.subscriptions,
	receivedAt: Date.now()
    }
}
export const receiveSubscriber = (json) => {
    return (dispatch) => {
	dispatch({
	    type: 'SUBSCRIBER_FETCH',
	    payload: json,
	    receivedAt: Date.now()
	})
    }
}

export const loadSubscriber = () => {
    return (dispatch) => {
	dispatch({
	    type: 'NO_TYPE',
	    payload: fetch('https://component.alertmehub.com/api/v1/subscribers/test.com/token1')
		.then((response) => {
		    return response.json()
		})
		.then((subscriberJson) => {
		    return dispatch(receiveSubscriber(subscriberJson))
		})
		.catch((error) => {
		    console.log('error occurred', error)
		}),
	})
    }
}



export const loadInitialDeliveryOptions = () => {

  return (dispatch) => {
      dispatch({
	  type: 'INITIAL_DELIVERY_OPTIONS_FETCH',
	  payload:     fetch('https://component.alertmehub.com/api/v1/subscribers/test.com/token1')
	.then((response) => {
	    return response.json()
	})
	.then((myJson) => {
	    console.log(`deliveryOptios: ${myJson.deliveryOptions}`)
	    return dispatch(receiveDeliveryOptions(myJson))
	})
	.catch((error) => {
	    console.log('error occurred',error)
	}),
      });
  }
}



export const loadInitialSubscriptions = () => {
      return (dispatch) => {
      dispatch({
	  type: 'INITIAL_SUBSCRIPTIONS_FETCH',
	  payload:     fetch('https://component.alertmehub.com/api/v1/subscribers/test.com/token1')
	.then((response) => {
	    return response.json()
	})
	.then((myJson) => {
	    console.log(`deliveryOptios: ${myJson.deliveryOptions}`)
	    return dispatch(receiveSubscriptions(myJson))
	})
	.catch((error) => {
	    console.log('error occurred',error)
	}),
      });
  }
}

export const formUpdate = ({prop, value}) => {
  return {
    type: 'FORM_UPDATE',
    payload: { prop, value},
  };
};

export const newDeliveryOptionButtonPressed = () => {
  return {
    type: 'NEW_DELIVERY_OPTION_BUTTON_PRESSED',
  }
}

export const cancelNewDeliveryOptionButtonPressed = () => {
  return {
    type: 'CANCEL_NEW_DELIVERY_OPTION',
  }
}

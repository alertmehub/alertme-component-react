
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

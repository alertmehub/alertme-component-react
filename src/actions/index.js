/*
 * File: src/actions/index.js
 * author: Sam Everett
 * email: everett@rdacorp.com
 * last update: 05/03/2018
 *
 */

const REMOTE_URL = 'https://component.alertmehub.com/api/v1'

/******************************************************************************************
 ************************************ R E C E I V E R S ***********************************
 *********8*************************************8******************************************/

/*
 * R E C E I V E   S U B S C R I B E R
 */

export const receiveSubscriber = (json) => {
    return (dispatch) => {
	dispatch({
	    type: 'SUBSCRIBER_FETCH',
	    payload: json,
	    receivedAt: Date.now()
	})
    }
}

/*
 * R E C E I V E   S U B S C R I P T I O N
 */

export const receiveSubscription = (json) => {
    return (dispatch) => {
	dispatch({
	    type: 'SUBSCRIPTION_FETCH',
	    payload: json,
	    receivedAt: Date.now()
	})
    }
}

/******************************************************************************************
 ************************************ U P D A T E R S *************************************
 *********8*************************************8******************************************/

/*
 * U P D A T E   S U B S C R I P T I O N
 */

export const updateSubscription = (subscription,publisherId,token) => {

    return (dispatch) => {
	dispatch({
	    type: 'UPDATE_SUBSCRIPTION',
	    payload: fetch(`${REMOTE_URL}/subscriptions/${publisherId}/${token}`,
			   {
			       method: 'PUT',
			       body: JSON.stringify(subscription),
			       headers: new Headers({
				   'Content-Type': 'application/json'
			       })
			   })
		.then((response) => {
		    return response.json()
		})
		.then((subscriptionJson) => {
		    return dispatch(receiveSubscription(subscriptionJson))
		})
		.catch((error) => {
		    console.log('error occurred', error)
		}),
	})
    }
}

/*
 * U P D A T E   S U B S C R I B E R
 */

export const updateSubscriber = (subscriber) => {

    return {
	type: 'UPDATE_SUBSCRIBER',
	payload: subscriber
    }
}

/*
 * T O G G L E   A C T I V E   S U B S C R I P T I O N
 */

export const toggleActiveSubscription = (subscription, publisherId, token) => {
    subscription.active = !subscription.active
    
    return (dispatch) => {
	return dispatch(updateSubscription(subscription,publisherId, token))
    }
}

/*
 * S E N D   U P D A T E S
 */

export const sendUpdates = (subscriber) => {

    alert('ACTIONS <> sending updates')
    return (dispatch) => {
	dispatch({
	    type: 'NO_TYPE',
	    payload: fetch(`${REMOTE_URL}/subscribers/${subscriber.publisherId}/${subscriber.token}`,
			   {
			       method: 'PUT',
			       body: JSON.stringify(subscriber),
			       headers: new Headers({
				   'Content-Type': 'application/json'
			       }),
			   })
		.then((response) => {
		    return response.json()
		})
		.then((subscriberJson) => {
		    return dispatch(updateSubscriber(subscriber))
		})
		.catch((error) => {
		    console.log('error occurred', error)
		}),
	})
    }
}

/*
 * S E T   C R E D E N T I A L S
 */

export const setCredentials = (publisherId, token) => {

    return (dispatch) => {
	dispatch({
	    type: 'SET_CREDENTIALS',
	    payload: {publisherId,token}
	})
    }
}

/******************************************************************************************
 ************************************ D E L E T E R S *************************************
 *********8*************************************8******************************************/

export const deleteDeliveryOption = (deliveryOption,deliveryOptions) => {

    let newList = deliveryOptions
    let index = newList.indexOf(deliveryOption.value)
    
    if (index > -1) {
	newList.splice(index,1)
    } else {
	console.log('deleting thing that doesn\'t exist')
    }

    return (dispatch) => {

	dispatch({
	    type: 'DELETE_DELIVERY_OPTION',
	    payload: deliveryOptions,
	})
    }
}

/******************************************************************************************
 ************************************ L O A D E R S ***************************************
 *********8*************************************8******************************************/

/*
 * L O A D   S U B S C R I B E R
 */

export const loadSubscriber = () => {
    return (dispatch) => {
	dispatch({
	    type: 'NO_TYPE',
	    payload: fetch(`${REMOTE_URL}/subscribers/test.com/token2`)
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

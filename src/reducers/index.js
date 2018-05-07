/*
 * File: src/reducers/index.js
 * author: Sam Everett
 * email: everett@rdacorp.com
 * last update: 05/07/2018
 *
 */


/*
 * I N I T I A L   S T A T E   D E F I N I T I O N
 */

const initialState = {
    deliveryOptions: [],
    subscriber: {},
    publisherId: '',
    token: ''
};


export default (state = initialState, action) => {
  switch(action.type) {

  case 'SET_CREDENTIALS':
      return {
	  ...state,
	  publisherId: action.payload.publisherId,
	  token: action.payload.token
      }
      
  case 'SUBSCRIBER_FETCH':
      return {
	  ...state,
	  subscriber: action.payload
      }

  case 'SEND_UPDATES':
      return {
	  ...state,
	  subscriber: action.payload
      }

  case 'UPDATE_SUBSCRIBER':
      return {
	  ...state,
	  subscriber: action.payload
      }
      
  case 'DELETE_DELIVERY_OPTION':
      return {
	  ...state,
	  deliveryOptions: action.payload
      }

  default:
      return state;
  }
}

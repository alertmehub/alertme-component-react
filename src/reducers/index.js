const initialState = {
  addingDeliveryOption: false,
  deliveryOptions: [],
  subscriptions: [],

};

export default (state = initialState, action) => {
  switch(action.type) {

  case 'INITIAL_DELIVERY_OPTIONS_FETCH':
      console.log(`action.payload: ${action.payload}`)
      return {
          ...state,
          deliveryOptions: action.payload,
      }
      
  case 'FORM_UPDATE':
      return {
          ...state,
          [action.payload.prop]: action.payload.value
      }
  case 'NEW_DELIVERY_OPTION_BUTTON_PRESSED':
      return {
          ...state,
          addingDeliveryOption:true
      }
  case 'SUBSCRIBER_FETCH':
      return {
	  ...state,
	  subscriptions: action.payload.subscriptions,
	  deliveryOptions: action.payload.deliveryOptions
      }
      
  case 'CANCEL_NEW_DELIVERY_OPTION':
      return {
          ...state,
          addingDeliveryOption:false
      }
  default:
      return state;
  }
}

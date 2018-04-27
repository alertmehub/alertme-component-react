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
export const loadInitialDeliveryOptions = () => {
  console.log('LOADING INITIAL DELIVERY OPS')
  return (dispatch) => {
    dispatch({type: 'INITIAL_DELIVERY_OPTIONS_FETCH', payload: deliveryOptions});
  }
}

export const loadInitialSubscriptions = () => {

  console.log('LOADING INITIAL SUBS')
  return (dispatch) => {
    dispatch({type: 'INITIAL_SUBSCRIPTIONS_FETCH', payload: subscriptions});
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

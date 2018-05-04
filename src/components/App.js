import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import Thunk from 'redux-thunk';
import './App.css';
import Subscriber from './Subscriber';
import reducers from '../reducers';

/*
 * D E F I N E   R E D U X   S T O R E
 */

const store = createStore(reducers,applyMiddleware(Thunk))

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
            <Subscriber publisherId={this.props.publisherId} token={this.props.token} />
        </div>
      </Provider>
    );
  }
}

export default App;

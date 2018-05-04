import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App publisherId={"test.com"} token={"token2"} />, document.getElementById('root'));
registerServiceWorker();

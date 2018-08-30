import React from 'react';
import ReactDOM from 'react-dom';
import './material.css'; // Google Material Design styles
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

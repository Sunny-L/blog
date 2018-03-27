import React from 'react';
import ReactDOM from 'react-dom';
import App from './Layout';
import './app.less'
import { HashRouter } from 'react-router-dom'

ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'));

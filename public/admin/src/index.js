import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'
import App from './layouts/Base';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import {configure} from 'mobx';
import {Provider} from 'mobx-react';
import mainStore from './models/mainStore';
import userStore from './models/userStore';
import commonStore from './models/commonStore';
import App from './components/App';
import './style.css';

const stores = {
  mainStore, userStore, commonStore
};

// 状态始终需要通过动作来更新(实际上还包括创建)
configure({'enforceActions': 'always'});

ReactDOM.render((
    <Provider {...stores}>
        <App />
    </Provider>
  ), document.getElementById('container'));
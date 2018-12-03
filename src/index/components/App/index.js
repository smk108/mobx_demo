import React, {Component} from 'react';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools'
import Todo from '../Todo';
import User from '../User';
import './style.css';

@observer
export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return(
            <div className='app_content'>
                <DevTools />
                <div className='todo_content'>
                    <Todo />
                </div>
                <div className='user_content'>
                    <User />
                </div>
            </div>
        );
    }
}

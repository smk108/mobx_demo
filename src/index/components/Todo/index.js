import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import autobind from "autobind-decorator";
import ConfigureTodo from '../ConfigureTodo';
import './style.css';

@inject( 'mainStore')
@observer
export default class Todo extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    @autobind
    handleClick(selectedId){
        this.props.mainStore.changeActiveItem(selectedId);
    }

    render(){
        const {todos} = this.props.mainStore;
        return(
            <div className='todo'>
                <ul className='todo_list'>
                    {todos.map(item =>
                        <li
                            key={item.id}
                            className={item.finished ? 'li_finished' : 'li_not_finished'}
                            onClick={() => this.handleClick(item.id)}>{item.taskName}
                        </li>)}
                </ul>
                <ConfigureTodo />
            </div>
        );
    }
}

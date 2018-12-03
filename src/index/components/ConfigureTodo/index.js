import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import { Checkbox, Button} from 'antd';
import autobind from 'autobind-decorator';
import './style.css';

// 一个组件可以observer多个不同的的store
@inject( 'mainStore', 'userStore')
@observer
export default class ConfigureTodo extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    @autobind
    onChange(checked){
        this.props.mainStore.handleFinished(checked);
    }

    @autobind
    handleAddTask(state){
        this.props.mainStore.handleAddTask(state);
    }

    render(){
        const {activeTodo, hasNotFinished} = this.props.mainStore;
        const {user} = this.props.userStore;
        return(
            <div className='configure_todo'>
                <div className='configure_todo_line'>task:{activeTodo.taskName}</div>
                <div className='configure_todo_line'>
                    <Checkbox
                        checked={activeTodo.finished}
                        onChange={(e) => this.onChange(e.target.checked)}
                    >finished</Checkbox>
                </div>
                <div className='configure_todo_tips'>Hi,{user.name}, You still have {hasNotFinished.length} unfinished task</div>
                <div className='configure_todo_button'>
                    <Button type='primary' onClick={() => this.handleAddTask(false)}>Add Unfinished Task</Button>
                    <Button type='primary' onClick={() => this.handleAddTask(true)}>Add Finished Task</Button>
                </div>
            </div>
        );
    }
}

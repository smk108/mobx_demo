import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Button} from 'antd';
import Timer from '../Timer';
import './style.css';

@inject( 'userStore')
@observer
export default class User extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        const {user} = this.props.userStore;
        return(
            <div className='user'>
                <div className='user_list'>name：{user.name}</div>
                <div className='user_list'>role：{user.name}</div>
                <div className='user_list'>{user.isGuest ? `isGuest：${user.isGuest}` : ''}</div>
                <Button type='primary' onClick={() => this.props.userStore.changeUser()}>Change User</Button>
                <Timer />
            </div>
        );
    }
}

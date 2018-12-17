import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {observable, action} from "mobx";
import './style.css';

@inject('commonStore')
@observer
export default class Timer extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    @observable secondsPassed = 0;

    componentWillMount(){
        this.props.commonStore.startTime();
        this.timer = setInterval(this.handleChangeSecondsPassed,1000);
    }

    @action.bound handleChangeSecondsPassed(){
        this.secondsPassed ++;
    }

    render(){
        const {time} = this.props.commonStore;
        return(
            <div className='time_content'>
                <div>{time}</div>
                <div>Seconds passed:{this.secondsPassed}</div>
            </div>
        );
    }
}

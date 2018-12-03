import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import './style.css';

@inject('commonStore')
@observer
export default class Timer extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    componentWillMount(){
        this.props.commonStore.startTime();
    }

    render(){
        const {time} = this.props.commonStore;
        return(
            <div className='time_content'>
                {time}
            </div>
        );
    }
}

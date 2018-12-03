import {observable, action} from 'mobx';

class commonStoreClass {
    @observable time = '';
    @action updateTime(time){
        this.time = time;
    }
    @action.bound computedTime(){
        const nowTime=new Date();
        const year=nowTime.getFullYear();
        const month=nowTime.getMonth()+1;
        const date=nowTime.getDate();
        const time = year+"年"+month+"月"+date+" "+nowTime.toLocaleTimeString();
        this.updateTime(time);
    }
    @action startTime(){
        this.timer = setInterval(this.computedTime,1000);
    }
    @action stopTime(){
        clearInterval(this.timer);
    }
}
const commonStore = new commonStoreClass();

export default commonStore;
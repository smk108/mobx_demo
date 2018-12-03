import {observable, computed, action} from 'mobx';

class userStoreClass {
    @observable user = {
      name: 'admin',
      role: '管理员'
    };
    count = 0;
    @observable list = ['a', 'b', 'c', 'd'];

    @computed get listLength(){
        return this.list.length;
    }
    @computed get userName(){
        return this.user.name;
    }
    @action changeUser(){
      if(this.count % 2 === 1){
          this.user = {
              name: 'admin',
              role: '管理员'
          };
      }else{
          this.user.name = 'guest';
          this.user.role = '访客';
          this.user.isGuest = 'true';
      }
      this.count ++;
    }
}
const userStore = new userStoreClass();

export default userStore;
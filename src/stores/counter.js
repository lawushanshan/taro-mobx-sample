
import Taro from '@tarojs/taro';

import { observable, action } from 'mobx';

import valueApi from '../services/values';

class counterStore {
  @observable counter = 0;
  @observable apiValue = '暂无';

  @action
  increment () {
    this.counter++
  }

  @action
  decrement() {
    this.counter--
  }

  @action
  async incrementAsync(parames,callback) {
    setTimeout(() => {
      this.counter++
    }, 1000);
    //回调函数存在就调用
    callback&& callback()
  }

  @action
  async getValuesAsync(){
    try {
      const result =await valueApi.getValue();
      if (result) {
        this.apiValue = result;
      }
    } catch (error) {

    }

  }
}
const counter=new counterStore();
export default counter

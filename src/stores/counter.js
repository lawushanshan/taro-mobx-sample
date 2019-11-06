
import Taro from '@tarojs/taro';

import { observable, action } from 'mobx';

import valueApi from '../services/values';

class counterStore {
  @observable counter = 0;
  @observable apiValue = '暂无';
  // 必须有初始值，后面进来的数据才会渲染，也就是说不会动态加载dom节点
  @observable Items=[0];
  @observable objItems=[{index:1,name:'Frank'}];

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
      this.counter++;
      this.Items.push(Math.floor(Math.random()*100));
      this.objItems.push({
        index: Math.floor(Math.random()*100),
        name: '我是会员'+Math.floor(Math.random()*100),
      })
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

  @action
  async changeItem(){
    this.Items.push(Math.floor(Math.random()*100));
  }
}
const counter=new counterStore();
export default counter

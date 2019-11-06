import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtCountdown } from 'taro-ui'
import Tips from '../components/Tips'
import './index.scss'

@inject('counterStore')
@observer
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () {
    console.log('componentWillMount')
  }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () {
    console.log('componentDidMount')
  }

  componentWillUnmount () {
    console.log('componentWillUnmount')
  }

  componentDidShow () {
    console.log('componentDidShow')
  }

  componentDidHide () {
    console.log('componentDidHide')
  }

  increment = () => {
    const { counterStore } = this.props
    counterStore.increment()
  }

  decrement = () => {
    const { counterStore } = this.props
    counterStore.decrement()
  }

  incrementAsync = () => {
    const { counterStore } = this.props
    counterStore.incrementAsync('',()=>{})
  }


  GetValue=()=>{
    const { counterStore } =this.props
    counterStore.getValuesAsync()
    .then((data)=>{
      console.log('Success');
    })
  }

  render () {
    const { counterStore: { counter,apiValue, Items, objItems } } = this.props
    let arr=[1,2,3,4,5]
    let testTmp=<View>Hello World!</View>
    let countDowmTmp=arr.map((item,index)=>{
        return (
          <AtCountdown
            key={index}
            format={{ hours: ':', minutes: ':', seconds: '' }}
            seconds={item*10}
          />
        )
      })
    return (
      <View className='index'>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button>
        <Text>{counter}</Text>
        <Button type='primary' onClick={this.GetValue}>GetValue</Button>
        <Text>{apiValue}</Text>
        <View>
          {countDowmTmp}
          {testTmp}
        </View>
        <View>
          {Items&&Items.length>0&&(Items.slice().map((item)=>{
            return <Text style="color:'red'" key={item}>{item}</Text>
          }))}
        </View>

        <View>
          {objItems&&objItems.length>0&&(objItems.slice().map(item=>{
            return <Tips key={item.index} data={item}></Tips>
          }))}
        </View>
      </View>
    )
  }
}

export default Index

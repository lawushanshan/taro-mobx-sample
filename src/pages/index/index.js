import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

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
    const { counterStore: { counter,apiValue } } = this.props
    return (
      <View className='index'>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button>
        <Text>{counter}</Text>
        <Button type='primary' onClick={this.GetValue}>GetValue</Button>
        <Text>{apiValue}</Text>
      </View>
    )
  }
}

export default Index

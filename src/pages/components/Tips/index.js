import Taro, { Component } from "@tarojs/taro";
import { AtTag } from 'taro-ui';
import PropTypes from "prop-types";
import "./index.scss";

export default class CouponItem extends Component {
  static propTypes = {
    data: PropTypes.object
  };
  static defaultProps = {
    data:{
      index:0,
      name:'HelloWorld'
    }
  };
  render() {
    const { data } = this.props;
    return <AtTag type='primary' circle>{data.name}</AtTag>;
  }
}

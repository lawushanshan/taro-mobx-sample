import counterStore from "./counter";

//整合到一个stores对象中,方便根目录下的provider的引入
const stores={
  counterStore:counterStore
}

//默认导出接口
export default stores

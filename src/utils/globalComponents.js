//引入
import AppBar from '@/components/common/AppBar'

function plugins (Vue) {
  //注册
  Vue.component('AppBar', AppBar); //第一个参数:组件名称,第二个参数:要注册的组件
}
export default plugins;
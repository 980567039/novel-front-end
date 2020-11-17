import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible'
import store from './store'
import router from './router'
import 'normalize.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import Touch from '@/utils/touch' // eslint-disable-line
import '@/assets/common/common.scss'
//全局组件
import GL_Component from '@/utils/globalComponents'

Vue.use(GL_Component);
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

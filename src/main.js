import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import ygUi from './components'
import Print from 'vue-print-nb'

Vue.use(Print)
Vue.use(ygUi)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.directive('imgerror', {
  inserted(el, binding) {
    // el.onerror = (imgUrl) => {
    //   el.src = imgUrl
    // }
    el.onerror = function() {
      // el.src = 'http://destiny001.gitee.io/image/zxc.gif'
      el.src = binding.value
    }
    // console.log('img自定义指令')
  }
})
Vue.filter('formatDate',
  (numb, format) => {
    const time = new Date((numb - 1) * 24 * 3600000 + 1)
    time.setYear(time.getFullYear() - 70)
    const year = time.getFullYear() + ''
    const month = time.getMonth() + 1 + ''
    const date = time.getDate() - 1 + ''
    if (format && format.length === 1) {
      return year + format + month + format + date
    }
    return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
  })

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

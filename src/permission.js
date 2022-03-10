import router from '@/router'
import store from '@/store'

// 全局路由守卫 (访问全局所有路由，跳转之前触发的钩子)
// to:目标path
// from:从哪个地址来
// next:跳转，不调用则不跳转
router.beforeEach((to, from, next) => {
  const token = store.getters.token
  // console.log('--------@/permission.js--------7')
  // console.log('to', to)
  // console.log('from', from)
  // console.log('next', next)
  // console.log('--------@/permission.js--------11')
  const whiteList = ['/login', '/404']
  if (token) {
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})

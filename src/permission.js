import router from '@/router'
import store from '@/store'

// import { getTokenTime } from '@/utils/auth'
// const timeout = 7200000

// 全局路由守卫 (访问全局所有路由，跳转之前触发的钩子)
// to:目标path
// from:从哪个地址来
// next:跳转，不调用则不跳转
router.beforeEach(async(to, from, next) => {
  const token = store.getters.token
  const whiteList = ['/login', '/404']
  if (token) {
    // 检查token是否过期
    // if (Date.now() - getTokenTime() > timeout) {
    //   store.dispatch('user/logout')
    // }
    if (to.path === '/login') return next('/')
    if (!store.getters.userInfo.id) {
      await store.dispatch('user/getUserInfo')
    }
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
  // console.log('--------@/permission.js--------')
  // console.log('to', to)
  // console.log('from', from)
  // console.log('next', next)
  // console.log('--------@/permission.js--------')
})

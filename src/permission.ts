// 路由鉴权
import router from './router'
// @ts-ignore
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
import pinia from './store'
import userUserStore from './store/modules/user'
import setting from './setting'
let $store = userUserStore(pinia)
// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = setting.title + '-' + to.meta.title
  nprogress.start()
  let token = $store.token
  let username = $store.username
  if (token) {
    if (to.path == '/login') {
      next({ path: '/home' })
    } else {
      if (username) {
        next()
      } else {
        try {
          await $store.userInfo()
          next()
        } catch (error) {
          // token 过期
          // 用户修改了本地的localstorage
          await $store.userLogout()
          next({ path: '/login', query: { redirct: to.path } })
        }
      }
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

// 全局后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done()
})

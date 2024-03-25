import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './routes'
let router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoute,
  // @ts-ignore 滚动行为
  scrollBehavior(to, from, savePosition) {
    // 可用于记录页面滚动条位置
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router

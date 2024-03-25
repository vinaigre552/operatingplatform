// 对外暴露插件对象
// @ts-ignore
import SvgIcon from './SvgIcon/index.vue'
import Category from './Category/index.vue'
import type { App, Component } from 'vue'
// 全局注册图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const components: { [name: string]: Component } = { SvgIcon, Category }
export default {
  // install自动执行
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}

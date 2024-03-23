import { createApp } from 'vue'
// import './style.css'
// @ts-ignore
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import '@/styles/index.scss'
import router from './router';
import pinia from './store';
import './permission'
const app = createApp(App)
import gloablComponent from './components/index';
app.use(gloablComponent);
app.use(ElementPlus, {
    locale: zhCn
})
app.use(pinia)
app.use(router)
app.mount('#app')

// 关于layout组件配置仓库
import {defineStore} from 'pinia';

let useLayoutSettingStore = defineStore('Setting', {
    state: () => {
        return {
            fold: false, // 是否折叠
            refresh: false // 是否刷新
        }
    }
})
export default useLayoutSettingStore
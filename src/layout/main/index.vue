<template>
    <div>
        <router-view v-slot="{ Component}">
            <!-- 路由切换过渡动画 -->
            <transition name="fade">
                <component :is="Component" v-if="flag"></component>
            </transition>
        </router-view>
    </div>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from 'vue'
// @ts-ignore
import useLayoutSettingStore from '@/store/modules/setting.ts'
let LayoutSettingStore = useLayoutSettingStore()
// 标记是否销毁
let flag = ref(true)
// 监听refresh是否发生变化
watch(() => LayoutSettingStore.refresh, ()=> {
    // 点击刷新要销毁组件
    flag.value = false
    // 销毁完成后再重建
    nextTick(() => {
        flag.value = true
    })
})
</script>

<style scoped>
.fade-enter-form {
    opacity: 0;
    transform: scale(0);
}
.fade-enter-active {
    transition: all .3s;
}
.fade-enter-to {
    opacity: 1;
    transform: scale(1);
}
</style>
<template>
    <el-button circle icon="Refresh" size="small" @click="updataRefresh"></el-button>
    <el-button circle icon="FullScreen" size="small" @click="fullScreen"></el-button>
    <el-button circle icon="Setting" size="small"></el-button>
    <img :src="userStore.avatar" style="width:24px; height:24px;margin: 0 10px;border-radius: 50%;">
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
// @ts-ignore
import { useRouter, useRoute } from 'vue-router';
import useLayoutSettingStore from '@/store/modules/setting.ts'
import userUserStore from '@/store/modules/user'
let LayoutSettingStore = useLayoutSettingStore()
let userStore = userUserStore()
let $router = useRouter()
let $route = useRoute()
const updataRefresh = () => {
    // 刷新组件状态变化
    LayoutSettingStore.refresh = !LayoutSettingStore.refresh
}
const fullScreen = () => {
    // DOM对象 fullscreenElement属性全屏为true,非全屏为null
    // 不同浏览器有兼容情况
    let full = document.fullscreenElement
    if (!full) {
        // 进入全屏
        document.documentElement.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
}
const logout = () => {
    userStore.userLogout()
    $router.push({path:'/login', query:{redirect: $route.path}})
}
</script>
<script lang="ts">
export default {
    name: 'Setting'
}
</script>
<style scoped></style>
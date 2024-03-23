<template>
    <el-icon style="margin-right:10px;" @click="changeicon">
        <component :is="!LayoutSettingStore.fold? 'Fold': 'Expand'"></component>
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title" :to="{path:item.path}">
        <el-icon>
            <component :is="item.meta.icon"></component>
        </el-icon>
        <span style="margin: 0 5px;">{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
// @ts-ignore
import useLayoutSettingStore from '@/store/modules/setting.ts'
let LayoutSettingStore = useLayoutSettingStore()
const changeicon = () => {
    LayoutSettingStore.fold = !LayoutSettingStore.fold
}
const $route = useRoute()
</script>
<script lang="ts">
export default {
    name: 'Breadcrumb'
}
</script>
<style scoped></style>
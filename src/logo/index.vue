<!-- 封装logo组件，其中标题和logo路径在setting.ts配置 -->
<template>
    <div class="logo" v-if="setting.logoHidden">
        <img :src="setting.logo">
        <p>{{ setting.title }}</p>
    </div>
</template>

<script setup lang="ts">
// 引入设置标题和logo的配置文件
import setting from '@/setting'
</script>
<script lang="ts">
export default {
    name: 'Logo'
}
</script>
<style scoped lang="scss">
.logo {
    width: 100%;
    height: $base-menu-logo-height;
    display: flex;
    align-items: center;
    padding: 10px;
    img {
        height:40px;
        width: 40px;
    }
    p {
        font-size: $base-logo-title-fontSize;
        margin-left: 20px;
        color: white;
    }
}
</style>
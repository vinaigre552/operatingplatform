<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <Logo />
      <el-scrollbar class="scrollbar">
        <el-menu
          background-color="black"
          text-color="white"
          active-text-color="#6782d7"
          :default-active="$route.path"
          :collapse="LayoutSettingStore.fold"
        >
          <Menu :menulist="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div
      class="layout_tabber"
      :class="{ fold: LayoutSettingStore.fold ? true : false }"
    >
      <tabbar></tabbar>
    </div>
    <!-- 内容展示 -->
    <div
      class="layout_main"
      :class="{ fold: LayoutSettingStore.fold ? true : false }"
    >
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import Logo from '@/logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import tabbar from './tabbar/index.vue'
// 获取仓库
import userUserStore from '@/store/modules/user'
// @ts-ignore
import useLayoutSettingStore from '@/store/modules/setting.ts'
// 找到激活菜单的路径
let $route = useRoute()
let userStore = userUserStore()
let LayoutSettingStore = useLayoutSettingStore()
</script>
<script lang="ts">
export default {
  name: 'Layout',
}
</script>
<style scoped lang="scss">
.layout_container {
  height: 100vh;
  width: 100%;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    transition: all 0.3s;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
      }
    }
  }

  .layout_tabber {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabber-height;
    top: 0px;
    left: $base-menu-width;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabber-height);
    left: $base-menu-width;
    top: $base-tabber-height;
    padding: 20px;
    overflow: auto;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>

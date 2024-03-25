<template>
  <div>
    <template v-for="item in menulist" :key="item.path">
      <template v-if="!item.children">
        <el-menu-item
          v-if="!item.meta.hidden"
          :index="item.path"
          @click="goroute"
        >
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <template #title>
            <span>{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
      <template v-if="item.children && item.children.length == 1">
        <el-menu-item
          v-if="!item.children[0].meta.hidden"
          :index="item.children[0].path"
          @click="goroute"
        >
          <el-icon>
            <component :is="item.children[0].meta.icon"></component>
          </el-icon>
          <template #title>
            <span>{{ item.children[0].meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
      <template v-if="item.children && item.children.length > 1">
        <el-sub-menu :index="item.path" v-if="!item.meta.hidden">
          <template #title>
            <el-icon>
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </template>
          <!-- 递归 -->
          <Menu :menulist="item.children"></Menu>
        </el-sub-menu>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
let $router = useRouter()
// 获取父组件传递的路由数据
defineProps(['menulist'])
const goroute = (vc: any) => {
  $router.push(vc.index)
}
</script>
<script lang="ts">
// 递归需要名字 两个setup语言要相同 都用ts
export default {
  name: 'Menu',
}
</script>
<style>
/* 隐藏存在子菜单的菜单的文字和下拉箭头 */
.el-menu--collapse .el-sub-menu__title span {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}

.el-menu--collapse .el-sub-menu__title .el-sub-menu__icon-arrow {
  display: none;
}
</style>

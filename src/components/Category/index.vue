<template>
    <div>
        <el-card>
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="一级分类">
                    <el-select placeholder="请选择" v-model="categoryStore.c1Id" @change="handler" :disabled="sence == 0? false:true">
                        <el-option v-for="c1 in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级分类">
                    <el-select placeholder="请选择" v-model="categoryStore.c2Id" @change="handler1" :disabled="sence == 0? false:true">
                        <el-option v-for="c2 in categoryStore.c2Arr" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="三级分类">
                    <el-select placeholder="请选择" v-model="categoryStore.c3Id" :disabled="sence == 0? false:true">
                        <el-option v-for="c3 in categoryStore.c3Arr" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()
const getC1 = () => {
    categoryStore.getC1()
}
// 一级分类下拉菜单change
const handler = () => {
    categoryStore.c2Id = ''
    categoryStore.c3Arr = []
    categoryStore.c3Id = ''
    categoryStore.getC2()
}
// 二级分类下拉菜单change
const handler1 = () => {
    categoryStore.c3Id = ''
    categoryStore.getC3()
}
// 接收父组件传递的场景值
defineProps(['sence'])
onMounted(() => {
    getC1()
})
</script>

<style scoped>
.demo-form-inline {
    display: flex;
    justify-content: space-around;
}
.demo-form-inline .el-select {
  --el-select-width: 200px;
}
</style>
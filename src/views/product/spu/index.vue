<template>
    <div>
        <Category :sence="sence" />
        <el-card style="margin:10px 0">
            <div v-show="sence == 0">
                <el-button icon="Plus" type="primary" :disabled="categoryStore.c3Id ? false : true" @click="addSpu">添加SPU</el-button>
                <el-table style="margin: 10px 0;" :data="records" border>
                    <el-table-column label="序号" type="index" align="center" width="80px">
                    </el-table-column>
                    <el-table-column label="SPU名称" prop="spuName"></el-table-column>
                    <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作">
                        <template #>
                            <el-button icon="Plus" type="primary" size="small" title="添加SKU"></el-button>
                            <el-button icon="Edit" type="primary" size="small" title="修改SPU" @click="updateSpu"></el-button>
                            <el-button icon="View" type="primary" size="small" title="查看SKU"></el-button>
                            <el-button icon="Delete" type="primary" size="small" title="删除SPU"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" background
                    layout=" prev, pager, next, jumper,->,sizes, total" :total="total" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" />
            </div>
            <SpuForm v-show="sence == 1" @changeSence="changeSence"></SpuForm>
            <SkuForm v-show="sence == 2"></SkuForm>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import useCategoryStore from '@/store/modules/category'
import { reqHasSpu } from '@/api/product/spu'
import { HasSpuResponseData, Records } from '@/api/product/spu/type'
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
let sence = ref<number>(0) // 0显示已有SPU 1：添加SPU 2:添加SKU
let pageNo = ref<number>(1)
let limit = ref<number>(3)
let total = ref<number>(0)
let records = ref<Records>([])
let categoryStore = useCategoryStore()
watch(() => categoryStore.c3Id, () => {
    if (!categoryStore.c3Id) return
    getHasSpu()
})
// 获取SPU
const getHasSpu = async () => {
    let result: HasSpuResponseData = await reqHasSpu(pageNo.value, limit.value, categoryStore.c3Id)
    if (result.code === 200) {
        records.value = result.data.records
        total.value = result.data.total
    }
}
// 添加SPU
const addSpu = () => {
    sence.value = 1
}
// 修改SPU
const updateSpu = () => {
    sence.value = 1
}
// 子组件的回调
const changeSence = (num:number) => {
    sence.value = num
}
// 分页处理
const handleSizeChange = () => {
    pageNo.value = 1
    getHasSpu()
}
const handleCurrentChange = () => {
    getHasSpu()
}
onBeforeUnmount(() => {
    categoryStore.$reset()
})
</script>

<style scoped></style>
<template>
    <div>
        <Category :sence="sence" />
        <el-card style="margin: 10px 0;">
            <div v-if="sence == 0">
                <el-button icon="Plus" type="primary" style="display: flex;" :disabled="!categoryStore.c3Id"
                    @click="addAttr">添加平台属性</el-button>
                <el-table border style="margin: 10px 0px;" :data="attrArr">
                    <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                    <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
                    <el-table-column label="属性值名称">
                        <template #="{ row }">
                            <el-tag v-for="item in row.attrValueList" :key='item.id'>{{ item.valueName }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120px">
                        <template #="{ row }">
                            <el-button icon="Edit" size="small" type="primary" @click="updateAttr(row)"></el-button>
                            <el-popconfirm :title="`确定删除${row.attrName}吗？`" @confirm="deleteAttr(row.id)">
                                <template #reference>
                                    <el-button icon="Delete" size="small" type="primary"></el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-if="sence == 1">
                <el-form :inline="true">
                    <el-form-item label="属性名称">
                        <el-input placeholder="请输入属性名称" v-model="attrParams.attrName"></el-input>
                    </el-form-item>
                </el-form>
                <el-button icon="Plus" type="primary" :disabled="!attrParams.attrName"
                    @click="addAttrValue">添加属性值</el-button>
                <el-button type="primary" @click="sence = 0">取消</el-button>
                <el-table border style="margin: 10px 0;" :data="attrParams.attrValueList">
                    <el-table-column width="80px" label="序号" type="index"></el-table-column>
                    <el-table-column label="属性值名称">
                        <template #="{ row, $index }">
                            <el-input :ref="(vc: any) => inputArr[$index] = vc" size="small" v-if="row.flag"
                                @blur='toLook(row, $index)' placeholder="请输入属性值名称" v-model="row.valueName"></el-input>
                            <div v-else @click="toEdit(row, $index)"><span>{{ row.valueName }}</span></div>
                        </template>
                    </el-table-column>
                    <el-table-column label="属性值操作">
                        <template #="{ $index }">
                            <el-button icon="Delete" size="small" type="primary"
                                @click="attrParams.attrValueList.splice($index, 1)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" @click="save"
                    :disabled="attrParams.attrValueList.length > 0 ? false : true">保存</el-button>
                <el-button type="primary" @click="sence = 0">取消</el-button>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue'
import { reqAttr, reqAddOrUpfateAttr, reqRemoveAttr } from '@/api/product/attr'
import useCategoryStore from '@/store/modules/category';
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus';
let categoryStore = useCategoryStore()
let attrArr = ref<Attr[]>([])
let sence = ref<number>(0) //如果scence为0则显示table,为1显示修改
let inputArr = ref<any>([]) //input焦点获取
// 收集属性duixiang
let attrParams = reactive<Attr>({
    attrName: '',
    attrValueList: [],
    categoryId: '',
    categoryLevel: 3
})
watch(() => categoryStore.c3Id, () => {
    // 清空上次查询的属性和属性值
    attrArr.value = []
    // 防止c3id为空时发请
    if (!categoryStore.c3Id) return
    getAttr()
})
// 获取已有的属性
const getAttr = async () => {
    // 获取分类ID
    const { c1Id, c2Id, c3Id } = categoryStore
    let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
    if (result.code == 200) {
        attrArr.value = result.data
    }
}
// 添加属性
const addAttr = () => {
    // 清空数据
    Object.assign(attrParams, {
        attrName: '',
        attrValueList: [],
        categoryId: categoryStore.c3Id,
        categoryLevel: 3
    })
    sence.value = 1
}
// 更新属性
const updateAttr = (row: Attr) => {
    Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
    sence.value = 1
}
// 添加属性值按钮操作
const addAttrValue = () => {
    attrParams.attrValueList.push({
        valueName: '',
        flag: true //控制input和div的切换
    })
    nextTick(() => {
        inputArr.value[attrParams.attrValueList.length - 1].focus()
    })

}
const save = async () => {
    // @ts-ignore
    let result: any = await reqAddOrUpfateAttr(attrParams)
    if (result.code == 200) {
        sence.value = 0
        ElMessage.success(attrParams.id ? '修改成功' : '添加成功')
        getAttr()
    } else {
        ElMessage.error(attrParams.id ? '修改失败' : '添加失败')
    }
}
// 表单元素失去焦点
const toLook = (row: AttrValue, $index: number) => {
    // 非法清空判断
    if (row.valueName.trim() == '') {
        attrParams.attrValueList.splice($index, 1)
        ElMessage.error('属性值不能为空')
        return
    }
    // 判断是否重复
    let repeat = attrParams.attrValueList.find((item) => {
        if (item != row) {
            return item.valueName === row.valueName
        }
    })
    if (repeat) {
        attrParams.attrValueList.splice($index, 1)
        ElMessage.error('属性值不能重复')
        return
    }
    row.flag = false

}
// div点击事件
const toEdit = (row: AttrValue, $index: number) => {
    row.flag = true
    nextTick(() => {
        inputArr.value[$index].focus()
    })
}
// 删除操作
const deleteAttr = async (attrId: number) => {
    let result = await reqRemoveAttr(attrId)
    if (result.code == 200) {
        ElMessage.success('删除成功')
        getAttr()
    } else {
        ElMessage.error('删除失败')
    }
}
// 销毁清空仓库对象
onBeforeUnmount(() => {
    categoryStore.$reset()
})
</script>

<style scoped></style>
<template>
    <div>
        <el-card>
            <el-button type="primary" icon="Plus" style="display: flex;" @click="addTrademark">添加品牌</el-button>
            <el-table border style="margin: 10px 0px" :data="trademarkArr">
                <el-table-column label="序号" width="80px" align="center" type="index">
                </el-table-column>
                <el-table-column label="品牌名称" prop="tmName">
                </el-table-column>
                <el-table-column label="品牌LOGO">
                    <template v-slot="scope">
                        <img :src="scope.row.logoUrl" style="width: 100px; height: 100px;">
                    </template>
                </el-table-column>
                <el-table-column label="品牌操作">
                    <template #="{ row }">
                        <el-button icon="Edit" @click="updateTrademark(row)" type="primary" size="small"></el-button>
                        <el-popconfirm :title="`你确定删除${row.tmName}?`" width="250px" icon="Delete" @confirm="removeTrademark(row.id)">
                            <template #reference>
                                <el-button icon="Delete" type="primary" size="small"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" background
                layout=" prev, pager, next, jumper,->,sizes, total" :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />

        </el-card>
        <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'" width="500">
            <el-form :model="trademarkParams" style="width: 80%;" :rules="rules" ref="formRef">
                <el-form-item label="品牌名称" label-width="100px" prop="tmName">
                    <el-input v-model="trademarkParams.tmName" autocomplete="off" placeholder="请输入品牌名称" />
                </el-form-item>
                <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
                    <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :show-file-list="false">
                        <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="confirm">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import { reqHasTrademark, reqAddOrUpdateTrademark, reqDeleteTrademark } from '@/api/product/trademark'
import type { TradeMarkResponseData, Records, TradeMark } from '@/api/product/trademark/type'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
let pageNo = ref<number>(1)
let limit = ref<number>(3)
let total = ref<number>(1)
// @ts-ignore
let trademarkArr = ref<Records>([])
let dialogFormVisible = ref<boolean>(false)
// 获取form
let formRef = ref()
let trademarkParams = reactive<TradeMark>({
    tmName: '',
    logoUrl: ''
})
// 表单规则
const validatorTmName = (_rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 2) {
        callBack()
    } else {
        callBack(new Error('品牌名称大于等于两位'))
    }
}
const validatorLogoUrl = (_rule: any, value: any, callBack: any) => {
    if (value) {
        callBack()
    } else {
        callBack(new Error('务必上传LOGO图片'))
    }
}
const rules = {
    tmName: [{ required: true, trigger: 'blur', validator: validatorTmName }],
    logoUrl: [{ required: true, trigger: 'change', validator: validatorLogoUrl }]
}
// 获取信息
const getHasTrademark = async () => {
    let result: TradeMarkResponseData = await reqHasTrademark(pageNo.value, limit.value)
    if (result.code == 200) {
        total.value = result.data.total
        trademarkArr.value = result.data.records
    }
}
// 添加品牌
const addTrademark = () => {
    trademarkParams.id = 0
    trademarkParams.tmName = ''
    trademarkParams.logoUrl = ''
    dialogFormVisible.value = true
    // 添加之前去掉表单验证 两种方法 因为点击之前还没有对话框里的form，所以要用问号或者nextTick
    // formRef?.value.clearValidate('tmName')
    // formRef?.value.clearValidate('logoUrl')
    nextTick(() => {
        formRef.value.clearValidate('tmName')
        formRef.value.clearValidate('logoUrl')
    })

}
// 更新品牌
const updateTrademark = (row: TradeMark) => {
    nextTick(() => {
        formRef.value.clearValidate('tmName')
        formRef.value.clearValidate('logoUrl')
    })
    dialogFormVisible.value = true
    trademarkParams.id = row.id
    trademarkParams.logoUrl = row.logoUrl
    trademarkParams.tmName = row.tmName
}
// 上传之前
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type == 'image/jpeg' || rawFile.type == 'image/png' || rawFile.type == 'image/gif') {
        if (rawFile.size / 1024 / 1024 > 4) {
            ElMessage.error('上传文件的大小需小于4MB')
            return false
        } else {
            return true
        }
    } else {
        ElMessage.error('上传文件格式必须为png|jpg|gif')
        return false
    }
}
// 上传成功之后返回 response是服务器返回的数据
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    _response,
    uploadFile
) => {
    trademarkParams.logoUrl = URL.createObjectURL(uploadFile.raw!)
    // 图片上传成功，清除图片校验结果
    formRef.value.clearValidate('logoUrl')
}
const confirm = async () => {
    // 如果失败后面的语句不会执行
    await formRef.value.validate()
    let result = await reqAddOrUpdateTrademark(trademarkParams)
    let isadd = trademarkParams.id ? '修改' : '添加'
    if (result.code == 200) {
        dialogFormVisible.value = false
        ElMessage.success(isadd + '品牌成功')
        pageNo.value = 1
        getHasTrademark()
    } else {
        dialogFormVisible.value = false
        ElMessage.error(isadd + '品牌失败')
    }
}
const removeTrademark = async (id:number) => {
   let result = await reqDeleteTrademark(id)
   if (result.code === 200) {
    ElMessage.success('删除品牌成功')
    if (trademarkArr.value.length < 1) {
        pageNo.value --
    }
    getHasTrademark()
   } else {
    ElMessage.error('删除品牌失败')
   }
}
// 处理分页，利用v-model修改了页码和页大小
const handleSizeChange = () => {
    // 为了避免页数混乱，页码设为1
    pageNo.value = 1
    getHasTrademark()
}
const handleCurrentChange = () => {
    getHasTrademark()
}
onMounted(() => {
    getHasTrademark()
})
</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
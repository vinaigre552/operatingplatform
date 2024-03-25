<template>
  <div>
    <el-form style="width: 60%" label-width="100px">
      <el-form-item label="spu名称">
        <el-input placeholder="请输入spu名称"></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select placeholder="请选择SPU品牌" style="width: 40%"></el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input placeholder="请输入SPU描述" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="SPU照片">
        <el-upload list-type="picture-card">
          <el-icon><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <el-select style="width: 40%" placeholder="请选择"></el-select>
        <el-button icon="Plus" type="primary" style="margin-left: 10px">
          添加属性值
        </el-button>
        <el-table border style="margin: 10px 0">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column label="销售属性名字" width="120px"></el-table-column>
          <el-table-column label="销售属性值"></el-table-column>
          <el-table-column label="操作" width="120px"></el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">确定</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
let $emit = defineEmits(['changeSence'])
// 和父组件通信
const cancel = () => {
  $emit('changeSence', 0)
}
</script>

<style scoped></style>

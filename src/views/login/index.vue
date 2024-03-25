<template>
  <div class="login_container">
    <el-row>
      <!-- 屏幕宽度小于768时省去左侧，只留右侧 -->
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>欢迎来到运营平台</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              show-password
              v-model="loginForm.password"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'
let userStore = useUserStore()
let $router = useRouter()
let $route = useRoute()
let loginForm = reactive({ username: 'admin', password: '111111' })
const loginForms = ref()
// 自定义校验规则
const validateUsername = (_rule: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少5位'))
  }
}
const validatePassword = (_rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少6位'))
  }
}
const rules = {
  username: [
    { trigger: 'change', validator: validateUsername },
    // {required: true, min: 5,max: 10, message: '账号长度为6~10位', trigger: 'change'}
  ],
  password: [
    { trigger: 'change', validator: validatePassword },
    // {required: true, min: 6, max: 15, message: '密码长度在6~15位', trigger: 'change'}
  ],
}

let loading = ref(false)
const login = async () => {
  // 校验通过之后才执行登录
  await loginForms.value.validate()
  loading.value = true
  try {
    await userStore.userlogin(loginForm)
    let repath: any = $route.query.redirect
    $router.push({ path: repath || '/' })
    ElNotification({
      type: 'success',
      title: 'Hi,' + getTime() + '好',
      message: '欢迎回来',
    })
    loading.value = false
  } catch (error) {
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/back.jpg') no-repeat;
  background-size: cover;
  position: absolute;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    text-align: left;
    background-color: rgba($color: #314c7e, $alpha: 0.6);
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>

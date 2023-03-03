<template>
  <div>
    <el-container>
        <el-header>登录</el-header>
        <el-main>
            <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input type="username" v-model="ruleForm.username" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
                    <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
  </div>
</template>


<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import type { FormInstance } from 'element-plus'
  import axios from 'axios'
  import router from '../router'
  import store from '../store'

  const ruleFormRef = ref<FormInstance>()

  const validateUsername = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请输入用户名'))
    } else {
      if (ruleForm.password !== '') {
        if (!ruleFormRef.value) return
        ruleFormRef.value.validateField('checkPass', () => null)
      }
      callback()
    }
  }
  const validatePassword = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('Please input the password again'))
    } else {
      callback()
    }
  }

  const ruleForm = reactive({
    username: '',
    password: '',
  })

  const rules = reactive({
    username: [{ validator: validateUsername, trigger: 'blur' }],
    Password: [{ validator: validatePassword, trigger: 'blur' }],
  })

  const submitForm = (formEl: FormInstance | undefined) => {
    // const _this = getCurrentInstance()
    // const { proxy }: any = getCurrentInstance()在ts中无法使用
    if (!formEl) return
    formEl.validate((valid) => {
      if (valid) {
        // const { proxy }= getCurrentInstance()
        // 提交逻辑
        // console.log(proxy.ruleForm)
        axios.post('http://localhost:8081/login', ruleForm).then((res:any)=>{
            const token = res.headers['authorization']
            store.commit('SET_TOKEN', token)
            store.commit('SET_USERINFO', res.data.data)
            router.push("/blogs")
          })
        console.log('submit!')
      } else {
        console.log('error submit!')
        return false
      }
    })
  }

  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
</script>

<style>
  .demo-ruleForm {
    max-width: 500px;
    margin: 0 auto;
  }
</style>
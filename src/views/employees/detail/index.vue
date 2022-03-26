<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">

            <!-- 放置表单 -->
            <el-form ref="form" :model="userInfo" rule="userInfoRules" label-width="120px" style="margin-left: 120px; margin-top:30px">
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="userInfo.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:" prop="password">
                <el-input v-model="userInfo.password" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="putUserInfo">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <user-info />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <job-info />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getStaffBassByIdAPI, putStaffInfoAPI } from '@/api/staff'
import UserInfo from '../components/user-info.vue'
import JobInfo from '../components/job-info.vue'
export default {
  name: 'Detail',
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      userInfo: {
        username: '',
        password: ''
      },
      userInfoRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码不能小于六位', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getStaffBaseById()
  },
  methods: {
    async getStaffBaseById() {
      const res = await getStaffBassByIdAPI(this.$route.params.id)
      this.userInfo = res
      // console.log(res)
    },
    async putUserInfo() {
      try {
        await this.$refs.form.validate()
        await putStaffInfoAPI(this.userInfo)
        this.$message.success('更新成功')
      } catch (error) {
        console.dir(error)
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>

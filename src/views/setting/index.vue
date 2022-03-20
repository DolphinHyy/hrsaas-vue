<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理" name="first">
            <el-button type="primary" @click="dialogVisible=true">新增角色</el-button>
            <!-- 角色列表 -->
            <el-table
              :data="roleList"
              style="width: 100%;marginTop:15px"
              border
            >
              <el-table-column
                type="index"
                label="序号"
                width="100"
                align="center"
              />
              <el-table-column
                prop="name"
                label="角色"
                width="180"
                align="center"
              />
              <el-table-column
                prop="description"
                label="描述"
                align="center"
              />
              <el-table-column
                label="操作"
                width="280"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button type="success">分配权限</el-button>
                  <el-button type="primary" icon="el-icon-edit" @click="showDialog(scope.row)" />
                  <el-button type="danger" icon="el-icon-delete" @click="onRemove(scope.row.id)" />
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
              layout="prev, pager, next"
              :total="total"
              :page-size="pageParams.pagesize"
              @current-change="onPageChange"
            />
          </el-tab-pane>
          <el-tab-pane label="公司信息" name="second">
            <el-alert
              show-icon
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              :closable="false"
            />
            <el-form ref="form" style="width:600px;margin:70px 50px" :model="company" label-width="80px">
              <el-form-item label="公司名称">
                <el-input v-model="company.name" disabled />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="company.companyAddress" disabled />
              </el-form-item>
              <el-form-item label="公司邮箱">
                <el-input v-model="company.mailbox" disabled />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="company.remarks" disabled />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!-- 弹层 -->
      <el-dialog
        :title="titleText"
        :visible.sync="dialogVisible"
        width="30%"
        @close="onClose"
      >
        <el-form ref="form" :model="currentUser" label-width="80px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="currentUser.name" />
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="currentUser.description" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="onSave">确 定</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import { getRolesListAPI, removeRolesAPI, updateRoleAPI, addRoleAPI } from '@/api/role'
import { getCompanyInfoByIdAPI } from '@/api/company'
export default {
  name: 'Roles',
  data() {
    return {
      activeName: 'first',
      roleList: [],
      pageParams: { page: 1, pagesize: 5 },
      total: 0,
      form: {
        name: '',
        addr: '',
        email: '',
        remark: ''
      },
      company: {},
      dialogVisible: false,
      currentUser: {
        name: '',
        description: ''
      },
      currentRole: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      }
    }
  },
  computed: {
    titleText() {
      return this.currentUser.id ? '编辑角色' : '新增角色'
    }
  },

  created() {
    this.getRolesList()
    this.getCompanyInfo()
  },

  methods: {
    async getRolesList() {
      // console.log('获取角色列表')
      const res = await getRolesListAPI(this.pageParams)
      // console.log(res.rows)
      this.roleList = res.rows
      this.total = res.total
    },
    onPageChange(val) {
      this.pageParams.page = val
      this.getRolesList()
    },
    async getCompanyInfo() {
      this.company = await getCompanyInfoByIdAPI(this.$store.getters.userInfo.companyId)
    },
    async onRemove(id) {
      // console.log(id)
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await removeRolesAPI(id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getRolesList()
      } catch (error) {
        console.dir(error)
      }
    },
    showDialog(row) {
      this.dialogVisible = true
      this.currentUser = { ...row }
      // console.log(this.currentUser)
    },
    async onSave() {
      try {
        await this.$refs.form.validate()
        // console.log('表单验证成功')
        if (this.currentUser.id) {
          await updateRoleAPI(this.currentUser)
        } else {
          console.log(1)
          await addRoleAPI(this.currentUser)
        }
        this.$message.success('成功')
        this.getRolesList()
      } catch (error) {
        console.dir(error)
      }
      this.dialogVisible = false
    },
    onClose() {
      this.$refs.form.resetFields()
      this.currentUser = {
        name: '',
        description: ''
      }
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped lang='less'>

</style>

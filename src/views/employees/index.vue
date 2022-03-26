<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :is-show-i="true">
        <template #before>
          <span>共188条数据</span>
        </template>
        <template #after>
          <el-button type="primary" @click="onExportExcel">普通excel导出</el-button>
          <el-button type="success" @click="onComplexExcel">复杂表头excel导出</el-button>
          <el-button type="info" @click="$router.push('/import-router')">导入Excel</el-button>
          <el-button type="warning" @click="addDShow=true">新增员工</el-button>
        </template>
      </PageTools>
      <!-- 员工列表 -->
      <el-card>
        <el-table
          :data="employeesList"
          style="width: 100%"
          border
        >
          <el-table-column
            label="序号"
            width="50px"
            type="index"
          />
          <el-table-column
            label="姓名"
            sortable
            prop="username"
            width="width"
          />
          <el-table-column
            label="头像"
            prop="staffPhoto"
            width="width"
          >
            <template slot-scope="scope">
              <img v-imgerror="require('@/assets/common/head.jpg')" :src="scope.row.staffPhoto" style="width:100px;height:100px" @click="genQrCode(scope.row.staffPhoto)">
            </template>
          </el-table-column>
          <el-table-column
            label="手机号"
            prop="mobile"
            sortable
            width="width"
          />
          <el-table-column
            label="工号"
            sortable
            prop="workNumber"
            width="width"
          />
          <el-table-column
            label="聘用形式"
            sortable
            prop="formOfEmployment"
            width="width"
          />
          <el-table-column
            label="部门"
            sortable
            prop="departmentName"
            width="width"
          />
          <el-table-column
            label="入职时间"
            sortable
            prop="timeOfEntry"
            width="width"
          />
          <el-table-column
            label="状态"
            sortable
            width="width"
          />
          <el-table-column
            label="操作"
            sortable
            width="width"
          >
            <template slot-scope="{row}">
              <el-button type="text" @click="$router.push('/employees/detail/'+row.id)">查看</el-button>
              <el-button type="text">转正</el-button>
              <el-button type="text">调岗</el-button>
              <el-button type="text">离职</el-button>
              <el-button type="text">角色</el-button>
              <el-button type="text" @click="removeStaff(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="employeesParams.page"
          @current-change="onPageChange"
        />
      </el-card>
    </div>
    <!-- 弹层 -->
    <add-staff :add-d-show.sync="addDShow" />
    <el-dialog title="扫一扫" :visible.sync="showGenDialog" width="30%" @close="genCodeClose">
      <canvas id="canvas" />
    </el-dialog>
  </div>
</template>

<script>
import { getStaffsListAPI, removeStaffAPI } from '@/api/staff'
import addStaff from './components/add-staff.vue'
import QrCode from 'qrcode'
export default {
  components: { addStaff },
  data() {
    return {
      employeesList: [],
      employeesParams: {
        page: 1,
        size: 10
      },
      total: 0,
      addDShow: false,
      headers: {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      },
      showGenDialog: false
    }
  },

  created() {
    this.getEmployeesList()
  },

  methods: {
    async getEmployeesList() {
      // console.log('获取员工列表')
      const res = await getStaffsListAPI(this.employeesParams)
      this.employeesList = res.rows
      this.total = res.total
      // console.log(res)
      // console.log(this.employeesList)
    },
    onPageChange(val) {
      this.employeesParams.page = val
      this.getEmployeesList()
    },
    async removeStaff(id) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning' })
        await removeStaffAPI(id)
        this.getEmployeesList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      } catch (error) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    async onExportExcel() {
      const { rows } = await getStaffsListAPI({ page: 1, size: this.total })
      console.log(rows)
      const data = this.formatDataToExcel(rows, this.headers)
      // console.log(data)
      // const header = ['姓名', '手机号', '入职日期', '聘用日期', '转正日期', '工号', '部门']
      const excel = await import('@/vendor/Export2Excel')
      excel.export_json_to_excel({
        // header: ['姓名', '邮箱'],
        header: Object.keys(this.headers),
        data,
        filename: '员工列表',
        autoWidth: true,
        bookType: 'xlsx'
      })
    },
    async onComplexExcel() {
      const { rows } = await getStaffsListAPI({ page: 1, size: this.total })
      console.log(rows)
      const data = this.formatDataToExcel(rows, this.headers)
      // console.log(data)
      // const header = ['姓名', '手机号', '入职日期', '聘用日期', '转正日期', '工号', '部门']
      const excel = await import('@/vendor/Export2Excel')
      excel.export_json_to_excel({
        // header: ['姓名', '邮箱'],
        header: Object.keys(this.headers),
        multiHeader: [['姓名', '主要信息', '', '', '', '部门']],
        merges: ['A1:A2', 'B1:F1', 'G1:G2'],
        data,
        filename: '复杂表头员工列表',
        autoWidth: true,
        bookType: 'xlsx'
      })
    },
    formatDataToExcel(employees, headers) {
      // console.log(employees)
      const arr = employees.map(item => {
        return Object.keys(headers).map(headerKey => item[headers[headerKey]])
      })
      return arr
    },
    genQrCode(url) {
      this.showGenDialog = true
      if (url) {
        this.$nextTick(() => {
          const canvas = document.getElementById('canvas')
          QrCode.toCanvas(canvas, url)
        })
      } else {
        this.$message.fail('该员工未设置头像')
      }
    },
    genCodeClose() {
      this.showGenDialog = false
    }
  }
}
</script>

<style scoped lang='scss'>
.el-dialog__body{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <div>
    <el-dialog
      title="新增员工"
      :visible="addDShow"
      width="50%"
      @close="onClose"
    >
      <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="入职时间" prop="timeOfEntry">
          <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择日期" />
        </el-form-item>
        <el-form-item label="聘用形式" prop="formOfEmployment">
          <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择">
            <el-option
              v-for="item in hireType"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="workNumber">
          <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
        </el-form-item>
        <el-form-item label="部门" prop="departmentName">
          <el-input v-model="formData.departmentName" style="width:50%" placeholder="请选择部门" @focus="selectTree" />
          <el-tree
            v-show="departmentTreeShow"
            v-loading="treeLoading"
            :data="depts"
            :props="defaultProps"
            default-expand-all
            @node-click="treeNodeClick"
          />
        </el-form-item>
        <el-form-item label="转正时间" prop="correctionTime">
          <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择日期" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:addDShow',false)">取 消</el-button>
        <el-button type="primary" @click="addStaff">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import employees from '@/utils/constant/employees'
import { getDepartmentsAPI } from '@/api/department'
import getDepartments from '@/utils/get-departments'
import { addStaffAPI } from '@/api/staff'
const { hireType } = employees
export default {
  components: {

  },
  props: {
    addDShow: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      hireType,
      rules: {
        username: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }, {
          min: 1, max: 4, message: '用户姓名为1-4位'
        }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, {
          pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
        }],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
      depts: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      departmentTreeShow: false,
      treeLoading: false
    }
  },
  created() {

  },
  methods: {
    onClose() {
      this.$emit('update:addDShow', false)
      this.$refs.form.resetFields()
    },
    async selectTree() {
      this.treeLoading = true
      this.departmentTreeShow = true
      const res = await getDepartmentsAPI()
      this.depts = getDepartments(res.depts)
      this.treeLoading = false
      // console.log(this.depts)
    },
    treeNodeClick(data) {
      // console.log(1)
      this.formData.departmentName = data.name
      this.departmentTreeShow = false
    },
    async addStaff() {
      try {
        this.$refs.form.validate()
        console.log(1)
        await addStaffAPI(this.formData)
        this.$message.success('新增员工成功')
      } catch (error) {
        console.dir(error)
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>

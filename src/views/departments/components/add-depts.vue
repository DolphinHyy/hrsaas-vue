<template>
  <el-dialog
    :title="titleText"
    :visible="dialogShow"
    width="30%"
    @close="onClose"
  >
    <el-form ref="form" :model="addForm" :rules="addFormRules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="addForm.name" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="addForm.code" placeholder="1-50个字符" />
      </el-form-item>
      <!-- <el-form-item label="部门负责人" prop="manager">
        <el-input v-model="addForm.manager" placeholder="2-10个字符" />
      </el-form-item> -->
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="addForm.manager" style="width:100%" placeholder="请选择部门负责人" @focus="getStaffs">
          <el-option v-for="item in staffs" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>

      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="addForm.introduce" placeholder="2-150个字符" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <!-- <el-button @click.native="$alert(1)">取 消</el-button> -->
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getDepartmentsAPI, addDepartmentsAPI, getDeptsDetailAPI, updateDeptsAPI } from '@/api/department'
import { getSimpleStaffsAPI } from '@/api/staff'
export default {
  components: {

  },
  props: {
    dialogShow: {
      type: Boolean,
      required: true
    },
    currentNode: {
      required: true,
      type: Object
    }
  },
  data() {
    const checkDeptNameRepeat = async(rule, value, callback) => {
      // console.log('校验部门名称')
      let isRepeat = false

      if (this.addForm.id) {
        const { depts } = await getDepartmentsAPI()
        const arr = depts.filter(item => item.pid === this.addForm.pid && item.id !== this.addForm.id)
        console.log(arr)
        isRepeat = arr.some(item => item.name === value)
      } else {
        if (!this.currentNode.children) {
          return callback()
        }
        isRepeat = this.currentNode.children.some(item => {
          // console.log(item.name)
          return item.name === value
        })
      }
      if (isRepeat) {
        return callback(new Error('部门已存在'))
      }
      return callback()
    }
    const checkDeptCodeRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartmentsAPI()
      let isRepeat = false
      // console.log(this.currentNode.code === value)
      if (this.currentNode.id) {
        isRepeat = depts.filter(item => item.id !== this.currentNode.id).some(item => item.code === value)
      } else {
        isRepeat = depts.some(item => item.code === value)
      }
      if (isRepeat) {
        return callback(new Error('部门编码已存在'))
      }
      return callback()
    }
    return {
      addForm: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      addFormRules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在2到50个字符之间', trigger: 'blur' },
          { validator: checkDeptNameRepeat, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在2到50个字符之间', trigger: 'blur' },
          { validator: checkDeptCodeRepeat, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '请输入部门负责人', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在2到50个字符之间', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '请输入部门介绍', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在2到100个字符之间', trigger: 'blur' }
        ]
      },
      staffs: []
    }
  },
  computed: {
    titleText() {
      return this.addForm.id ? '编辑部门' : '添加子部门'
    }
  },
  created() {
    this.getStaffs()
  },
  methods: {
    async getStaffs() {
      const res = await getSimpleStaffsAPI()
      // console.log(res)
      this.staffs = res
    },
    async onSave() {
      // console.log('点击确认')
      // 方法1
      // this.$refs.form.validate(flag => {
      //   if (flag) {
      //     console.log('表单校验通过')
      //   }
      // })

      // 方法2
      try {
        await this.$refs.form.validate()
        if (this.addForm.id) {
          console.log('编辑保存')
          console.log(this.addForm)
          await updateDeptsAPI(this.addForm)
          this.$message.success('更新部门成功')
        } else {
          const params = {
            ...this.addForm,
            pid: this.currentNode.id
          }
          await addDepartmentsAPI(params)
          this.$message.success('新增部门成功')
        }
        this.onClose()
        this.$emit('addDeptSuccess')
      } catch (e) {
        console.log(e)
      }

      // 方法2
      // await this.$refs.form.validate().then(async() => {
      //   // console.log('校验通过')
      //   const params = {
      //     ...this.addForm,
      //     pid: this.currentNode.id
      //   }
      //   console.log(params)
      //   await addDepartmentsAPI(params)
      //   this.onClose()
      //   this.$message.success('新增部门成功')
      //   this.$emit('addDeptSuccess')
      // }).catch(e => console.log(e))
    },
    onClose() {
      this.$emit('update:dialogShow', false)
      // 重置校验信息 和需要校验的表单内容
      this.$refs.form.resetFields()
      // 重置表单内容
      this.addForm = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
    },
    async getDeptsDetail(id) {
      const res = await getDeptsDetailAPI(id)
      this.addForm = res
    }
  }
}
</script>

<style scoped lang="scss">

</style>

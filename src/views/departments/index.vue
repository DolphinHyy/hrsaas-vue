<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 头部栏 -->
      <el-card v-loading="isLoading" class="box-card">
        <TreeTools :tree-node="{name:'传智教育',manager:'管理员',id:''}" :is-root="false" @onShowAdd="onShowAdd" @showEdit="showEdit" />
        <!-- 具体部门 -->
        <el-tree default-expand-all :data="treeData" :props="defaultProps" @node-click="handleNodeClick">
          <template slot-scope="{data}">
            <TreeTools :tree-node="data" @onShowAdd="onShowAdd" @removeSuccess="getDepartmentData" @showEdit="showEdit" />
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 弹出层 -->
    <AddDepts ref="addDialog" :dialog-show.sync="dialogShow" :current-node="currentNode" @addDeptSuccess="getDepartmentData" />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import AddDepts from '@/views/departments/components/add-depts'
import getDepartments from '@/utils/get-departments'
import { getDepartmentsAPI } from '@/api/department'
export default {
  components: { TreeTools, AddDepts },
  data() {
    // const treeData = [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
    //   { name: '行政部', manager: '刘备' },
    //   { name: '人事部', manager: '孙权' }]
    return {
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dialogShow: false,
      editDialogShow: false,
      currentNode: {}
    }
  },

  created() {
    this.getDepartmentData()
  },

  methods: {
    handleNodeClick(data) {
      // console.log(data)
    },
    async getDepartmentData() {
      this.isLoading = true
      const res = await getDepartmentsAPI()
      this.treeData = getDepartments(res.depts)
      this.isLoading = false
    },
    onShowAdd(val) {
      this.dialogShow = true
      // console.log(val)
      this.currentNode = val
    },
    showEdit(val) {
      this.dialogShow = true
      // console.log(val)
      this.currentNode = val
      this.$refs.addDialog.getDeptsDetail(val.id)
    }
  }
}
</script>

<style scoped lang='scss'>
.el-row{
  width: 100%;
}
</style>

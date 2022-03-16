<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 头部栏 -->
      <el-card class="box-card">
        <TreeTools :tree-node="{name:'传智教育',manager:'管理员'}" @onShowAdd="dialogShow=true" />
        <!-- 具体部门 -->
        <el-tree default-expand-all :data="treeData" :props="defaultProps" @node-click="handleNodeClick">
          <template slot-scope="{data}">
            <TreeTools :tree-node="{name:data.name,manager:data.manager}" @onShowAdd="dialogShow=true" />
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 弹出层 -->
    <addDepts :dialog-show.sync="dialogShow" />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import addDepts from '@/views/departments/components/add-depts'
import getDepartments from '@/utils/get-departments'
import { getDepartmentsAPI } from '@/api/department'
export default {
  components: { TreeTools, addDepts },
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
      dialogShow: false
    }
  },

  created() {
    this.getDepartmentData()
  },

  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    async getDepartmentData() {
      const res = await getDepartmentsAPI()
      this.treeData = getDepartments(res.depts)
    }
  }
}
</script>

<style scoped lang='scss'>
.el-row{
  width: 100%;
}
</style>

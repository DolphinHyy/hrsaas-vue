<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 头部栏 -->
      <el-card class="box-card">
        <el-row>
          <el-col :span="20">传智教育</el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <el-col :span="10">负责人</el-col>
              <el-col :span="10">
                <el-dropdown>
                  <span class="el-dropdown-link">
                    操作<i class="el-icon-arrow-down el-icon--right" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- 具体部门 -->
        <el-tree default-expand-all :data="treeData" :props="defaultProps" @node-click="handleNodeClick">
          <template>
            <el-row style="width:100%">
              <el-col :span="20">传智教育</el-col>
              <el-col :span="4">
                <el-row type="flex" justify="end">
                  <el-col :span="10">负责人</el-col>
                  <el-col :span="10">
                    <el-dropdown>
                      <span class="el-dropdown-link">
                        操作<i class="el-icon-arrow-down el-icon--right" />
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>添加子部门</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeData: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },

  created() {

  },

  methods: {
    handleNodeClick(data) {
      console.log(data)
    }
  }
}
</script>

<style scoped lang='less'>
</style>

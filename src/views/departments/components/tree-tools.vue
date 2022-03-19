<template>
  <el-row>
    <el-col :span="20">{{ treeNode.name }}</el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col :span="10">{{ treeNode.manager }}</el-col>
        <el-col :span="10">
          <el-dropdown>
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus" @click.native="$emit('onShowAdd',treeNode)">添加子部门
              </el-dropdown-item>
              <el-dropdown-item v-if="isRoot" icon="el-icon-plus" @click.native="onRemove()">删除部门
              </el-dropdown-item>
              <el-dropdown-item v-if="isRoot" icon="el-icon-plus" @click.native="onEdit()">编辑部门
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import { delDepartmentsAPI } from '@/api/department'
export default {
  components: {

  },
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {

    }
  },
  created() {

  },
  methods: {
    async onRemove() {
      try {
        await this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delDepartmentsAPI(this.treeNode.id)
        this.$emit('removeSuccess')
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
    onEdit() {
      console.log('编辑部门')
      this.$emit('showEdit', this.treeNode)
    }
  }
}
</script>

<style scoped lang="scss">

</style>

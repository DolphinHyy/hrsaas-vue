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
              <el-dropdown-item icon="el-icon-plus" @click.native="$emit('onShowAdd')">添加子部门
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
export default {
  components: {

  },
  props: {
    treeNode: {
      type: Object,
      required: true
    }
  },
  data() {
    return {

    }
  },
  created() {

  },
  methods: {
  }
}
</script>

<style scoped lang="scss">

</style>

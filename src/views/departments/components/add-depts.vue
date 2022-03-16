<template>
  <el-dialog
    title="提示"
    :visible="dialogShow"
    width="30%"
  >
    <el-form ref="form" label-width="120px">
      <el-form-item label="部门名称">
        <el-input placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码">
        <el-input placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-input placeholder="2-10个字符" />
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input placeholder="1-150个字符" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click.native="$emit('update:dialogShow',false)">取 消</el-button>
      <!-- <el-button @click.native="$alert(1)">取 消</el-button> -->
      <el-button type="primary" @click.native="$emit('update:dialogShow',false)">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  components: {

  },
  props: {
    dialogShow: {
      type: Boolean,
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

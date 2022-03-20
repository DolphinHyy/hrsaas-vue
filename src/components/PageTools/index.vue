<template>
  <div>
    <el-card>
      <el-row type="flex">
        <el-col v-if="isShowI" class="left">
          <div>
            <i class="el-icon-info" style="color:blue" />
            <slot name="before">
              <span>共16条记录</span>
            </slot>
          </div>
        </el-col>
        <el-col class="right">
          <slot name="after">
            <span>共16条记录</span>
          </slot>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {
    isShowI: {
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

  }
}
</script>

<style scoped lang="scss">
.left{
  line-height: 34px;
  display: inline-block;
  padding: 0 10px;
  border-radius: 3px;
  border: 1px solid#91d5ff;
  background: #e6f7ff;;
}
.right{
  display: flex;
  justify-content: flex-end;
}
</style>

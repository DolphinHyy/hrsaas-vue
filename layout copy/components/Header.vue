<template>
  <div class="header">
    <div class="left-logo">
      <img src="@/assets/home/heima.png" alt="黑马">
      <span>杭州黑马后台管理系统</span>
    </div>
    <button class="logout" @click="logout">退出</button>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    logout() {
      this.$store.dispatch('user/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style  lang="scss" scoped>
  .header{
    background-color: #373d41;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    .left-logo{
      display: flex;
      align-items: center;
      span{
        color: #fff;
        font-size: 22px;
        margin-left: 10px
      }
    }
    .logout{
      display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    }
  }
</style>

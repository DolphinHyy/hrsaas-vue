<template>
  <div>
    <UploadExcel
      :on-success="onSuccess"
    />
  </div>
</template>

<script>
import { importStaffByExcelAPI } from '@/api/staff'
export default {
  components: {

  },
  data() {
    return {

    }
  },
  created() {

  },
  methods: {
    async onSuccess({ header, results }) {
      const userMapKey = {
        姓名: 'username',
        手机号: 'mobile',
        入职日期: 'timeOfEntry',
        转正日期: 'correctionTime',
        工号: 'workNumber'
      }
      const res = results.map(item => {
        const user = {}
        Object.keys(item).forEach(key => {
          if (key === '入职日期' || key === '转正日期') {
            console.log(1)
            user[userMapKey[key]] = this.formatDate(item[key], '/')
          } else {
            user[userMapKey[key]] = item[key]
          }
        })
        return user
      })
      await importStaffByExcelAPI(res)
      this.$message.success('导入成功')
      this.$router.push('/employees')
      // console.log(header, results)
      // const res = results.map(item => {
      //   return {
      //     username: item.姓名,
      //     mobile: item.手机号,
      //     timeOfEntry: item.入职日期,
      //     correctionTime: item.转正日期,
      //     workNumber: item.工号
      //   }
      // })
      console.log(res)
    },
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style scoped lang="scss">

</style>

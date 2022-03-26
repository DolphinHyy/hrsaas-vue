<template>
  <div>
    <el-upload
      id="upload"
      v-loading="loading"
      target="#upload"
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :http-request="onRequest"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="handlePictureCardPreview"
      :limit="1"
      :before-upload="beforeUpload"
      accept=".jpg,.png"
      :class="{hideAdd:fileList.length}"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog title="预览图片" :visible.sync="previewImgDialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDazA5jqmTu52lERO5WgcKn0ygGbgW7TZQ',
  SecretKey: 'cy43pKYVCcldFcokRt51h8LIzQbWAZje'
})
console.log(cos)
export default {
  name: 'UploadImg',
  components: {

  },
  data() {
    return {
      fileList: [],
      previewImgDialogVisible: false,
      dialogImageUrl: 'http://destiny001.gitee.io/image/cxk.gif',
      loading: false
    }
  },
  created() {

  },
  methods: {
    // 自定义请求
    onRequest(file) {
      this.loading = true
      cos.putObject({
        Bucket: 'hr-saas-1310520870', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-shanghai', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: file.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        StorageClass: 'STANDARD',
        Body: file.file, // 上传文件对象
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        console.log(err || data)
        if (!err && data.statusCode === 200) {
          this.$emit('onSuccess', { url: 'https://' + data.Location })
          // console.log('https://' + data.Location)
        }
      })
      this.loading = false
    },
    // 上传图片
    onChange(file, fileList) {
      console.log(file, fileList)
      this.fileList = fileList
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.previewImgDialogVisible = true
    },
    beforeUpload(file) {
      const types = ['image/png', 'image/jpeg']
      const maxSize = 0.5 * 1024 * 1024
      if (!types.includes(file.type)) {
        this.$message.error('亲，请上传png或jpg格式类型的图片')
        return false
      }
      if (file.size > maxSize) {
        this.$message.error('亲，请上传大小在512KB以内的图片')
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss">
.hideAdd .el-upload--picture-card{
  display: none;
}
</style>

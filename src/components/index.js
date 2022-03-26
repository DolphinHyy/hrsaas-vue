import PageTools from '@/components/PageTools'
import UploadExcel from '@/components/UploadExcel'
import UploadImg from '@/components/UploadImg'
export default {
  install: function(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('UploadImg', UploadImg)
  }
}

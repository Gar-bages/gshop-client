import Vue from 'vue'
import moment from 'moment'

Vue.filter('date-format',function (value,formatStr) { //formatStr 格式可以作为参数传过来
  return moment(value).format(formatStr || 'YYYY-MM-DD HH:mm:ss')
})

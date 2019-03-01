/*
能发送ajax请求的函数模块
函数的返回值为promise对象
*/
import axios from 'axios'

// data={} 参数对象 有就传 没有就不传
export default function ajax (url ,data={} ,method='GET') {
  return new Promise((resolve, reject) => {
    let promise
    if(method === 'GET') {
      promise = axios.get(url,{params:data})  //params是地址中的query参数的另一种写法
    }else {
      promise = axios.post(url,data)
    }
    promise.then(response => {
      resolve(response.data)  //异步得到的不再是reponse, data数据(result)
    }).catch(error => {
      // reject(error)  这样调用reject 外部使用时还需要用try catch 处理
      alert('请求出错',error.message) //把错误统一处理统一处理
    })
  })
}

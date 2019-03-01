import ajax from './ajax'

// export function reqAderss (longitude,latitude) {
//   ajax(`/position/${latitude},${longitude}`,{},'GET')  //:geohash params参数  没有qurey参数 本身就是get方法
// }

const BASE = '/api'  // 匹配所有以 '/api' 开头的请求路径

//简写  根据经纬度获取位置
export const reqAdderss = (longitude,latitude) => ajax(BASE + `/position/${latitude},${longitude}`)

//获取食品分类列表
export const reqCategorys = () => ajax(BASE + '/index_category')

//根据经纬度获取商铺列表
export const reqShops = ({longitude,latitude}) =>ajax(BASE + '/shops',{latitude,longitude})

//用户名密码登陆
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(BASE + '/login_pwd',{name, pwd, captcha},'POST')

//发送短信验证码
export const reqSendCode = (phone) => ajax(BASE + '/sendcode',{phone})

//手机号验证码登陆
export const reqSmsLogin = (phone,code) => ajax(BASE + '/login_sms',{phone,code}, 'POST')

//根据会话获取用户信息 (打开浏览器自动获取信息)
export const reqUser = () => ajax(BASE + '/userinfo')

//用户登出
export const reqLogout = () => ajax(BASE + '/logout')

//mock
export const reqGoods = () => ajax('/goods')
export const reqRatings = () => ajax('/ratings')
export const reqInfo = () => ajax('/info')

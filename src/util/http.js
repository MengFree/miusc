import axios from "axios"
import store from "../store"
import qs from "qs"
// 添加请求拦截器
axios.interceptors.request.use(function(config) {
        config.$title = config.$title || 'request'
        store.dispatch("LOADING", true)
            // 在发送请求之前做些什么
        console.log(`request  <(${config.$title})>  start !!!`)
        return config
    }, function(error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    })
    // 添加响应拦截器
axios.interceptors.response.use(function(response) {
    store.dispatch("LOADING", false)
        // 对响应数据做点什么
    console.log(`=======================${response.config.$title}  begin=======================`)
    console.log(response.config.method, "url:", response.config.url)
    response.config.method.toLowerCase() == "get" && response.config.params && console.log("params:", response.config.params)
    var index = response.config.url.indexOf("?")
    index > -1 && (index + 1) < response.config.url.length && console.log("search:", qs.parse(response.config.url.substring(index + 1)))
    response.config.method.toLowerCase() == "post" || response.config.method == "put" && console.log("params:", response.config.data)
    console.log("response:", response.data)
        // console.timeEnd("time" + response.config.$title)
    console.log(`=======================${response.config.$title}    end=======================`)
    return response
}, function(error) {
    store.dispatch("LOADING", false)
        // 对响应错误做点什么
        // console.log(error.response)
    console.log(`=======================${error.config.$title} Error begin=======================`)
        // if (error && error.response) {
        //     logMessage(error.response.status)
        // }
    console.log("url:", error.config.method, error.config.url)
    error.config.method.toLowerCase() == "get" && error.config.params && console.log("params:", error.config.params)
    console.log("search:", qs.parse(error.config.url))
    error.config.method.toLowerCase() == "post" || error.config.method == "put" && console.log("data:", error.config.data)
    error.response && console.log("response:", error.response.data)
        // !error.response && console.log("response:", error.response)
    console.log(`=======================${error.config.$title} error   end=======================`)
    return Promise.reject(error)
})
export default axios
import axios from 'axios'

axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://localhost:3000';

// http request 请求拦截器，有token值则配置上token值
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return error;
    });

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        if (error.response) {
            if(error.response.status === 401){

            }
        }
        return error
    });

const preDefinedError = {
    404: '请求地址不存在',
    500: '服务器发生错误',
    401: '用户未认证'
}

const queryParameters = (data) => Object.keys(data)
    .map(key => [key, data[key]].map(encodeURIComponent).join('='))
    .join('&');

export default fetch = (url,options = {}) => {
   const requestHeaders =  { 'content-type': 'application/json' };
   return axios({
        url,
        method: 'post',
        header: requestHeaders,
        ...options
    });

}



import axios from 'axios';
import { getRedirectPath } from '../util'
const AUTH_SUCCESS = 'LOGIN_SUCESS';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const CLEAR_REDIRECT = 'CLEAR_REDIRECT';
const initState = {
    redirectTo:'',
    isAuth:false,
    msg:'',
    username:'',
    like_count:'',
    integral:'',
    mobile:'',
    user_id:'',
    register_time:'',
    email:'',
    individual:'',
    is_valid:0,
    current_address_id:{},
    avatar:''
};

//reducer
export function userReducer(state=initState,action) {

    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state,msg:'',redirectTo:getRedirectPath(action.payload.is_valid),...action.payload};
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg};
        case LOAD_DATA:
            return {...state,msg:'',redirectTo:'',...action.payload}
        case LOGOUT_SUCCESS:
            return {...initState,redirectTo:''}
        case CLEAR_REDIRECT:
            return {...state,redirectTo:''}
        default:
            return state;
    }
}


function authSuccess(data) {
    return {
        type:AUTH_SUCCESS,
        payload:data
    }
}

function errorMsg(msg) {
    return {
        type:ERROR_MSG,
        msg
    }
}

export function logoutSubmit(){
    return {
        type: LOGOUT_SUCCESS
    }
}
export function clearRedirect(){
    return {
        type: CLEAR_REDIRECT
    }
}
export function loadData(data){
    return {
        type:LOAD_DATA,
        payload:data
    }
}

export function updateService(data,valid) {
    return dispatch => {
        axios.post('user/updateUserInfo',data)
            .then(res => {
                if( res.code === 0){
                    if(valid === 1){
                        dispatch(authSuccess({...res.data,redirectTo:'/user'}))
                    }else{
                        dispatch(authSuccess(res.data))
                    }

                }else{
                    dispatch(errorMsg(res.msg))
                }
            })
    }
}

export function loginService({user,pwd}) {
    if(!user || !pwd ){
        return errorMsg('用户名和密码不能为空')
    }
    return dispatch => {
        axios.post('user/login',{user,pwd})
            .then(res => {

                if(res.code === 0){
                    dispatch(authSuccess(res.data))
                }else{
                    dispatch(errorMsg(res.msg))
                }
            })
    }
}

export function registerService({user,pwd,repeatpwd,type}) {


    if(!user || !pwd || !repeatpwd){
        return errorMsg('用户名和密码不能为空')
    }
    if(pwd !== repeatpwd){
        return errorMsg('密码与确认密码不一致')
    }
    return dispatch => {
        axios.post('user/register',{user,pwd,type})
            .then(res => {
                if(res.code === 0){
                    dispatch(authSuccess(res.data))
                }else{
                    dispatch(errorMsg(res.msg))
                }
            })
    }


}
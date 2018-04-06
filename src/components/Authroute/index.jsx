import React,{ Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadData,clearRedirect} from '../../reduxs/user.redux'


@withRouter
@connect(
    null,
    {loadData,clearRedirect}
)
class Authroute extends Component {

    componentDidMount() {

        this.props.clearRedirect();
        //现在的url  比如login register 不用登陆不用跳转
        const publicList = ['/login','/register'];
        const pathName = this.props.location.pathname;

        if(publicList.indexOf(pathName) > -1){
            return null;
        }
        //获取用户信息
        axios.post('/user/getUserInfo').
        then(res => {
            if(res.code === 0){ //登陆成功
                this.props.loadData(res.data)
            }else{
                this.props.history.push('/login')
            }
        })
        //是否登陆

        //用户的type 身份是boss 还是 牛人

        //用户是否完善信息(选择头像个人简介)

    }
    render() {
        return (
            <div></div>
        )
    }

}

export default Authroute;
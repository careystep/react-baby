import React,{ Component } from 'react';
import { Redirect } from 'react-router-dom'
import Logo from '../../components/Logo'
import { connect } from 'react-redux'
import {loginService} from '../../reduxs/user.redux'
import {imoocForm} from '../../hocfunction/imooc-form';
import { List,InputItem,WingBlank,WhiteSpace,Button } from 'antd-mobile'


@connect(
    state => state.user,
    {loginService}
)
@imoocForm
class Login extends Component {

    constructor(props,context){
        super(props,context);
    }
    registerHandle() {
        this.props.history.push('/register');
    }
    loginHandle() {
        this.props.loginService(this.props.state);
    }
    render() {

        return (
            <div>
                {(this.props.redirectTo&&this.props.redirectTo!='/login') ? <Redirect to={this.props.redirectTo} /> : ''}
                <Logo/>
                {
                    this.props.msg ? <p style={{color:'red',paddingLeft:'20px'}}>{this.props.msg}</p> : ""
                }
                <WingBlank>
                    <List>
                        <InputItem
                            onChange={v => this.props.handleChange('user',v)}
                        >用户：</InputItem>
                        <InputItem
                            type="password"
                            onChange={v => this.props.handleChange('pwd',v)}
                        >密码：</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.loginHandle.bind(this)}>登陆</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.registerHandle.bind(this)}>注册</Button>
                </WingBlank>
            </div>
        )
    }

}

export default Login;
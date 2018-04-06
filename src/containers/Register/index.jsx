import React,{ Component } from 'react';
import Logo from '../../components/Logo'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { registerService } from '../../reduxs/user.redux'
import {imoocForm} from '../../hocfunction/imooc-form'
import { List,InputItem,WingBlank,WhiteSpace,Button } from 'antd-mobile'

@connect(
    state => state.user,
    {registerService}
)
@imoocForm
class Register extends Component {

    constructor(props,context) {
        super(props,context);

    }
    componentDidMount() {
        this.props.handleChange('type','genius');
    }
    registerHandle() {
        this.props.registerService(this.props.state);
    }
    render() {

        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : ''}
                <Logo/>
                {
                    this.props.msg ? <p style={{color:'red',paddingLeft:'20px'}}>{this.props.msg}</p> : ""
                }
                <WingBlank>
                    <List>
                        <InputItem
                            onChange={v => this.props.handleChange('user',v)}
                        >用户名</InputItem>
                        <InputItem
                            type="password"
                            onChange={v => this.props.handleChange('pwd',v)}
                        >密码</InputItem>
                        <InputItem
                            type="password"
                            onChange={v => this.props.handleChange('repeatpwd',v)}
                        >确认密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.registerHandle.bind(this)}>注册</Button>
                    <WhiteSpace/>
                    <WhiteSpace/>
                </WingBlank>
            </div>
        )
    }

}

export default Register;
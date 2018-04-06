import React,{ Component } from 'react';
import Address from '../Address'
import {connect} from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import browserCookie from 'browser-cookies' //set , get , erase
import {logoutSubmit} from '../../reduxs/user.redux'
import {List,Button,WhiteSpace} from 'antd-mobile'
import {getImage} from '../../util'

import './style.css'

@connect(
    state => state,
    {logoutSubmit}
)
class User extends Component {

    constructor(props,context){
        super(props,context);
        this.state = {
            showAddress: false
        }
        this.showAddressHandle = this.showAddressHandle.bind(this)
    }
    render() {
        const Item = List.Item;
        return  (
            <div>
                <div className="avatar-pic">
                    <div className="avatar-box"
                        style={{backgroundImage:'url('+getImage(this.props.user.avatar)+')'}}
                    ></div>
                    {/*<img src={getImage(this.props.user.avatar)} alt=""/>*/}
                </div>
                <List renderHeader={() => '个人信息'}>
                    <Item>昵称: {this.props.user.username}</Item>
                    <Item>电话: {this.props.user.mobile}</Item>
                    <Item>邮箱: {this.props.user.email}</Item>
                    <Item>积分: {this.props.user.integral}</Item>
                    <Item onClick={()=> this.showAddressHandle(true)} arrow="horizontal" >收获地址管理</Item>
                </List>
                <WhiteSpace/>
                <WhiteSpace/>
                <Button onClick={this.updateHandle.bind(this)} type="primary">修改信息</Button>
                <WhiteSpace/>
                <WhiteSpace/>
                <Button onClick={this.logoutHandle.bind(this)} type="warning">退出登陆</Button>

                <ReactCSSTransitionGroup
                    transitionName="slide"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    {
                        this.state.showAddress ? (<div className="page-fixed">
                            <Address showAddressHandle={this.showAddressHandle} />
                        </div>)
                                                : null
                    }

                </ReactCSSTransitionGroup>

            </div>
            )
    }
    showAddressHandle(flag) {
        this.setState({showAddress: flag})
    }
    updateHandle() {
        this.props.history.push('/userInfo')
    }
    logoutHandle() {
        browserCookie.erase("user_id");
        this.props.logoutSubmit();
        this.props.history.push('/login')
    }

}

export default User;
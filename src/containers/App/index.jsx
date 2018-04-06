import React,{ Component } from 'react';
import {connect} from 'react-redux'
import Authroute from '../../components/Authroute'
import Baby  from '../Baby'
import Product  from '../Product'
import Order  from '../Order'
import User from '../User'
import {Switch, Route,Redirect} from 'react-router-dom'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '../../components/NavLinkBar'

import './style.css'

class App extends Component {

    constructor(props,context){
        super(props,context);
    }

    render() {
        const {pathname} = this.props.location;
        const navList = [
            {
                path:'/baby',
                text:'宝贝',
                icon:'boss',
                title:'宝贝广场',
                component:Baby,
            },
            {
                path:'/product',
                text:'商城',
                icon:'job',
                title:'积分商城',
                component:Product,
            },
            {
                path:'/order',
                text:'订单',
                icon:'msg',
                title:'我的订单',
                component:Order,
            },
            {
                path:'/user',
                text:'我',
                icon:'msg',
                title:'个人中心',
                component:User,
            }
        ];
        const pathItem = navList.find(function(v){
            return v.path==pathname
        })

        return (
            <div className="dashboard-cont">
                <div className="dashboard-flex-box">
                    <div className="page-tabs-nav-wrap">
                        <NavBar mode="dark">{pathItem ? pathItem.title : ''}</NavBar>
                    </div>

                    <div className="page-tabs-content-wrap">
                        <Authroute></Authroute>
                        <Switch>
                            <Route path='/baby' component={Baby} />
                            <Route path='/product' component={Product} />
                            <Route path='/order' component={Order} />
                            <Route path='/user' component={User} />
                        </Switch>
                        {/*<Redirect to="/baby"></Redirect>*/}
                    </div>
                    <div className="page-tabs-tab-wrap">
                        <NavLinkBar data={navList}/>
                    </div>
                </div>
            </div>
        )
    }

}

export default App;
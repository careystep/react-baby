import React,{Component} from 'react'
import AddressItem from './AddressItem'
import AddressEdit from './subpage/AddressEdit'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {List,Icon,NavBar} from 'antd-mobile'
import './style.css'
class Address extends Component {
    constructor(props) {
        super(props)
        this.showAddressEditHandle = this.showAddressEditHandle.bind(this)
        this.state = {
            showAddressEdit: false
        }
    }
    render() {
        return (
            <div className="address-content">
                <NavBar
                    icon={<Icon type="left" />}
                    mode="dark"
                    onLeftClick={() => this.props.showAddressHandle(false)}
                >地址管理</NavBar>

                <List>
                    <List.Item onClick={() => this.showAddressEditHandle(true)}  arrow="horizontal">新增收获地址</List.Item>
                </List>
                <div className="address-list">
                    <AddressItem />
                    <AddressItem />
                </div>

                <ReactCSSTransitionGroup
                    transitionName="slide"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    {
                        this.state.showAddressEdit ? (<div className="page-fixed">
                            <AddressEdit showAddressEditHandle={this.showAddressEditHandle} />
                        </div>)
                            : null
                    }

                </ReactCSSTransitionGroup>
            </div>
        )
    }

    showAddressEditHandle(flag) {
        this.setState({showAddressEdit: flag})
    }

}

export default Address


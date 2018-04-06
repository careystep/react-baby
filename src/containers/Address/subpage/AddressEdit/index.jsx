import React,{Component} from 'react'
import { NavBar,Icon,List,InputItem,TextareaItem,Button,WhiteSpace } from 'antd-mobile'
// {
//     phone: String,
//         user_id: Number,
//     created_at: {type: Date, default: Date.now()},
//     phone_bk: String,
//         name: String,
//     province: String,
//     city: String,
//     county: String,
//     address_detail: String,
//     sex: {type: Number, default: 1},
//     is_user_default: {type: Boolean, default: true},
// }
class AddressEdit extends Component {

    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="address-content">
                <NavBar
                    icon={<Icon type="left" />}
                    mode="dark"
                    onLeftClick={() => this.props.showAddressEditHandle(false)}
                >新增地址</NavBar>
                <WhiteSpace/>
                <List>
                    <InputItem
                        onChange={(val)=>{this.handleChange('name',val)}}
                    >姓名</InputItem>
                    <InputItem

                        onChange={(val)=>{this.handleChange('phone',val)}}
                    >手机号码</InputItem>
                    <InputItem

                        onChange={(val)=>{this.handleChange('phone_bk',val)}}
                    >备用号码</InputItem>
                    <InputItem

                        onChange={(val)=>{this.handleChange('phone',val)}}
                    >性别</InputItem>
                    <InputItem
                        onChange={(val)=>{this.handleChange('phone',val)}}
                    >区域</InputItem>
                    <TextareaItem

                        rows={3}
                        autoHeight
                        title="地址详情"
                        onChange={(val)=>{this.handleChange('individual',val)}}
                    ></TextareaItem>
                </List>
                <WhiteSpace/>
                <Button type="primary">保存</Button>
            </div>

        )
    }
    handleChange(key,value){
        this.setState({[key]:value})
    }

}

AddressEdit.defauleProps = {
    phone: '',
    phone_bk: '',
    name: '',
    province: '',
    city: '',
    county: '',
    address_detail: '',
    sex: '',
    is_user_default: ''
}

export default AddressEdit


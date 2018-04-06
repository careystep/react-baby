import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {updateService} from '../../reduxs/user.redux'
import services from '../../fetch'
import AvatarSelector from '../../components/AvatarSelector'
import { NavBar,List,InputItem,TextareaItem,Button,WhiteSpace } from 'antd-mobile'

@connect(
    state => state.user,
    {updateService}
)

class BossInfo extends Component{
    constructor(props,context){
        super(props,context);
        this.state = {
            username:'',
            mobile:'',
            email:'',
            avatar:'',
            individual:''
        }
    }
    async componentDidMount() {
        const {user_id,username,mobile,email,avatar,individual,...props} = this.props;

        if(user_id){
            this.setState(
                {
                    username,
                    mobile,
                    email,
                    avatar,
                    individual
                }
            )
        }else{
            const res = await services.getUserInfo()
            if(res.code === 0){
                this.setState(
                    {
                        username:res.data.username,
                        mobile:res.data.mobile,
                        email:res.data.email,
                        avatar:res.data.avatar,
                        individual:res.data.individual
                    }
                )
            }
        }

    }
    render() {

        const pathname = this.props.location.pathname;
        const redirectTo = this.props.redirectTo;
        return (
            <div>
                {
                    redirectTo && redirectTo !== pathname
                        ? <Redirect to={redirectTo}/>
                        : ''
                }
                <NavBar mode="dark">个人完善信息页</NavBar>
                <AvatarSelector avatar={this.state.avatar} selectAvatar={this.selectAvatar.bind(this)} />
                <WhiteSpace/>
                <List>
                    <InputItem
                        value={this.state.username}
                        onChange={(val)=>{this.handleChange('username',val)}}
                    >用户名称</InputItem>
                    <InputItem
                        value={this.state.mobile}
                        onChange={(val)=>{this.handleChange('mobile',val)}}
                    >手机号码</InputItem>
                    <InputItem
                        value={this.state.email}
                        onChange={(val)=>{this.handleChange('email',val)}}
                    >邮箱号码</InputItem>
                    <TextareaItem
                        value={this.state.individual}
                        rows={3}
                        autoHeight
                        title="个人介绍"
                        onChange={(val)=>{this.handleChange('individual',val)}}
                    ></TextareaItem>
                </List>
                <WhiteSpace/>
                <Button type="primary" onClick={this.updateHandle.bind(this)}>保存</Button>
            </div>
        )
    }
    updateHandle(){
        this.props.updateService(this.state,this.props.is_valid)
    }
    handleChange(key,value){
        this.setState({[key]:value})
    }
    async selectAvatar(files) {
        const file = files.length > 0 ? files[0] : '';
        let param = new FormData()  // 创建form对象
        param.append('file', file.file)  // 通过append向form对象添加数据
        try {
           const res = await services.updateAvatar({
                header: {'Content-Type': 'multipart/form-data'},
                data:param
            })
            if(res.code === 0){
               this.setState({avatar:res.data})
            }
        }catch (err) {
            console.log(err)
        }

    }
}


export default BossInfo;
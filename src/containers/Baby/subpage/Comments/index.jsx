import React,{ Component } from 'react';
import {NavBar,InputItem,Icon,Card, WingBlank, WhiteSpace} from 'antd-mobile'
import service from '../../../../fetch'
import {getImage,formatDate} from '../../../../util'

import './style.css'

class Comments extends Component {

    constructor(props,context){
        super(props,context);
        this.state = {text:'',list:[]}
    }
    async componentDidMount() {
        this.getCommentList();
    }
    async commentSubmit() {
        const babyid = this.props.match.params.baby_id;

        const res = await service.addComment({data:{baby_id:babyid,content:this.state.text}});
        this.setState({text:''})
        this.getCommentList();
    }
    async getCommentList() {
        const baby_id = this.props.match.params.baby_id;
        const res = await service.getComments({data:{baby_id}})
        this.setState({list:res.data})

    }
    handleChange(key,val) {
        this.setState({[key]:val});
    }
    render() {

        return (
            <div className="comments-cont sub-page">
                <div className="comments-flex-box">
                    <div className="page-tabs-nav-wrap">
                        <NavBar
                            icon={<Icon type="left" />}
                            mode="dark"
                            onLeftClick={() => this.props.history.goBack()}
                        >评论列表</NavBar>
                    </div>
                    <div className="page-tabs-content-wrap">
                        <WingBlank>
                        {
                            this.state.list.map((item,idx) => {
                                return (
                                    <div key={idx}>
                                        <WhiteSpace/>
                                        <Card>
                                            <Card.Header
                                                title={item.username}
                                                thumb={getImage(item.avatar)}
                                                extra={<span>{formatDate(item.created_at,'yyyy-MM-dd hh:mm:ss')}</span>}
                                            />
                                            <Card.Body>
                                                <div>{item.content}</div>
                                            </Card.Body>
                                        </Card>
                                        <WhiteSpace />
                                    </div>
                                )
                            })
                        }
                        </WingBlank>

                    </div>
                    <div className="page-tabs-tab-wrap">
                        <InputItem
                            value={this.state.text}
                            onChange={val => {this.handleChange('text',val)}}
                            placeholder="请输入"
                            extra={<span onClick={this.commentSubmit.bind(this)}>提交</span>}
                        ></InputItem>
                    </div>
                </div>
            </div>
        )
    }

}

export default Comments;
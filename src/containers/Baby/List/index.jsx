import React,{ Component } from 'react';
import {Link} from 'react-router-dom'
import {getImage,formatDate} from '../../../util'
import services from '../../../fetch'
import './style.css'

class List extends Component {

    constructor(props,context){
        super(props,context);
    }
    async iLiveHandle(idx) {
        const {_id} = this.props.list[idx];

        const res = await services.likeToBaby({data:{baby_id:_id}})

        this.props.setLikeValue(res.data,idx);
    }
    render() {
        return (
            <ul className="baby-list">
                {
                    this.props.list.map((item,idx) => {
                        let imageListType = ''
                        if(item.image_paths.length % 2 === 0){
                            imageListType = 'image-list2'
                        }else if(item.image_paths.length % 3 === 0){
                            imageListType = 'image-list3'
                        }
                        return (
                            <li key={idx}>
                                <div className="header">
                                    <span className="user-pic"
                                          style={{backgroundImage:'url('+getImage(item.avatar)+')'}}
                                    ></span>
                                    <div className="info">
                                        <p className="user-name">{item.username}</p>
                                        <p className="baby-tiem">{formatDate(item.created_at,'yyyy-MM-dd hh:mm:ss')}</p>
                                    </div>
                                </div>
                                <div className="title">
                                    {item.name}
                                </div>
                                <div className={'image-list '+imageListType}>
                                    {
                                        item.image_paths.map((pic,picidx) => {
                                           return  pic
                                                   ? (
                                                        <div onClick={()=>{this.props.changeSlideImages(item.image_paths)}} key={picidx} className="image-box">
                                                            <div className="image-content">
                                                                <img src={getImage(pic)} />
                                                            </div>
                                                        </div>
                                                     )
                                                    :''
                                        })
                                    }
                                </div>
                                <div className="command">
                                    <i className={!item.hot_flag ? 'icon-heart' : 'icon-heart has'} onClick={()=>this.iLiveHandle(idx)}>
                                        赞
                                    </i>
                                    <span className="idx-num">{item.hot}</span>
                                    <i className="icon-heart">
                                        <Link
                                            to={{
                                                pathname: `/comments/${item._id}`,
                                                state: { modal: true }
                                            }}
                                        >评</Link>
                                    </i>
                                    <span className="idx-num">{item.comment_count}</span>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

}

export default List;
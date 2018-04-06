import React,{ Component } from 'react';
import BScroll from 'better-scroll';
import {Toast} from 'antd-mobile'
import SlideImage from '../../components/SlideImage'
import List from './List'
import services from '../../fetch'

import './style.css'
class Body extends Component {

    constructor(props,context){
        super(props,context);
        this.state = {
            list: [],
            slideImages: [],
            scrollY: 0
        }
        this.setLikeValue = this.setLikeValue.bind(this);
        this.showComments = this.showComments.bind(this);
        this.changeHideSlide = this.changeHideSlide.bind(this);
        this.changeSlideImages = this.changeSlideImages.bind(this);
    }
    async componentDidMount() {
        const res = await services.getBabyList();
        this.setState({list:res.data.list || []});
        this.babyScroll = new BScroll(this.refs.babyWarp,{
            click: true,
            probeType: 3
        })
        this.babyScroll.on('scroll', (pos) => {
            this.state.scrollY = pos.y;
        });
        this.babyScroll.on('pullingDown', (ops) => {
            console.log(ops)
        })
    }
    setLikeValue(val,idx) {
        let list = this.state.list;
        let hot_flag = val > list[idx].hot
        list[idx] = {...list[idx],hot:val,hot_flag}
        this.setState({list})
    }
    changeHideSlide() {
        console.log(123)
        this.setState({showSlide: false})
    }
    changeSlideImages(list){
        const slideImages = list.map((item) => {
            return {
                img: item
            }
        })
        this.setState({showSlide: true,slideImages})
    }
    showComments(item) {

    }
    render() {
        return (
            <div style={{height: '100%', overflow:'hidden'}} ref="babyWarp">
                <List
                    changeSlideImages={this.changeSlideImages}
                    setLikeValue={this.setLikeValue}
                    list={this.state.list}
                />
                {this.state.showSlide ? <SlideImage imageList={this.state.slideImages} changeHideSlide={this.changeHideSlide} /> : null}
            </div>
        )
    }

}

export default Body;
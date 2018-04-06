import React,{Component} from 'react'
import {getImage} from '../../util'
import './style.css'

const innerSize = {
    w : window.innerWidth,
    h : window.innerHeight
}
const scale = innerSize.w / innerSize.h;
let idx = 0;

class SlideImage extends Component {

    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="slide-canvas">
                <span className="close" onClick={()=> this.props.changeHideSlide()}>x</span>
                <ul ref="outer">
                    {
                        this.props.imageList.map((item,index) => {
                            return (
                                <li  style={{"transform":"translate3d("+(index*innerSize.w)+"px,0,0)"}} key={index}>
                                    <img src={getImage(item.img)} />
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }

    componentDidMount() {
        const outerDom = this.refs.outer;
        let self = this,screedW = innerSize.w,lis = outerDom.getElementsByTagName("li");
        let startX = 0, offsetL = 0,curDate = 0; //开始坐标和偏移量，时间
        function startHandler(event) {
            //按下去时间
            curDate = new Date() * 1;
            //按下的X坐标
            startX = event.touches[0].pageX;
            //清零偏移
            offsetL = 0;
        }
        function moveHandler(event) {
            event.preventDefault();

            offsetL = event.targetTouches[0].pageX - startX;

            var i = idx - 1 ,m = i + 3;

            for(i; i < m; i++ ){
                lis[i] && (lis[i].style.webkitTransition = "-webkit-transform 0s ease-out");
                lis[i] && (lis[i].style.webkitTransform = "translate3d("+((i-idx)*screedW+offsetL)+"px,0,0)");
            }
        }
        function endHandler(event) {
            if(offsetL > 0){
                goIndex("-1");
            }else{
                goIndex("+1");
            }
        }
        function goIndex(agr) {

            let cidx = 0;
            if(typeof agr == "string"){
                cidx = idx + agr * 1;

            }else if(typeof agr == "number"){
                cidx = agr;
            }

            if(cidx < 0){
                cidx = 0;
            }else if(cidx > lis.length -1){
                cidx = lis.length-1;
            }
            lis[cidx-1] && (lis[cidx-1].style.webkitTransition = "-webkit-transform 0.2s ease-out");
            lis[cidx] && (lis[cidx].style.webkitTransition = "-webkit-transform 0.2s ease-out");
            lis[cidx+1] && (lis[cidx+1].style.webkitTransition = "-webkit-transform 0.2s ease-out");

            lis[cidx-1] && (lis[cidx-1].style.webkitTransform = "translate3d(-"+(innerSize.w)+"px,0,0)");
            lis[cidx] && (lis[cidx].style.webkitTransform ="translate3d(0,0,0)");
            lis[cidx+1] && (lis[cidx+1].style.webkitTransform = "translate3d("+innerSize.w+"px,0,0)");

            idx = cidx;
        }
        outerDom.addEventListener('touchstart',startHandler,false);
        outerDom.addEventListener('touchmove',moveHandler,false);
        outerDom.addEventListener('touchend',endHandler,false);

    }

}
SlideImage.defauleProps = {
    imageList: []
}

export default SlideImage;
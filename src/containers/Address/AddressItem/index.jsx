import React,{Component} from 'react'

import './style.css'



class AddressItem extends Component {

    render() {
        return (
            <div className="address-item">
                <ul className="address" ref="address-dom">
                    <li>
                       中华人民共和国广东省广州市
                    </li>
                    <li>
                        <strong>carey一步</strong> 133xxxxxxxx
                    </li>
                </ul>
                <p className="handle" ref="handle">
                    <span>删除</span>
                </p>
            </div>
        )
    }
    componentDidMount() {
        const maxOffset = this.refs.handle.clientWidth;
        const addressDom = this.refs['address-dom'];

        let offsetL = 0, startTime = 0,startX = 0,startOffset = 0;
        var startHandler = function(event) {
            startTime = Date.now();
            startX = event.touches[0].pageX;
            offsetL = 0;
        }
        var moveHandler = function(event) {
            event.preventDefault();
            let currentOffset = event.touches[0].pageX - startX;
            if((currentOffset > 0 && startOffset === 0)
                || (currentOffset < 0 && startOffset === -maxOffset)) {
                startX = event.touches[0].pageX;
                offsetL = startOffset;
            }else {
                if(Math.abs(currentOffset) > maxOffset){
                    offsetL = -maxOffset - startOffset + (maxOffset + currentOffset) * 0.05
                }else {
                    offsetL = currentOffset + startOffset
                }
            }

            addressDom.style.webkitTransition = "-webkit-transform 0s ease-out";
            addressDom.style.webkitTransform = "translate3d("+offsetL+"px,0,0)";
        }
        var endHandler = function(event) {
            addressDom.style.webkitTransition = "-webkit-transform 0.2s ease-out"
            startOffset = offsetL = Math.abs(offsetL) > maxOffset/2 ? -maxOffset : 0;
            addressDom.style.webkitTransform = "translate3d("+offsetL+"px,0,0)";

        }

        addressDom.addEventListener('touchstart',startHandler,false);
        addressDom.addEventListener('touchmove',moveHandler,false);
        addressDom.addEventListener('touchend',endHandler,false);
    }
}

export default AddressItem;
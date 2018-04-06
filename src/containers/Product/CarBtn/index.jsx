import React,{Component} from 'react'
import {connect} from 'react-redux'
import {showHandle} from '../../../reduxs/shop.redux'
import './style.css'

@connect(
    state => state.shop,
    {showHandle}
)
class CarBtn extends  Component {

    constructor(props) {
        super(props)
        this.carShowHandle = this.carShowHandle.bind(this)
    }
    render() {
        const count = this.totalCount();
        return <div className="car-btn"
                onClick={this.carShowHandle}
        >{count}</div>

    }
    carShowHandle() {
        this.props.showHandle(!this.props.show)
    }
    totalCount() {
        let count = 0;

        this.props.list.forEach(item => {
            count += item.count;
        })

        return count;
    }

}

export default CarBtn
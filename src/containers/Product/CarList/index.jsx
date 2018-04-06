import React,{Component} from 'react'
import {connect} from  'react-redux'
import ProductHandle from '../List/ProductHandle'
import {showHandle,changeCarHandle,clearHandle} from '../../../reduxs/shop.redux'
import {getImage} from '../../../util'

import './style.css'

@connect(
    state => state.shop,
    {changeCarHandle,clearHandle}
)
class CarList extends Component {

    constructor(props) {
        super(props)
        this.handleAction = this.handleAction.bind(this)
    }
    render() {

        const totalPrice = this.calcTotalPrice();

        return (
            <div key='car-content' className="car-content">
                <header className="car-header">
                    <h3>购物车</h3>
                    <button onClick={()=>{this.props.clearHandle()}}>清除</button>
                </header>
                <section className="car-list">
                    <ul>
                        {
                            this.props.list.length > 0

                                ? this.props.list.map((item) => {
                                return (
                                    <li key={item._id} className="car-product-item">
                                        <div className="pic">
                                            <img src={getImage(item.image_paths[0])} />
                                        </div>
                                        <div className="price">
                                            {item.count * item.price}
                                        </div>
                                        <ProductHandle product={item} handleAction={this.handleAction} />
                                    </li>
                                )
                            })
                                : null
                        }
                    </ul>
                </section>
                <footer className="car-footer">
                    <div className="total-price">总积分：{totalPrice}</div>
                    <div className="settle"><button>结算</button></div>
                </footer>
            </div>
        )

    }
    calcTotalPrice() {
        let totalPrice = 0;
        this.props.list.forEach(item => {
            totalPrice += (item.count * item.price);
        })
        return totalPrice;
    }

    handleAction(product,num) { //

        const count = product.count || 0;

        if(count+num > product.total) {
            console.log('超过库存')
        }else if(product.count+num < 0) {
        }else {
            this.props.changeCarHandle(product,num)
        }

    }
}

export default CarList
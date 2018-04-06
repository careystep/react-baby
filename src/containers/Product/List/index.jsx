import React,{Component} from 'react';
import {connect} from 'react-redux'
import ProductHandle from './ProductHandle'
import {changeCarHandle,getProducts} from '../../../reduxs/shop.redux'
import {getImage} from '../../../util'

import './style.css'
@connect(
    state => state.shop,
    {changeCarHandle,getProducts}
)
class ProductList extends Component {
    constructor(props) {
        super(props);
        this.handleAction = this.handleAction.bind(this);
    }
    componentDidMount() {

        this.props.getProducts();
    }
    render() {
        return (
            <ul className="product-list-cont">
                {

                    this.props.products.length > 0
                    ? this.props.products.map((item) => {
                        return (
                            <li className="item-cont" key={item._id}>
                                <div className="pic">
                                    <img src={getImage(item.image_paths[0])} />
                                </div>
                                <div className="detail">
                                    <h3 className="title">{item.name}</h3>
                                    <p className="desc">{item.description}</p>
                                    <div className="info">
                                        <span>积分：<strong>{item.price}</strong></span>
                                        <span>评分：<strong>{item.rating}</strong></span>
                                        <span>库存：<strong>{item.total}</strong></span>
                                    </div>
                                    <div className="handle">
                                        <ProductHandle handleAction={this.handleAction} product={item} />
                                    </div>
                                </div>
                            </li>
                        )
                    })
                    : null
                }
            </ul>
        )
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

ProductList.defaultProps = {
    isLoading: false,
    list: [],
    products: []
}

export default ProductList;
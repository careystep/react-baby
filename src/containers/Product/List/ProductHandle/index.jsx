import React,{Component} from 'react'
import './style.css'

class ProductHandle extends Component {

    render() {
        return (
            <div className="product-handle">
                <span className="reduce" onClick={()=>{this.props.handleAction(this.props.product,-1)}}>-</span>
                <span>{this.props.product.count || 0}</span>
                <span className="add" onClick={()=>{this.props.handleAction(this.props.product,1)}}>+</span>
            </div>
        )
    }

}

export default ProductHandle
import React,{ Component } from 'react';
import {connect} from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {showHandle} from '../../reduxs/shop.redux'
import List from './List'
import CarBtn from './CarBtn'
import CarList from './CarList'

import './style.css'

@connect(
    state => state,
    {showHandle}
)
class App extends Component {

    constructor(props,context){
        super(props,context);
        this.state = {
            list: []
        }
    }
    render() {

        return (
            <div>
                <List />
                <CarBtn/>
                <ReactCSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    {
                        this.props.shop.show ?
                            (
                                <div key='car-visibility' className="car-visibility"
                                     onClick={()=>{this.props.showHandle(false)}}
                                />
                            ) : null
                    }
                </ReactCSSTransitionGroup>
                <ReactCSSTransitionGroup
                    transitionName="slide"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    {
                        this.props.shop.show ?
                            (
                                <CarList/>
                            ) : null
                    }
                </ReactCSSTransitionGroup>



            </div>
        )
    }

}

export default App;
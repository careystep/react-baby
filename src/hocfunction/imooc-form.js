
import React,{Component} from 'react';

export function imoocForm (Comp) {

     class WrapperComp extends Component {

        constructor(props,content){
            super(props,content);
            this.handleChange = this.handleChange.bind(this);
            this.state = {};
        }
        handleChange(key,value) {
            this.setState({[key]:value});
        }
        render() {
            return <Comp state={this.state} handleChange={this.handleChange} {...this.props}></Comp>
        }

    }

    return WrapperComp;
}
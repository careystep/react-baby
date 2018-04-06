import React,{Component} from 'react';
import { ImagePicker } from 'antd-mobile'
import {getImage} from '../../util'
import './style.css'

class AvatarSelector extends Component{

    constructor(props,context){
        super(props,context);
        this.state = {
            files: [],
            multiple: false,
        }
    }
    componentDidMount() {
        this.setState({files:[...this.state.files,{url:getImage(this.props.avatar),id:Date.now()}]})
    }
    render(){

        return(
            <div className="user-info avatar-top">
                <ImagePicker
                    files={this.state.files}
                    onChange={this.onChange}
                    selectable={this.state.files.length < 1}
                    multiple={this.state.multiple}
                />
            </div>
        )
    }
    onChange = (files, type, index) => {
        this.setState({
            files
        });
        this.props.selectAvatar(files);
    }


}

export default AvatarSelector;
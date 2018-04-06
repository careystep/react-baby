import React,{ Component } from 'react';
import {NavBar,InputItem,TextareaItem,Button,WhiteSpace} from 'antd-mobile'
import { ImagePicker } from 'antd-mobile'
import services from '../../../../fetch'

class UploadBaby extends Component {

    constructor(props,context){
        super(props,context);
        this.uploadHandle = this.uploadHandle.bind(this)
        this.onImagePickerChange = this.onImagePickerChange.bind(this)
        this.state = {
            name:'',
            description:'',
            price:'',
            total:'',
            image_paths:[],
            is_loading: false,
            picker_data:{
                files: [],
                multiple: false
            }
        }
    }

    render() {

        return (
            <div>
                <NavBar>上传宝贝</NavBar>

                <InputItem
                    value={this.state.name}
                    onChange={(val)=>{this.handleChange('name',val)}}
                >名称</InputItem>
                <InputItem
                    value={this.state.price}
                    onChange={(val)=>{this.handleChange('price',val)}}
                >价格</InputItem>
                <InputItem
                    value={this.state.total}
                    onChange={(val)=>{this.handleChange('total',val)}}
                >库存</InputItem>
                <TextareaItem
                    onChange={(val)=>{this.handleChange('description',val)}}
                    value={this.state.description}
                    title="介绍"
                    rows={3}
                    autoHeight
                ></TextareaItem>
                <ImagePicker
                    files={this.state.picker_data.files}
                    onChange={this.onImagePickerChange}
                    selectable={this.state.picker_data.files.length < 4}
                    multiple={this.state.picker_data.multiple}
                ></ImagePicker>
                <WhiteSpace/>
                <WhiteSpace/>
                <Button type="primary" loading={this.state.is_loading} onClick={this.uploadHandle} >发布</Button>
            </div>
        )
    }
    handleChange(key,value) {
        this.setState({[key]:value})
    }
    async onImagePickerChange(files) {

        this.setState({
            picker_data:{...this.state.picker_data,files:files}
        });
    }
    async uploadHandle() {

        if(this.state.is_loading){
            return;
        }
        let param = new FormData()  // 创建form对象
        param.append('name', this.state.name)  // 通过append向form对象添加数据
        param.append('description', this.state.description)
        param.append('price', this.state.price)
        param.append('total', this.state.total)

        this.state.picker_data.files.forEach((file,idx)=>{
            param.append('file'+idx, file.file)
        })
        this.setState({is_loading:true});
        const res = await services.insertProduct({
            header: {'Content-Type': 'multipart/form-data'},
            data:param
        })
        this.setState({is_loading:false});
        if(res.code === 1){
            console.log(res.msg);
        }else {
            this.props.history.push('/product');
        }

    }

}

export default UploadBaby;
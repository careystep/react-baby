import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import Authroute from '../components/Authroute'
import Login from '../containers/Login'
import Register from '../containers/Register'
import UserInfo from '../containers/UserInfo'
import UploadBaby from '../containers/UploadBaby'
import Address from '../containers/Address'
import AddressEdit from '../containers/Address/subpage/AddressEdit'
import UploadProduct from '../containers/Product/subpage/UploadProduct'
import Comments from '../containers/Baby/subpage/Comments'
import App from '../containers/App'


class RouterMap extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Authroute></Authroute>
                    <Switch>
                        <Route  path="/login" component={Login} />
                        <Route  path="/register" component={Register} />
                        <Route  path="/userinfo" component={UserInfo} />
                        <Route  path="/uploadbaby" component={UploadBaby} />
                        <Route  path="/uploadproduct" component={UploadProduct} />
                        <Route  path="/address" component={Address} />
                        <Route  path="/address_edit" component={AddressEdit} />
                        <Route  path="/comments/:baby_id" component={Comments} />
                        <Route  path="/" component={App} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }

}

export default RouterMap;
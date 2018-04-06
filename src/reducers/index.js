
import { combineReducers } from 'redux'
import { userReducer } from '../reduxs/user.redux'
import { shopReducer } from '../reduxs/shop.redux.js'
const rootReducer = combineReducers({
    user:userReducer,
    shop:shopReducer
});

export default rootReducer;
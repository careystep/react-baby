import { createStore , applyMiddleware, compose} from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState
        , compose(
            applyMiddleware(thunk), //中间件
            window.devToolsExtension?window.devToolsExtension():f=>f        // 触发 redux-devtools
        )
    );
    return store
}
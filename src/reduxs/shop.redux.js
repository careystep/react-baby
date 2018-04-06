import services from '../fetch'

const BASIC_HANDLE = 'BASIC_HANDLE'
const RESET_PRODUCT_LIST = 'RESET_PRODUCT_LIST';
const PRODUCT_LIST = 'PRODUCT_LIST';
const CHANGE_CAR = 'CHANGE_CAR';
const CLEAR_SHOP = 'CLEAR_SHOP'

const initState = {
    show: false,
    products: [],
    list: []
}

export function shopReducer(state=initState,action) {
    switch (action.type) {
        case RESET_PRODUCT_LIST:
            return {...state,products:[...resetProductsBefore(action.payload,state.list)]}
        case PRODUCT_LIST:
            return {...state,products:[...state.products,...action.payload]}
        case BASIC_HANDLE:
            return {...state,...action.payload}
        case CHANGE_CAR:
            return {...state,list:changeCarBefore(state.list,action.payload),products:changeProductBefore(state.products,action.payload)}
        case CLEAR_SHOP:
            return {...state,list:[],products:clearBefore(state.products)}
        default:
            return state
    }
}

function resetProductsBefore(products,cars){
    const data = products.map(item => {
        const filterProducts = cars.filter(carItem => {
            return carItem._id === item._id
        })
        if(filterProducts.length > 0){
            return {...item,count: filterProducts[0].count}
        }else {
            return item;
        }
    })
    return data;
}
export function clearHandle(){
    return {
        type: CLEAR_SHOP,
        payload:{}
    }
}
function clearBefore(data) {
    data.forEach(item => {
        item.count = 0
    })
    return [...data]
}
function changeProductBefore(data,payload) {
    data.forEach(item => {
        if(item._id === payload.product._id) {
            item.count = item.count ? item.count + payload.num : 0 + payload.num ;
        }
    })
    return [...data];
}
function changeCarBefore(data,payload) {
    let flag = false;
    data.forEach(item => {
        if(item._id === payload.product._id) {
            item.count = item.count + payload.num;
            flag = true
        }
    })

    if(!flag) {
        return [...data,{...payload.product,count: 1}];
    }else{
        return data.filter(item => {
            return item.count > 0
        });
    }
}

function productsHandle(data) {
    return {
        type: PRODUCT_LIST,
        payload: data
    }
}
function resetProductsHandle(data) {
    return {
        type: RESET_PRODUCT_LIST,
        payload: data
    }
}
export function getProducts(pageNum) {
    return async (dispatch) => {
        const res = await services.getShopProduct()
        if(pageNum){
            dispatch(productsHandle(res.data))
        }else{
            dispatch(resetProductsHandle(res.data))
        }

    }
}

export function changeCarHandle(product,num) {
    return {
        type: CHANGE_CAR,
        payload: {product,num}
    }
}


export function showHandle(show) {
    return {
        type: BASIC_HANDLE,
        payload: {show}
    }
}


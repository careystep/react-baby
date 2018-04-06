import fetch from './fetch';

var services = {
    updateAvatar: data => fetch('/user/updateAvatar', data),
    getUserInfo: data => fetch('/user/getUserInfo', data),
    insertbaby: data => fetch('/user/insertbaby', data),
    getBabyList: data => fetch('/user/getBabyList', data),
    likeToBaby: data => fetch('/user/likeToBaby', data),
    addComment: data => fetch('/user/addComment', data),
    getComments: data => fetch('/user/getComments', data),
    insertProduct: data => fetch('/shop/insertProduct', data),
    getShopProduct: data => fetch('/shop/getShopProduct', data)
}

export default services;
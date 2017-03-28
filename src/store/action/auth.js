export function signin (user){
    return{
type:'signin',
value:user

    }

}

export function CreateStore(user){
    return{
        type:'createStore',
        value:user
    }
}

export function CreateProduct(user){
    return{
        type:'createProduct',
        value:user
    }
}

export function ViewStocks(user){
    return{
        type:'viewStocks',
        value:user
    }
}

export function ViewSales(user){
    type:'viewSales'
    value:user

}
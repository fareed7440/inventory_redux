const INITIALSTATE = {
    storeData:[],
    productData:[],
    viewPurchaseData:[],
    viewSalesData:[]
};

const MainReducer = (state= INITIALSTATE,action)=>{
    switch(action.type){
        case 'addStore':
        return Object.assign(state,{storeData:action.value})
    
case 'addproduct':
return Object.assign(state,{productData:action.value})

case'viewPurchaseData':
return Object.assign(state,{viewPurchaseData:action.value})

case 'viewSalesData':
return Object.assign(state,{viewSalesData:action.value})

}
return state

}

export default MainReducer
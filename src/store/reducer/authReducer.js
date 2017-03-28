const INITIALSTATE ={
    isloggin : false
}


const AuthReducer=(state = INITIALSTATE, action)=>{
switch(action.type){
    case 'signin':
    return Object.assign(state,{user: action.value , isloggin:true})

    
}
return state
}

export default AuthReducer;
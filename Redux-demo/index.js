// console.log("from index.js")
const redux=require('redux');
const reduxLogger=require('redux-logger');
const createStore=redux.createStore
const combineReducers=redux.combineReducers
const logger=reduxLogger.createLogger()
const applyMiddleware=redux.applyMiddleware
const BUY_CAKE='BUY_CAKE';
const BUY_ICECREAMS='BUY_ICECREAMS';
function buyCake(){
    return(
        {
            type:BUY_CAKE,
            info:'First reduc action'
        }
    )
}
function buyIcereams(){
    return(
        {
            type:BUY_ICECREAMS,
           
        }
    )
}

// const initialState={
//     numOfCakes:10,
//     numOfIcecreams:20
// }

const initialCakeState={
    numOfCakes:10,
    
}
const initialIceCreamState={
    numOfIcecreams:20
}
// const reducer =(state=initialState,action)=>{
//     switch(action.type){
//         case BUY_CAKE:return{
//             ...state,
//             numOfCakes:state.numOfCakes-1
//         }
//         case BUY_ICECREAMS:return{
//             ...state,
//             numOfIcecreams:state.numOfIcecreams-1
//         }
//         default :return state

//     }

// }
const cakeReducer =(state=initialCakeState,action)=>{
    switch(action.type){
        case BUY_CAKE:return{
            ...state,
            numOfCakes:state.numOfCakes-1
        }
        default :return state

    }

}
const IceCreamReducer =(state=initialIceCreamState,action)=>{
    switch(action.type){
       
        case BUY_ICECREAMS:return{
            ...state,
            numOfIcecreams:state.numOfIcecreams-1
        }
        default :return state

    }

}
const rootReducer=combineReducers({
    cake:cakeReducer,
    iceCream:IceCreamReducer
})
const store=createStore(rootReducer,applyMiddleware(logger));
console.log('initial state',store.getState());
//const unsubscribe= store.subscribe(()=>console.log('update state',store.getState()));
const unsubscribe= store.subscribe(()=>{});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcereams());
store.dispatch(buyIcereams());
unsubscribe();
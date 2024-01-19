export const initialState={
    basket:[],
    user:null
}

export const getBasketTotal=(basket)=>
     basket?.reduce((amount,item)=>item.price+amount,0);


const reducer=(state ,action)=>{
    //console.log(action.type === "ADD_TO_BASKET")
switch(action.type)
{
    case "ADD_TO_BASKET":
        return {
            ...state,
            basket:[...state.basket,action.item],
        };
    case "REMOVE_FROM_BASKET":
        const index=state.basket.findIndex((item)=>{return item.id===action.id});

       
        if(index>=0){
            let newBasket=[...state.basket];
            newBasket.splice(index,1);
            return {
                ...state,
                basket:newBasket
            }

        }
        else{
             console.warn(`Cant remove product (id:${action.id})`)
             break;
        }
    case "SET_USER":
        return {
            ...state,
            user:action.user
        }

    case "SIGN_OUT":
        return {
            ...state,
            user:null
        }
    case 'EMPTY_BASKET':
        return {
            ...state,
            basket:[]
        }
         
    default:
        return state;
}
};

export default reducer;
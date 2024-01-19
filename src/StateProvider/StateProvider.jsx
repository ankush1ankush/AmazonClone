import React ,{createContext,useContext,useReducer} from "react"


// Prepare the dataLayer

export const StateContext=createContext();

export const StateProvider=({children,initialState,reducer})=>(
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue=()=>useContext(StateContext); 
// useStateValue will return what ever we pass to the datalayer which is 
//what we pass in the value parameter to the SateContext.provider since 
//we Provided the useReducer as the parameter to the value so useContext will return the 
// array to two thing on is the state and other is the dispatch function.
                                                                       


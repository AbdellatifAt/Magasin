import { createContext  , useReducer , useEffect } from "react";

export const EtagesContext = createContext() 

export const  etagesReducer = (state , action) =>{
    switch(action.type){
        case 'SET_ETAGES' :
            return { etages : action.payload}
        case 'CREATE_ETAGE':
            return  {etages : [ ...state.etages , action.payload ]}
        case 'UPDATE_ETAGE':

            const updatedItemIndex = state.etages.findIndex(item => item._id === action.payload._id);
        
            if (updatedItemIndex !== -1) {
                const updatedItems = [...state.etages];
                updatedItems[updatedItemIndex] = action.payload;
                return { etages: updatedItems };
            } 

        case 'DELETE_ETAGE':
            const filteredItems = state.etages.filter(item => item._id !== action.payload);
            return { etages: filteredItems };
        default : 
            return state 

    }
}

export const EtagesContextProvider = ({children})=>{
    const [state  , dispatch] = useReducer(etagesReducer , {
        etages :  []
    })

   

    return(
        <EtagesContext.Provider value={{...state , dispatch}}>
            {children}
        </EtagesContext.Provider>
    )
}


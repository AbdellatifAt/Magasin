import { createContext  , useReducer , useEffect } from "react";

export const DepotsContext = createContext() 

export const  depotsReducer = (state , action) =>{
    switch(action.type){
        case 'SET_DEPOTS' :
            return { depots : action.payload}
        case 'CREATE_DEPOT':
            return  {depots : [...state.depots ,action.payload ]}
        case 'UPDATE_DEPOT':

            const updatedDepotIndex = state.depots.findIndex(pub => pub._id === action.payload._id);
        
            if (updatedDepotIndex !== -1) {
                const updatedDepots = [...state.depots];
                updatedDepots[updatedDepotIndex] = action.payload;
                return { depots: updatedDepots };
            } 

        case 'DELETE_DEPOT':
            const filteredDepots = state.depots.filter(item => item._id !== action.payload);
            return { depots: filteredDepots };
        default : 
            return state 

    }
}

export const DepotsContextProvider = ({children})=>{
    const [state  , dispatch] = useReducer(depotsReducer , {
        depots :  []
    })

   

    return(
        <DepotsContext.Provider value={{...state , dispatch}}>
            {children}
        </DepotsContext.Provider>
    )
}


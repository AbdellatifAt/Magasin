import { createContext  , useReducer , useEffect } from "react";

export const CellulesContext = createContext() 

export const cellulesReducer = (state , action) =>{
    switch(action.type){
        case 'SET_CELLULES' :
            return { cellules : action.payload}
        case 'CREATE_CELLULE':
            return  {cellules : [ ...state.cellules , action.payload ]}
        case 'UPDATE_CELLULE':

            const updatedItemIndex = state.cellules.findIndex(item => item._id === action.payload._id);
        
            if (updatedItemIndex !== -1) {
                const updatedItems = [...state.cellules];
                updatedItems[updatedItemIndex] = action.payload;
                return { cellules: updatedItems };
            } 

        case 'DELETE_CELLULE':
            const filteredItems = state.cellules.filter(item => item._id !== action.payload);
            return { cellules: filteredItems };
        default : 
            return state 

    }
}


export const CellulesContextProvider = ({children})=>{
    const [state  , dispatch] = useReducer(cellulesReducer , {
        cellules :  []
    })

   

    return(
        <CellulesContext.Provider value={{...state , dispatch}}>
            {children}
        </CellulesContext.Provider>
    )
}


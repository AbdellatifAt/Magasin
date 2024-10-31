import { createContext  , useReducer , useEffect } from "react";

export const RayonsContext = createContext() 

export const  rayonsReducer = (state , action) =>{
    switch(action.type){
        case 'SET_RAYONS' :
            return { rayons : action.payload}
        case 'CREATE_RAYON':
            return  {rayons : [ ...state.rayons , action.payload ]}
        case 'UPDATE_RAYON':

            const updatedRayonIndex = state.rayons.findIndex(pub => pub._id === action.payload._id);
        
            if (updatedRayonIndex !== -1) {
                const updatedRayons = [...state.rayons];
                updatedRayons[updatedRayonIndex] = action.payload;
                return { rayons: updatedRayons };
            } 

        case 'DELETE_RAYON':
            const filteredRayons = state.rayons.filter(item => item._id !== action.payload);
            return { rayons: filteredRayons };
        default : 
            return state 

    }
}

export const RayonsContextProvider = ({children})=>{
    const [state  , dispatch] = useReducer(rayonsReducer , {
        rayons :  []
    })

   

    return(
        <RayonsContext.Provider value={{...state , dispatch}}>
            {children}
        </RayonsContext.Provider>
    )
}


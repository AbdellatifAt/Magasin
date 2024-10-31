import { createContext  , useReducer , useEffect } from "react";

export const BreadCrumbsContext = createContext() 

export const breadcrumbsReducer = (state , action) =>{
    switch(action.type){
        case 'SET_BREADCRUMBS' :
            return { breadcrumbs : action.payload}

            case 'CREATE_BREADCRUMB': {
                if (action.payload) {
                    const filteredBreadcrumbs = state.breadcrumbs.filter(
                        breadcrumb => breadcrumb.label === action.payload.label
                    );
            
                    const filteredBreadcrumbs_2 = state.breadcrumbs.filter(
                        breadcrumb => breadcrumb.label !== action.payload.label
                    );
            
                    if (action.payload.id < state.breadcrumbs.length) {
                        return {
                            breadcrumbs: state.breadcrumbs.slice(0, action.payload.id - 1)
                        };
                    }
            
                    // Condition to replace the existing breadcrumb with the new one if their ids are equal
                    const updatedBreadcrumbs = state.breadcrumbs.map(breadcrumb =>
                        breadcrumb.id === action.payload.id ? action.payload : breadcrumb
                    );
            
                    // Check if the breadcrumb with the same id was found and replaced
                    const isReplaced = state.breadcrumbs.some(breadcrumb => breadcrumb.id === action.payload.id);
            
                    if (isReplaced) {
                        return {
                            breadcrumbs: updatedBreadcrumbs
                        };
                    }
            
                    if (filteredBreadcrumbs.length !== 0) {
                        return state;
                    } else {
                        return {
                            breadcrumbs: [...filteredBreadcrumbs_2, action.payload]
                        };
                    }
                }else{
                    return {
                        breadcrumbs: []
                    };
                }
                return state;
            }
            
            
        // case 'UPDATE_BREADCRUMB':

        //     const updatedItemIndex = state.breadcrumbs.findIndex(item => item._id === action.payload._id);
        
        //     if (updatedItemIndex !== -1) {
        //         const updatedItems = [...state.breadcrumbs];
        //         updatedItems[updatedItemIndex] = action.payload;
        //         return { breadcrumbs: updatedItems };
        //     } 

        // case 'DELETE_BREADCRUMB':
        //     const filteredItems = state.breadcrumbs.filter(item => item._id !== action.payload);
        //     return { breadcrumbs: filteredItems };
        default : 
            return state 

    }
}


export const BreadCrumbsContextProvider = ({children})=>{
    const [state  , dispatch] = useReducer(breadcrumbsReducer , {
        breadcrumbs :  []
    })

   

    return(
        <BreadCrumbsContext.Provider value={{...state , dispatch}}>
            {children}
        </BreadCrumbsContext.Provider>
    )
}


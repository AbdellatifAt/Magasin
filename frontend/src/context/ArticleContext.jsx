import { createContext  , useReducer , useEffect } from "react";

export const ArticlesContext = createContext() 

export const articlesReducer = (state , action) =>{
    switch(action.type){
        case 'SET_ARTICLES' :
            return { articles : action.payload}
        case 'CREATE_ARTICLE':
            return  {articles : [action.payload  , ...state.articles ]}
        case 'UPDATE_ARTICLE':

            const updatedItemIndex = state.articles.findIndex(item => item._id === action.payload._id);
        
            if (updatedItemIndex !== -1) {
                const updatedItems = [...state.articles];
                updatedItems[updatedItemIndex] = action.payload;
                return { articles: updatedItems };
            } 

        case 'DELETE_ARTICLE':
            const filteredItems = state.articles.filter(item => item._id !== action.payload);
            return { articles: filteredItems };
        default : 
            return state 

    }
}


export const ArticlesContextProvider = ({children})=>{
    const [state  , dispatch] = useReducer(articlesReducer , {
        articles :  []
    })

   

    return(
        <ArticlesContext.Provider value={{...state , dispatch}}>
            {children}
        </ArticlesContext.Provider>
    )
}


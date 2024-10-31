import { createContext, useReducer } from "react";

// Create the context
export const RecherchesContext = createContext();

// Reducer function
export const recherchesReducer = (state, action) => {
    switch(action.type) {
        case 'SET_RECHERCHES':
            return { recherches: action.payload };
        default:
            return state;
    }
};

// Context Provider Component
export const RecherchesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(recherchesReducer, {
        recherches: []
    });

    // Optional: Add any side effects or initial data fetching with useEffect here

    return (
        <RecherchesContext.Provider value={{ ...state, dispatch }}>
            {children}
        </RecherchesContext.Provider>
    );
};

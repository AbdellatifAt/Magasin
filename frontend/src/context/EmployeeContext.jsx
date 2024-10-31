import { createContext  , useReducer , useEffect } from "react";

export const EmployeesContext = createContext() 

export const  employeesReducer = (state , action) =>{
    switch(action.type){
        case 'SET_EMPLOYEES' :
            return { employees : action.payload}
        case 'CREATE_EMPLOYEE':
            return  {employees : [action.payload , ...state.employees]}
        case 'UPDATE_EMPLOYEE':

            const updatedEmployeeIndex = state.employees.findIndex(element => element._id === action.payload._id);
        
            if (updatedEmployeeIndex !== -1) {
                const updatedEmployees = [...state.employees];
                updatedEmployees[updatedEmployeeIndex] = action.payload;
                return { employees: updatedEmployees };
            } 

        case 'DELETE_EMPLOYEE':
            const filteredEmployees = state.employees.filter(item => item._id !== action.payload);
            return { employees: filteredEmployees };
        default : 
            return state 

    }
}

export const EmployeesContextProvider = ({children})=>{
    const [state  , dispatch] = useReducer(employeesReducer , {
        employees :  []
    })

   

    return(
        <EmployeesContext.Provider value={{...state , dispatch}}>
            {children}
        </EmployeesContext.Provider>
    )
}


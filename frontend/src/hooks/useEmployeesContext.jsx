
import { EmployeesContext } from "../context/EmployeeContext";
import { useContext } from "react";

export const useEmployeesContext = ()=>{
    const context = useContext(EmployeesContext)
    
    if (!context){
        throw Error('useContext must be used inside an EmployeeProvider')
    }
    
    return context
}
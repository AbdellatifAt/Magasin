import { BreadCrumbsContext } from "../context/BreadCrumbContext";
import { useContext } from "react";

export const useBreadCrumbsContext = ()=>{
    const context = useContext(BreadCrumbsContext)
    
    if (!context){
        throw Error('useContext must be used inside an BreadCrumbProvider')
    }

    return context
}


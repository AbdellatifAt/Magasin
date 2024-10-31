
import { DepotsContext } from "../context/DepotContext";
import { useContext } from "react";

export const useDepotsContext = ()=>{
    const context = useContext(DepotsContext)
    
    if (!context){
        throw Error('useContext must be used inside an DepotProvider')
    }
    
    return context
}
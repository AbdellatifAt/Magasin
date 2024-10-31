import { RayonsContext } from "../context/RayonContext";

import { useContext } from "react";

export const useRayonsContext = ()=>{
    const context = useContext(RayonsContext)
    
    if (!context){
        throw Error('useContext must be used inside an RayonProvider')
    }
    
    return context
}
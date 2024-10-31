import { EtagesContext } from "../context/EtageContext";
import { useContext } from "react";

export const useEtagesContext = ()=>{
    const context = useContext(EtagesContext)
    
    if (!context){
        throw Error('useContext must be used inside an EtageProvider')
    }
    
    return context
}
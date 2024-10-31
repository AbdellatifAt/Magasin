import { RecherchesContext } from "../context/rechercheContext";
import { useContext } from "react";

export const useRecherchesContext = ()=>{
    const context = useContext(RecherchesContext)
    
    if (!context){
        throw Error('useContext must be used inside an RechercheProvider')
    }
        
    return context
}

import  {CellulesContext} from "../context/CelluleContext"
import { useContext } from "react";

export const useCellulesContext = ()=>{
    const context = useContext(CellulesContext)
    
    if (!context){
        throw Error('useContext must be used inside an CelluleProvider')
    }
    
    return context
}
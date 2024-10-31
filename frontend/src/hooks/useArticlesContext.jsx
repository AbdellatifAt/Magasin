import { ArticlesContext } from "../context/ArticleContext";
import { useContext } from "react";

export const useArticlesContext = ()=>{
    const context = useContext(ArticlesContext)
    
    if (!context){
        throw Error('useContext must be used inside an ArticleProvider')
    }
        
    return context
}
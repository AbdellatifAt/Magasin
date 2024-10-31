import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { API_BACKEND } from "../API/api";
import { Navigate } from "react-router-dom";

import { useNotificationContext } from '../hooks/useNotificationContext'


export const useLogin = ()=>{
    const [error , setError] = useState(null)
    const [isLoading , setIsLoading] =useState(null)
    const {dispatch} = useAuthContext()
    const { showNotification } = useNotificationContext();
    
    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
    
        const response = await fetch(API_BACKEND + '/login', {
            method: 'POST',
            headers: { "Content-type": 'application/json' },
            body: JSON.stringify({ email, password })
        });
    
        const json = await response.json();
    
        if (!response.ok) {
            setIsLoading(false);
            setError("");
            showNotification("Email or password incorrect" , "error")
        }
    
        if (response.ok) {
           
    
            // Save the user to local storage
            localStorage.setItem('user_magasin', JSON.stringify(json));
            dispatch({ type: 'LOGIN', payload: json });
    
            setIsLoading(false);
    
            return <Navigate to="/" />;
        }
    };
    

    return {login , isLoading , error}
}
import React, { useEffect, useState } from 'react'

import image from "../../public/images/depot1.jpg"
import { useLogin } from '../hooks/useLogin'


const Login = () => {
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [rememberMe , setRememberMe] = useState(true)
    
    const {login , isLoading , error} = useLogin()

 


    // forget password
    const [isForgetModal , setIsForgetModal] = useState(false)
    const [emailForgot , setEmailForgot] = useState('')
    const [codeForgot , setCodeForgot] = useState('')
    const [newPasswordForgot , setNewPasswordForgot] = useState('')
    const [verifyEmailForm , setVerifyEmailForm] = useState(false)
    const [verifyCodeForm , setVerifyCodeForm] = useState(false)
    const [verifyNewPasswordForm , setVerifyNewPasswordForm] = useState(false)
    const [errorForgetPassword , setErrorForgetPassword ] = useState('')

    useEffect (()=>{
        const emailLocal = localStorage.getItem('email_magasin');
        const passwordLocal = localStorage.getItem('password_magasin') 
        if(emailLocal , passwordLocal){
            setEmail(emailLocal)
            setPassword(passwordLocal)
        }
        
    }, [])
      
    
      const handleChangeEmail = (e)=>{
        setEmail(e.target.value)
      }
    
      const handeleChangePasswoed = (e)=>{
          setPassword(e.target.value)
      }
    
      const rememberMeChange = (e)=>{
        setRememberMe(e.target.checked);
    }
    
    // login 
    
    const handleSubmitLogin = async(e)=>{
      e.preventDefault()
    
      await login(email , password)
    
      if(rememberMe){
        localStorage.setItem("email_magasin", email);
        localStorage.setItem("password_magasin" , password)
      }else{
          localStorage.setItem("email_magasin", "");
          localStorage.setItem("password_magasin" , "")
      }
    
    }
    
    
    // forget Password 
    
    
    const toggleModalForgot = ()=>{
      setIsForgetModal(false)
    }
    
    
    
    const changeEmailForgot = (e)=>{
      setEmailForgot(e.target.value)
    }
    
    const changeCodeForgot = (e)=>{
      setCodeForgot(e.target.value)
    }
    
    
    const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    };
    
    const changeNewPasswordForgot = (e)=>{
    setNewPasswordForgot(e.target.value)
    }
    
    const handleForgetModel = ()=>{
      setIsForgetModal(true)
      setVerifyEmailForm(true)
      setVerifyCodeForm(false)
      setVerifyNewPasswordForm(false)
      setErrorForgetPassword("")
    }
    
    // send formulaire forget 
    const handleForgotPassword = async (e)=>{
      e.preventDefault()
    
      // verifier si email existe et envoyer email vers utilisateur 
      const response =await fetch( API_BACKEND +'/api/email/forgetpassword/veryexistMail', {
          method : 'POST' , 
          headers : {"Content-type" : 'application/json'},
          body: JSON.stringify({ email : emailForgot})
    
      })
    
      const json = await response.json()
    
     if(response.ok){
    
          if(json){
              setVerifyEmailForm(false)
              setVerifyCodeForm(true)
              setErrorForgetPassword("")
          }else{
            setErrorForgetPassword("email Incorrect")
          }
    
     }else{
      setErrorForgetPassword("email Incorrect")
     }
    
      
    }
    
    const handleForgotCode = async (e)=>{
      e.preventDefault()
    
      const response =await fetch( API_BACKEND +'/api/email/verify', {
          method : 'POST' , 
          headers : {"Content-type" : 'application/json'},
          body: JSON.stringify({ email : emailForgot , code : codeForgot})
    
      })
    
      const json = await response.json()
    
     if(response.ok){
    
          if(json){
              setVerifyCodeForm(false)
              setVerifyNewPasswordForm(true)
          }else{
              setErrorForgetPassword("code Incorrect")
          }
    
     }else{
      setErrorForgetPassword("code incorrect")
     }
    
    
    
    }
    
    const handleForgotNewPassword = async(e)=>{
      e.preventDefault()
    
      const response =await fetch( API_BACKEND +'/api/forgetpassword', {
          method : 'POST' , 
          headers : {"Content-type" : 'application/json'},
          body: JSON.stringify({ email : emailForgot , password : newPasswordForgot})
    
      })
    
      const json = await response.json()
    
      if(response.ok){
    
           if(json){
               setIsForgetModal(false)
           }else{
               setErrorForgetPassword("error Password ")
           }
    
      }else{
       setErrorForgetPassword(json.error)
      }
    
    }

    






    

  return (
    <div className="flex flex-col md:flex-row h-[100vh]">
    <div className="w-full bg-gray-100 md:w-1/2 flex flex-col items-center justify-center">
    

    
      <div className="max-w-md w-full p-6">
          <h1 className="text-3xl font-semibold mb-6 text-black text-center">LOGIN</h1>

            {error && <div className='text-red-500 text-center' >{error}</div> }
          <form method="POST" onSubmit={handleSubmitLogin} className="space-y-4">
          
              <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="text" name="email" id="email"  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"  value={email} onChange={handleChangeEmail}/> 
                
                </div>
              <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input  type="password" name="password" id="password"   className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" value={password} onChange={handeleChangePasswoed} /> 
              </div>

              <div className="mb-3 form-check">
                <input type="checkbox" name="remember" className="form-check-input" id="remember" checked={rememberMe} onChange={rememberMeChange}  />
                <label className="form-check-label" htmlFor="remember">Remember Me</label>
              </div>



              <div>
                  <button type="submit" className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Sign Up</button>
              </div>
          </form>
                
          <div className='mt-3'>
                    <a onClick={handleForgetModel}  className="text-sm text-blue-700 dark:text-blue-400 hover:underline">Forgot Password?</a>
          </div>

          
      </div>
    </div>


    <div className=" flex items-center justify-center flex-1 bg-white text-black">
        <div className="h-full w-full">
            <img className="h-full w-full" src={image} alt="" />
        </div>
    </div>
</div>

  )
}

export default Login
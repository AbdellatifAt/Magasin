import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useRayonsContext } from '../../hooks/useRayonsContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNotificationContext } from '../../hooks/useNotificationContext';
import { API_BACKEND } from '../../API/api';
import NavBarEmployee from '../../components/NavBarEmployee';
import BreadCrumb from '../../components/BreadCrumb';

import { FiEdit } from "react-icons/fi";
import NavBarAdmin from '../../components/NavBarAdmin';

const GestionRayon = ({flagAdmin = true}) => {
    const { name , titre  } = useParams();
    const {rayons ,dispatch } = useRayonsContext()
    const { user } = useAuthContext()
    // notification 
    const { showNotification } = useNotificationContext();
  
    const [rayon , setRayon] = useState('')
  
    const [isActionAdd , setIsActionAdd] = useState(true)
  
    const [idUpdateRayon , setIdUpdateRayon] =useState(null)
    const [idDeleteRayon , setIdDeleteRayon] = useState(null)
  
    // modal
    const [isModaleDelete , setIsModaleDelete] = useState(false)
  
    useEffect(()=>{
      const fetchRayons = async ()=>{
          const response = await fetch(API_BACKEND +'/rayon/'+ name , {
              headers :{"Authorization" : `Bearer ${user.token}`}
          })
  
          const json = await response.json()
  
          if(response.ok){
               dispatch({type : 'SET_RAYONS' , payload : json.data})
              
          }
  
      }
  
      fetchRayons()
  
  } , [])



  const toggleModalDelete = ()=>{
    setIsModaleDelete(!isModaleDelete)
    
    
  }
  
  
  
  const handeleChangeRayon = (e)=>{
    setRayon(e.target.value)
  }
  
  
  const handlechnageAction = (name , id)=>{
    setIsActionAdd(false)
    setRayon(name)
  
    setIdUpdateRayon(id)
  }
  
   // ajouter Rayon
   const handleSubmitRayon = async(e)=>{
    e.preventDefault()
  
  
    const data = {
        name: rayon ,
        depot : name

    };
  
  
    const response =await fetch( API_BACKEND+ '/rayon/add', {
        method : 'POST' , 
        headers : {
            "Authorization" : `Bearer ${user.token}`,            
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
  
    })
  
  
  
    const json = await response.json()
  
    if(!response.ok){
        
        console.log(json.error)
        showNotification(json.error , "error")
    }
    
    if(response.ok){
  
        dispatch({type : 'CREATE_RAYON' , payload : json})
        setRayon('')
        showNotification("L'opération réussie : élément ajouté avec succès !" , "success")
  
    }
  
  }
  
  
    // edit Rayon 
  
    const handleSubmitUpdateRayon = async (e)=>{
      e.preventDefault()
  
    
  
      const data = {
          name: rayon 
          
      };
  
      const response =await fetch( API_BACKEND+ `/rayon/edit/${idUpdateRayon}`, {
          method : 'PUT' , 
          headers : {
              "Authorization" : `Bearer ${user.token}`,            
              "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
  
      })
  
  
  
      const json = await response.json()
  
      if(!response.ok){
          
          console.log(json.error)
          showNotification(json.error , "error")
  
      }
      
      if(response.ok){
        
          dispatch({type : 'UPDATE_RAYON' , payload : json})
  
          setIsActionAdd(true)
          setRayon('')
          showNotification("L'opération a réussi : élément modifié avec succès !" , "success")
  
  
      }
  }
  
  
   // delete Item 
   const deleteItem = (id)=>{
    setIsModaleDelete(true)
    setIdDeleteRayon(id)
  }
  
  
  const handleDeleteRayonSubmit = async(e)=>{
    e.preventDefault();
    try{
  
      const response = await fetch( API_BACKEND+ "/rayon/delete/"+ idDeleteRayon ,{
        method : 'DELETE' , 
        
        headers : {
            "Authorization" : `Bearer ${user.token}`,
            "Content-type" : 'application/json'
        },
       
      })
      
      const res = await response.json() 
      if(response.ok){
        dispatch({type : 'DELETE_RAYON' , payload : res.id})
        setIsModaleDelete(false)
        showNotification("Suppression effectuée avec succès !" , "success")
        
      }else{
        showNotification(res.error , "error")
      }
  
  }catch(error){
    console.log("error" , error);
  }
  
  }
  return (
    <>



    {flagAdmin &&  <BreadCrumb navigations={{id : 2 , label : titre  , lien : "/depots/"+name + "/" + titre}} titre={titre}   /> }
    {!flagAdmin &&  <BreadCrumb navigations={{id : 2 , label : titre  , lien : "/visiteur/depots/"+name + "/" + titre}} titre={titre}   />}
  
    <div className="p-4 sm:ml-64 ">
        
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 bg-white min-h-96">

            {flagAdmin && 
                <>

                    {isActionAdd &&  
                        <section className="text-gray-600 body-font">

                            <form id="add-service-form" onSubmit={handleSubmitRayon} method="POST">
                
                                <div className="container mx-auto">
                            
                                    <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                                    <div className="relative flex-grow w-full">
                                    
                                        <input type="text" id="full-name" placeholder="Ajouter Rayon" name="name_service" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-teal-500 focus:bg-transparent focus:ring-2 focus:ring-teal-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"  value={rayon} onChange={handeleChangeRayon}/>
                                    </div>
                                    
                                    <button type="submit" className="text-white bg-teal-500 border-0 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg">Ajouter</button>
                                    </div>
                                </div>
                
                            </form>
                
                        </section>
        
                    }

                    {!isActionAdd &&  
                        <section className="text-gray-600 body-font">

                            <form id="add-service-form" onSubmit={handleSubmitUpdateRayon}  method="POST">
                
                                <div className="container mx-auto">
                            
                                    <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                                    <div className="relative flex-grow w-full">
                                    
                                        <input type="text" id="full-name" placeholder="Modifier Rayon" name="name_service" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-teal-500 focus:bg-transparent focus:ring-2 focus:ring-teal-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"  value={rayon} onChange={handeleChangeRayon}/>
                                    </div>
                                    
                                    <button type="submit" className="text-white bg-teal-500 border-0 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg">Modifier</button>
                                    </div>
                                </div>
                
                            </form>
                
                        </section>
        
                    }
                
                
                </>
            }

           

      
            
        <section>

        <section className="text-gray-600 body-font ">
            <div   className="container px-2 py-3 mx-auto">
            <div id="service-container"  className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
            

            { rayons &&  rayons.map((item, index) => (
                    <div key={index} className="p-2 sm:w-1/2 w-full">
                        <div className="bg-white border border-teal-300 rounded flex p-4 h-full items-center justify-between">
                        <div className="flex items-center">
                            <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            className="text-teal-500 w-6 h-6 flex-shrink-0 mr-4"
                            viewBox="0 0 24 24"
                            >
                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                            <path d="M22 4L12 14.01l-3-3"></path>
                            </svg>
                            <span className="title-font font-medium">
                                {flagAdmin &&   <Link to={'/rayons/' + item._id + "/"+ item.name}>{item.name}</Link>}
                                {!flagAdmin &&   <Link to={'/visiteur/rayons/' + item._id + "/"+ item.name}>{item.name}</Link>}
                           
                            </span>
                        </div>
                        {flagAdmin && 
                            <div className="btns_actions">
                                <button
                                className="text-red-600"
                                onClick={() => deleteItem(item._id)}
                                >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                    />
                                </svg>
                                </button>
                                <button className="text-blue-600 ml-2">
                                <FiEdit
                                    onClick={() => handlechnageAction(item.name, item._id)}
                                    className="w-6 h-6"
                                />
                                </button>
                            </div>
                        }
                       
                        </div>
                    </div>
            ))}

              
            </div>
            
            </div>
        </section>


        </section>
            
        </div>
    </div>

      {/* <!-- modal Delete --> */}
      {isModaleDelete &&   
    <div id="modal_delete" className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
     
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
   
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Supprimer</h3>
                        <div className="mt-2">
                        <p className="text-sm text-gray-500">Voulez-vous vraiment ? Veuillez confirmer pour continuer.</p>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        
                        <button onClick={handleDeleteRayonSubmit} id="btn-delete-element-modal" type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Supprime</button>
                        <button onClick={toggleModalDelete} id="btn-close-modal-delete" type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Annuler</button>

                    
                
                </div>
                </div>
            </div>
        </div>
    </div>
    }

    </>
  )
}

export default GestionRayon
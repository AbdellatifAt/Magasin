import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../components/BreadCrumb'

import { API_BACKEND } from '../../API/api';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useRecherchesContext } from '../../hooks/useRecherchesContext';

const Recherche = () => {
    const { user } = useAuthContext() 
    const {recherches , dispatch  } = useRecherchesContext()

    const [search , setSearch] = useState("")
    const [filterData , setFilterDate] = useState([])


    useEffect(()=>{

        console.log(user);
        

        const fetchData = async ()=>{
            const response = await fetch(API_BACKEND +'/cellule/article/recherche' , {
                headers :{"Authorization" : `Bearer ${user.token}`}
            })

            const json = await response.json()            
    
            if(response.ok){
                //  dispatch({type : 'SET_ARTICLES' , payload : json.data})
                //  setFilterDate(json.data);

                console.log(json.data);
                dispatch({type : 'SET_RECHERCHES' , payload : json.data})
                setFilterDate(json.data
                )
                 
            }else{
                console.log("errrr");
                
            }
    
        }

        fetchData()
    
    } , [])

    useEffect(()=>{

            const result = recherches.filter((element)=>{
                return JSON.stringify(element)
                .toLowerCase()
                .indexOf(search.toLowerCase()) !== -1
               
              });
              setFilterDate(result)       
    

      
      } , [search , recherches ])

  return (
    <>
    
        <BreadCrumb navigations={{id : 1 , label : "Recherche" , lien : "/recherche" }} titre='Recherche' />
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 bg-white" >
     
                <form className="max-w-md mx-auto">   
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                            <input type="search" id="default-search" className=" outline-none block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required  value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                </form>

                <section className="text-gray-600 body-font min-h-96">
                <div className="container px-5 py-2 mx-auto">
                
                    <div className="flex flex-wrap -m-2 ">
                        
                        {filterData.map((item) => (
                        <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={item.article._id}>
                        <div className="h-full flex flex-col justify-between border-teal-500 border p-4 rounded-lg">
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-medium">
                                    <span className="text-black">Réference :</span> {item.article.ref}
                                </h2>
                                <p className="text-gray-500">
                                    <span className="text-black">Désignation :</span> {item.article.designation}
                                </p>
                                <p className="text-gray-500">
                                    <span className="text-black">Quantite :</span> {item.article.qte}
                                </p>

                                <p className="text-gray-500">
                                    <span className="text-black">Depot :</span> {item.depot.name}
                                </p>

                                <p className="text-gray-500">
                                    <span className="text-black">Rayon :</span> {item.rayon.name}
                                </p>

                                <p className="text-gray-500">
                                    <span className="text-black">Etage :</span> Etage  {item.etage.numero}
                                </p>

                                <p className="text-gray-500">
                                    <span className="text-black">Cellule :</span> Cellule  {item.cellule.numero}
                                </p>

                            </div>
                            
                        </div>
                    </div>
                    
                        ))}
                    </div>
                    
                </div>
                </section>

            </div>
        </div>
        
        
    </>
   
  )
}

export default Recherche
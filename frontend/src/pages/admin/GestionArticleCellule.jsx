import React, { useEffect, useState } from 'react'

import { useArticlesContext } from '../../hooks/useArticlesContext';
import { IoAddCircleSharp } from "react-icons/io5";
import SimpleSelectComponent from '../../components/SimpleSelectComponent';
import { API_BACKEND } from '../../API/api';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useParams } from 'react-router-dom';
import { useNotificationContext } from '../../hooks/useNotificationContext';

import BreadCrumb from '../../components/BreadCrumb';

import { RiDeleteBinLine } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";


const GestionArticleCellule = ({flagAdmin = true}) => {

    const [cellule , setCellule] = useState('')
    const [isPlein , setIsPlein] = useState(false)
    const { name , titre } = useParams();
    const [qte , setQte] = useState('')
    // models 
    const [isModalAddUpdateOpen , setIsModalAddUpdateOpen] = useState(false)
    const [isModaleDelete , setIsModaleDelete] = useState(false)
    const [formuleAjoute , setFormuleAjoute] =useState(false)
    // search 
    const [search , setSearch] = useState("")
    const [filterData , setFilterDate] = useState([])

    // notification 
     
    const { showNotification } = useNotificationContext();

    const { user } = useAuthContext() 
    const {articles , dispatch : dispatchArticle } = useArticlesContext()

    // error 
    const [errorDelete ,  setErrorDelete] = useState("")
    const [ errorUpdate , setErrorUpdate] = useState("")
    const [ errorAdd , setErrorAdd] = useState("")

    const [idUpdateArticleCellule , setIdUpdateArticleCellule] =useState(null)
    const [idDeleteArticleCellule , setIdDeleteArticleCellule] = useState(null)


    // toogles 

    const toggleModalUpdateAdd = () => {
        setIsModalAddUpdateOpen(!isModalAddUpdateOpen);
        setFormuleAjoute(false)
    };

    const toggleModalDelete = ()=>{
        setIsModaleDelete(!isModaleDelete)       
    }

    const handleChangeQte = (e)=>{
        setQte(e.target.value)
    }

    const handelChangeIsPlain =(e)=>{
        setIsPlein(!isPlein)
    }
    
    // ------------------------  select ---------------------- 
    const [selectedOption, setSelectedOption] = useState(null);
    const [depotsOptions , setDepotsOptions] = useState ([])

  
    
      const handleSelectionChange = (selected) => {
        setSelectedOption(selected);

        
      };

    // --------------------- end select ----------------------- 

    useEffect(()=>{

        const fetchCellule = async ()=>{
            const response = await fetch(API_BACKEND +'/cellule/get/'+ name , {
                headers :{"Authorization" : `Bearer ${user.token}`}
            })

            const json = await response.json()            
    
            if(response.ok){
               setCellule(json.data)
               setIsPlein(json.data.estPlain)
               setFilterDate(json.data.articles)
            }
    
        }

        fetchCellule()


        const fetchArticles = async ()=>{
            const response = await fetch(API_BACKEND +'/article' , {
                headers :{"Authorization" : `Bearer ${user.token}`}
            })

            const json = await response.json()            
    
            if(response.ok){
                dispatchArticle({type : 'SET_ARTICLES' , payload : json.data})                 
            }
    
        }

        fetchArticles()
    
    } , [])


    
    useEffect(()=>{

        if(cellule){
            const result = cellule.articles.filter((element)=>{
                return JSON.stringify(element)
                .toLowerCase()
                .indexOf(search.toLowerCase()) !== -1
               
              });
              setFilterDate(result)
        }
    
  
       
      
      } , [search , cellule ])


    
    // ajouter item 
    const AjouterItem = async ()=>{
        setErrorAdd("")
        setQte("")
         
        setSelectedOption(null)
       
        setIsModalAddUpdateOpen(true)
        setFormuleAjoute(true)

        const options = await articles.map(item => ({
            value: item._id,
            label: item.ref.trim()
        }));

        setDepotsOptions(options)
    }

    const handleAddArticleToCelluleSubmit = async (e) => {
    e.preventDefault();

    const data = {
        celluleId : name, 
        qte , 
        articleId : selectedOption.value

    };

    

    try {
        const response = await fetch(`${API_BACKEND}/cellule/addArticle`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${user.token}`,
                "Content-type": 'application/json'
            },
            body: JSON.stringify(data)
        });

        const json = await response.json();

        if (!response.ok) {
            setErrorAdd(json.error);
            showNotification(json.error , "error")
        } else {
            //dispatch({ type: 'CREATE_EMPLOYEE', payload: json.data});

            
            setCellule(json.data);
            
            
            setIsModalAddUpdateOpen(false);
            setFormuleAjoute(false)

            setErrorAdd("");
            setQte("");

            setSelectedOption(null)
            showNotification("L'opération réussie : élément ajouté avec succès !" , "success")

            
        }
    } catch (error) {
        console.error('Error adding employee:', error);
        setErrorAdd('Failed to add employee.');
    }
    };


   

    const handelUpdatePleinCellule = async(e)=>{

        const data = {
            _id : cellule._id, 
            estPlain : !isPlein
            
        };

       
        
    
        try {
            const response = await fetch(`${API_BACKEND}/cellule//update/status/isplein`, {
                method: 'put',
                headers: {
                    "Authorization": `Bearer ${user.token}`,
                    "Content-type": 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            const json = await response.json();

            
    
            if (!response.ok) {
                showNotification(json.error , "error")

                
            } else {                
    
                setCellule(json.data)

                // showNotification("L'opération a réussi : élément modifié avec succès !" , "success")
            }
        } catch (error) {
            console.error('Error updating employee:', error);
            setErrorAdd('Failed to update employee.');
        }
        
    }


     // delete Item 
    const deleteItem = (id)=>{
        setIsModaleDelete(true)
        setIdDeleteArticleCellule(id)
    }


    const handleDeleteArticleCelluleSubmit = async(e)=>{
        e.preventDefault();

        const data = {
            celluleId :cellule._id ,
            articleId : idDeleteArticleCellule,
        }        
        
        try{
    
            const response = await fetch( API_BACKEND+ "/cellule/deleteArticle" ,{
            method : 'DELETE' , 
            headers : {
                "Authorization" : `Bearer ${user.token}`,
                "Content-type" : 'application/json'
            },
            body: JSON.stringify(data)
            
            })
            
            const res = await response.json() 
            if(response.ok){
            //dispatchArticle({type : 'DELETE_ARTICLE' , payload : res.id})

            setCellule(res.data)
            setIsModaleDelete(false)
            showNotification("Suppression effectuée avec succès !" , "success")
            
            }else{
            //setErrorDelete(res.error)
            console.log(res.error)
            showNotification(res.error , "error")
            }
    
        }catch(error){
        console.log("error" , error);
        }
    
    }


    // update quantité article in cellule 

    const modifierItem = (item)=>{
        console.log(item);


        setSelectedOption({
            value: item.article._id,
            label:item.article.ref
        })
        
        setIsModalAddUpdateOpen(true)
        setFormuleAjoute(false)

        setIdUpdateArticleCellule(item._id)
        setQte(item.qte)
      }



const handleUpdateArticleInCelluleSubmit = async(e)=>{
    e.preventDefault();

    const data = {
        celluleId : cellule._id, 
        articleId : idUpdateArticleCellule,
        qte : qte ,

    };

    

    try {
        const response = await fetch(`${API_BACKEND}/cellule/updateArticle`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${user.token}`,
                "Content-type": 'application/json'
            },
            body: JSON.stringify(data)
        });

        const json = await response.json();

        if (!response.ok) {
            setErrorAdd(json.error);
            showNotification(json.error , "error")
        } else {

            setIsModalAddUpdateOpen(false);
            setFormuleAjoute(false)
            setErrorAdd("");
            setSelectedOption(null)
            setCellule(json.data)
            showNotification("L'opération a réussi : élément modifié avec succès !" , "success")
        }
    } catch (error) {
        console.error('Error updating :', error);
        setErrorAdd('Failed to update .');
    }

}


  return (
    <>

      
            
    {flagAdmin &&  <BreadCrumb navigations={{id : 5 , label : "Cellule " + titre , lien : "/cellules/"+name  + "/"+ titre}} titre={"Cellule " + titre} /> }
    {!flagAdmin &&  <BreadCrumb navigations={{id : 5 , label : "Cellule " + titre , lien : "/visiteur/cellules/"+name  + "/"+ titre}} titre={"Cellule " + titre} /> }
    
    

<div className="p-4 sm:ml-64">
    
    <div className="p-4 border-2 border-gray-100 bg-white border-solid rounded-lg dark:border-gray-700">

        <div className='mb-8'>
            <div className='flex justify-between'>

            <input type="text" id="search" className="outline-none max-w-md  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500" placeholder="Search Her" value={search} onChange={(e) => setSearch(e.target.value)}        />
                
               {flagAdmin && 
               
                    
                    <div className='flex'>
                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" onClick={handelUpdatePleinCellule} checked= {isPlein}  className="sr-only peer" onChange={handelChangeIsPlain} />
                            <div className="relative w-11 h-6 bg-gray-200   dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                        </label>

                        <IoAddCircleSharp onClick={AjouterItem}  className='w-9 h-9  text-teal-500 hover:text-teal-700 cursor-pointer mr-3' />
                    
                    </div>
               } 
               
            </div>
        </div>
        
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
                               <span className="text-black">Quantite :</span> {item.qte}
                           </p>
                       </div>
                       <div className="flex justify-end  mt-2">
                           
                          
                           <FaEdit  onClick={() => modifierItem(item)}   className='w-7 h-7  text-blue-500 hover:text-blue-700 cursor-pointer' />
                           <RiDeleteBinLine  onClick={() => deleteItem(item._id)}   className='w-7 h-7  text-red-500 hover:text-red-700 cursor-pointer mr-3' />
                       </div>
                   </div>
               </div>
               
                ))}
            </div>
            
        </div>
    </section>

    </div>
</div>


 {/* ajouter && update  */}
{isModalAddUpdateOpen && (
            <div id="crud-modal" tabIndex="2" aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden">
                    <div className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {formuleAjoute ? " Ajoutre Article" : "Modifier Article"}
                               
                            </h3>
                            <button onClick={toggleModalUpdateAdd} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {errorAdd && <div className='text-red-700 text-center mt-2'>{errorAdd}</div>}
                       

                            <form className="p-4 md:p-5 overflow-y-auto max-h-[75vh]" onSubmit={formuleAjoute ? handleAddArticleToCelluleSubmit : handleUpdateArticleInCelluleSubmit}  encType="multipart/form-data">
                                                            
                            <div className="grid gap-4 mb-4 grid-cols-2">

                                <div className="col-span-2">
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Article</label>
                                    <SimpleSelectComponent
                                        options={depotsOptions}
                                        selectedOption={selectedOption}
                                        onSelectionChange={handleSelectionChange}
                                        readOnly={!formuleAjoute}
                                    />
                                </div>   
                                
                                <div className="col-span-2">
                                    <label htmlFor="nom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantité</label>
                                    <input type="number" name="qte" required id="qte" className="bg-gray-50 border border-blue-500 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 outline-none" onChange={handleChangeQte} value={qte} />
                                </div>

                            </div>



                            <div className='mt-5 flex justify-center'>
                            <button type="submit" className=" text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {formuleAjoute ? 'Ajouter' : 'Modifier'}
                            </button>
                            </div>
                            </form>

                     
                      
                    </div>
                </div>
        
)}

{/* endd ajouter && update  */}

    {/* detete Item */}
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
                            
                            <button onClick={handleDeleteArticleCelluleSubmit} id="btn-delete-element-modal" type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Supprime</button>
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

export default GestionArticleCellule
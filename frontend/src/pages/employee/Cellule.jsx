import React, { useEffect, useState } from 'react'

import { useArticlesContext } from '../../hooks/useArticlesContext';
import { IoAddCircleSharp } from "react-icons/io5";
import SimpleSelectComponent from '../../components/SimpleSelectComponent';
import { API_BACKEND } from '../../API/api';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useParams } from 'react-router-dom';
import { useNotificationContext } from '../../hooks/useNotificationContext';
import NavBarEmployee from '../../components/NavBarEmployee';
import BreadCrumb from '../../components/BreadCrumb';

const Cellule = () => {
    const [cellule , setCellule] = useState('')
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
               console.log("cellule" , json.data);

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

                 //console.log(json.data);
                 
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

        const options = await articles.map(depot => ({
            value: depot._id,
            label: depot.ref.trim() // .trim() pour enlever les espaces en trop
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

    console.log(data);
    

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


    // Update item 
    const modifierItem =async (id)=>{
        // const employee = employees.filter(element=> element._id === id)[0]
        // setErrorUpdate("")
        // setName(employee.fname)
        // setPrenom(employee.lname)
        // setPassword("")
        // setEmail(employee.email)     
       
        // setIsModalAddUpdateOpen(true)
        // setFormuleAjoute(false)

        // setIdUpdateEMployee(id)

        // const options = await depots.map(depot => ({
        //     value: depot._id,
        //     label: depot.name.trim() // .trim() pour enlever les espaces en trop
        // }));

        // setDepotsOptions(options)

       

        // setSelectedOption(options.filter(item => item.value === employee.depot._id ))
       
    }

    const handleUpdateArticleToCelluleSubmit = async(e)=>{
        e.preventDefault();

        // const data = {
        //     fname : name, 
        //     email, 
        //     lname : prenom, 
        //     password,
        //     type: 1 ,
        //     depot : selectedOption
            
        // };
    
        // try {
        //     const response = await fetch(`${API_BACKEND}/user/${idUpdateEmployee}`, {
        //         method: 'PUT',
        //         headers: {
        //             "Authorization": `Bearer ${user.token}`,
        //             "Content-type": 'application/json'
        //         },
        //         body: JSON.stringify(data)
        //     });
    
        //     const json = await response.json();
    
        //     if (!response.ok) {
        //         setErrorAdd(json.error);
        //         showNotification(json.error , "error")
        //     } else {
        //         dispatch({ type: 'UPDATE_EMPLOYEE', payload: json.data});
    
        //         setIsModalAddUpdateOpen(false);
        //         setFormuleAjoute(false)
    
        //         setErrorAdd("");
        //         setName("");
        //         setPrenom("");
        //         setPassword("");
        //         setEmail("");
        //         setSelectedOption(null)
        //         showNotification("L'opération a réussi : élément modifié avec succès !" , "success")
        //     }
        // } catch (error) {
        //     console.error('Error updating employee:', error);
        //     setErrorAdd('Failed to update employee.');
        // }
    
    }

  return (
    <>

      
            
           

            <BreadCrumb navigations={{id : 4 , label : "Cellule " + titre , lien : "/employee/cellule/"+name  + "/"+ titre}} titre={"Cellule " + titre} />
            
       
        <div className="p-4 sm:ml-64">
            
            <div className="p-4 border-2 border-gray-100 bg-white border-solid rounded-lg dark:border-gray-700">

                <div className='mb-8'>
                    <div className='flex justify-between'>

                    <input type="text" id="search" className="outline-none max-w-md  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500" placeholder="Search Her" value={search} onChange={(e) => setSearch(e.target.value)}        />
                        
                        <IoAddCircleSharp onClick={AjouterItem}  className='w-9 h-9  text-teal-500 hover:text-teal-700 cursor-pointer mr-3' />
                    </div>
                </div>
                
            <section className="text-gray-600 body-font min-h-96">
                <div className="container px-5 py-2 mx-auto">
                
                    <div className="flex flex-wrap -m-2 ">
                           
                        {filterData.map((item) => (
                            <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={item.article._id}>
                                <div className="h-full flex items-center border-teal-500 border p-4 rounded-lg">
                                <div className="flex-grow">
                                    <h2 className="text-gray-900 title-font font-medium"> <span className='text-black'>réference :</span> {item.article.ref}</h2>
                                    <p className="text-gray-500"> <span className='text-black'>Désignation :</span> {item.article.designation}</p>
                                    <p className="text-gray-500"><span className='text-black'>Quantite :</span>{item.qte}</p>
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
                               

                                    <form className="p-4 md:p-5 overflow-y-auto max-h-[75vh]" onSubmit={formuleAjoute ? handleAddArticleToCelluleSubmit : handleUpdateArticleToCelluleSubmit}  encType="multipart/form-data">
                                                                    
                                    <div className="grid gap-4 mb-4 grid-cols-2">

                                        <div className="col-span-2">
                                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Depot</label>
                                            <SimpleSelectComponent
                                                options={depotsOptions}
                                                selectedOption={selectedOption}
                                                onSelectionChange={handleSelectionChange}
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

    </>
    
  )
}

export default Cellule
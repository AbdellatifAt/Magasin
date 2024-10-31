import React, { useEffect, useState } from 'react'

import TableData from '../../components/TableData'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useEmployeesContext } from '../../hooks/useEmployeesContext'

// icons 
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiShowAlt } from "react-icons/bi"
import { API_BACKEND } from '../../API/api';
import NavBarAdmin from '../../components/NavBarAdmin';

import SimpleSelectComponent from '../../components/SimpleSelectComponent';
import { useDepotsContext } from '../../hooks/useDepotsContext';
import { useNotificationContext } from '../../hooks/useNotificationContext';
import BreadCrumb from '../../components/BreadCrumb';


const GestionEmployee = () => {
    const { user } = useAuthContext()
    const {employees ,dispatch } = useEmployeesContext()
    const {depots , dispatch : dispatchDepot  } = useDepotsContext()

    // notification 
    const { showNotification } = useNotificationContext();
    
    const [name , setName] = useState("")
    const [prenom , setPrenom] = useState("")
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState('') 

   


    // models 
    const [isModalAddUpdateOpen , setIsModalAddUpdateOpen] = useState(false)
    const [isModaleDelete , setIsModaleDelete] = useState(false)
    const [formuleAjoute , setFormuleAjoute] =useState(false)
    

    // error 
    const [errorDelete ,  setErrorDelete] = useState("")
    const [ errorUpdate , setErrorUpdate] = useState("")
    const [ errorAdd , setErrorAdd] = useState("")


    const [idDeleteEmployee , setIdDeleteEMployee] = useState(null)
    const [idUpdateEmployee , setIdUpdateEMployee] = useState(null)
    
    // toogles 

    const toggleModalUpdateAdd = () => {
        setIsModalAddUpdateOpen(!isModalAddUpdateOpen);
        setFormuleAjoute(false)
    };

    const toggleModalDelete = ()=>{
        setIsModaleDelete(!isModaleDelete)       
    }

    // data table 
    const [search , setSearch] = useState("")
    const [filterData , setFilterDate] = useState([])

    // ------------------------  select ---------------------- 
    const [selectedOption, setSelectedOption] = useState(null);
    const [depotsOptions , setDepotsOptions] = useState ([])

    const [selectedOptionTypeUser, setSelectedOptionTypeUser] = useState(null);
    const [typeUserOptions , setTypeUserOptions] = useState ([])

  
    
      const handleSelectionChange = (selected) => {
        setSelectedOption(selected);

        
      };


      const handleSelectionTypeUserChange = (selected) => {
        
        setSelectedOptionTypeUser(selected);

        
      };

    // --------------------- end select ----------------------- 
    const columns = [
       
        {
          name : "Nom",
          selector : (row) => row.fname,
          sortable: true
        },
        {
            name : "Prenom",
            selector : (row) => row.lname,
            sortable: true
        },
       
        {
            name : "email",
            selector : (row) => row.email,
            sortable: true
        },

        {
            name : "depot",
            selector: (row) => row.depot && row.depot.name ? row.depot.name : "",
            sortable: true
        },
       
       
    
        {
          name : "Actions",
          cell : (row) => <div className='flex items-center justify-center'>
                <MdDelete onClick={()=> { deleteItem(row._id )} } className="w-7 h-7 text-red-500 hover:text-red-700 cursor-pointer mr-3" />
                <FaEdit onClick={()=> {modifierItem(row._id)}} className="w-6 h-6 text-blue-500 hover:text-blue-700 cursor-pointer mr-3" />
                <BiShowAlt onClick={()=>{detailsItem(row._id) }}  className="w-6 h-6 text-green-500 hover:text-green-700 cursor-pointer mr-3" />
      
          </div>
        }
      
    ] 


    // end datatable 


    useEffect(()=>{

        const fetchEmployees = async ()=>{
            const response = await fetch(API_BACKEND +'/user' , {
                headers :{"Authorization" : `Bearer ${user.token}`}
            })

            const json = await response.json()            
    
            if(response.ok){
                 dispatch({type : 'SET_EMPLOYEES' , payload : json.data})
                 setFilterDate(json.data)             

                 //console.log(json.data);
                 
            }
    
        }
        const fetchDepots = async ()=>{
            const response = await fetch(API_BACKEND +'/depot' , {
                headers :{"Authorization" : `Bearer ${user.token}`}
            })

            const json = await response.json()
    
            if(response.ok){
                dispatchDepot({type : 'SET_DEPOTS' , payload : json.data})
                
            }
    
        }

       

        fetchDepots()

        fetchEmployees()
    
    } , [])


    useEffect(()=>{
  
        const result = employees.filter((element)=>{
          return JSON.stringify(element)
          .toLowerCase()
          .indexOf(search.toLowerCase()) !== -1
         
        });
      
        setFilterDate(result)
      
      } , [search , employees ])



    const handleChangeName = (e)=>{
        setName(e.target.value)
    }

    const handleChangePrenom = (e)=>{
        setPrenom(e.target.value)
    }

    const handleChangeEmail = (e)=>{
        setEmail(e.target.value)
    }

    const handleChangePassword = (e)=>{
        setPassword(e.target.value)
    }


    // ajouter item 
    const AjouterItem = async ()=>{
        setErrorAdd("")
        setName("")
        setPrenom("")
        setPassword("")
        setEmail("")     
        setSelectedOption(null)
       
        setIsModalAddUpdateOpen(true)
        setFormuleAjoute(true)

        const options = await depots.map(depot => ({
            value: depot._id,
            label: depot.name.trim() // .trim() pour enlever les espaces en trop
        }));

        setDepotsOptions(options)
        setTypeUserOptions([

            {
                value : 1, 
                label : "Employee"
            },
            {
                value : 2, 
                label : "Visiteur"
            }

        ])
    }

    const handleAddEmployeeSubmit = async (e) => {
    e.preventDefault();


    const data = {
        fname : name, 
        email, 
        lname : prenom, 
        password,
        type: selectedOptionTypeUser.value , 
    };

    if (selectedOptionTypeUser.value === 1 ){
        data.depot = selectedOption.value
    }

    try {
        const response = await fetch(`${API_BACKEND}/user/add`, {
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
            dispatch({ type: 'CREATE_EMPLOYEE', payload: json.data});

            setIsModalAddUpdateOpen(false);
            setFormuleAjoute(false)

            setErrorAdd("");
            setName("");
            setPrenom("");
            setPassword("");
            setEmail("");

            setSelectedOption(null)
            showNotification("L'opération réussie : élément ajouté avec succès !" , "success")

            
        }
    } catch (error) {
        console.error('Error adding employee:', error);
        setErrorAdd('Failed to add employee.');
    }
    };

    // delete item 

    const deleteItem = (id)=>{
        setIsModaleDelete(true)
        setIdDeleteEMployee(id)
    }


    const handleDeleteEmployeeSubmit = async(e)=>{
        e.preventDefault();
        try{
    
          const response = await fetch( API_BACKEND+ "/user/delete/"+ idDeleteEmployee ,{
            method : 'DELETE' , 
            
            headers : {
                "Authorization" : `Bearer ${user.token}`,
                "Content-type" : 'application/json'
            },
           
          })
          
          const res = await response.json() 

          
          if(response.ok){
            dispatch({type : 'DELETE_EMPLOYEE' , payload : res.id})
            setIsModaleDelete(false)
            showNotification("Suppression effectuée avec succès !" , "success")
            
            
          }else{
            //setErrorDelete(res.error)
            showNotification(json.error , "error")
          }
    
      }catch(error){
        console.log("error" , error);
      }
    
    }


    // Update item 
    const modifierItem =async (id)=>{
        const employee = employees.filter(element=> element._id === id)[0]
        setErrorUpdate("")
        setName(employee.fname)
        setPrenom(employee.lname)
        setPassword("")
        setEmail(employee.email)     
       
        setIsModalAddUpdateOpen(true)
        setFormuleAjoute(false)

        setIdUpdateEMployee(id)

        const options = await depots.map(depot => ({
            value: depot._id,
            label: depot.name.trim() // .trim() pour enlever les espaces en trop
        }));

        setDepotsOptions(options)    
        
        if(employee && employee.depot){
            setSelectedOption(options.filter(item => item.value === employee.depot._id )[0])
        }
        

        const optionsType = [

            {
                value : 1, 
                label : "Employee"
            },
            {
                value : 2, 
                label : "Visiteur"
            }

        ]

        setTypeUserOptions(optionsType)

        setSelectedOptionTypeUser(optionsType.filter(item => item.value === employee.type)[0])
       
    }

    const handleUpdateEmployeeSubmit = async(e)=>{
        e.preventDefault();

        const data = {
            fname : name, 
            email, 
            lname : prenom, 
            password,
            type: selectedOptionTypeUser.value , 
            
        };


    if (selectedOptionTypeUser.value === 1 ){
        data.depot = selectedOption.value
    }
    
    
        try {
            const response = await fetch(`${API_BACKEND}/user/${idUpdateEmployee}`, {
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
                dispatch({ type: 'UPDATE_EMPLOYEE', payload: json.data});
    
                setIsModalAddUpdateOpen(false);
                setFormuleAjoute(false)
    
                setErrorAdd("");
                setName("");
                setPrenom("");
                setPassword("");
                setEmail("");
                setSelectedOption(null)
                showNotification("L'opération a réussi : élément modifié avec succès !" , "success")
            }
        } catch (error) {
            console.error('Error updating employee:', error);
            setErrorAdd('Failed to update employee.');
        }
    
    }



  return (
    <>

    <BreadCrumb navigations={{id : 1 , label : "Employees" , lien : "/employees" }} titre='Employees' />

    <div className="sm:ml-64">

        
       
        
        <div className="m-4 p-4 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 bg-white">

        
        <TableData 
                    dataTab={filterData} 
                    columns={columns} 
                    title={"List Employees"}  
                    addActions={AjouterItem} 
                    search={search} 
                    setSearch={setSearch}
                    transactions={true}
                    paginationParPag={7}
                />
        </div>
    </div>


    {/* ajouter && update  */}
    {isModalAddUpdateOpen && (
                    <div id="crud-modal" tabIndex="2" aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden">
                            <div className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {formuleAjoute ? " Ajoutre Employee" : "Modifier Employee"}
                                       
                                    </h3>
                                    <button onClick={toggleModalUpdateAdd} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                {errorAdd && <div className='text-red-700 text-center mt-2'>{errorAdd}</div>}
                               

                                    <form className="p-4 md:p-5 overflow-y-auto max-h-[75vh]" onSubmit={formuleAjoute ? handleAddEmployeeSubmit : handleUpdateEmployeeSubmit}  encType="multipart/form-data">
                                                                    
                                    <div className="grid gap-4 mb-4 grid-cols-2">

                                    <div className="col-span-2">
                                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type User</label>
                                            <SimpleSelectComponent
                                                options={typeUserOptions}
                                                selectedOption={selectedOptionTypeUser}
                                                onSelectionChange={handleSelectionTypeUserChange}
                                            />
                                        </div> 

                                        {( selectedOptionTypeUser && selectedOptionTypeUser.value === 1) && 
                                            <div className="col-span-2">
                                                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Depot</label>
                                                <SimpleSelectComponent
                                                    options={depotsOptions}
                                                    selectedOption={selectedOption}
                                                    onSelectionChange={handleSelectionChange}
                                                />
                                            </div>   
                                        }

                                        
                                        
                                        <div className="col-span-2">
                                            <label htmlFor="nom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
                                            <input type="text" name="nom" required id="nom" className="bg-gray-50 border border-blue-500 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 outline-none" onChange={handleChangeName} value={name} />
                                        </div>
                                        
                                        <div className="col-span-2">
                                            <label htmlFor="prenom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prenom</label>
                                            <input type="text" name="prenom" required id="prenom" className="bg-gray-50 border border-blue-500 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 outline-none"  onChange={handleChangePrenom} value={prenom} />
                                        </div>
                                        <div className="col-span-2">
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email</label>
                                            <input type="email" name="email" required id="email" className="bg-gray-50 border border-blue-500 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 outline-none" onChange={handleChangeEmail} value={email} />
                                        </div>
                                        <div className="col-span-2">
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                            <input type="password" name="password" required={formuleAjoute}  id="password" className="bg-gray-50 border border-blue-500 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 outline-none" onChange={handleChangePassword} value={password} />
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
                        
                        <button onClick={handleDeleteEmployeeSubmit} id="btn-delete-element-modal" type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Supprime</button>
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

export default GestionEmployee
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import Home from './pages/admin/Home'
import SidBarAdmin from './components/SidBarAdmin'
import GestionDepot from './pages/admin/GestionDepot'
import GestionEmployee from './pages/admin/GestionEmployee'
import SidBarEmployee from './components/SidBarEmployee'
import HomeEmployee from './pages/employee/HomeEmployee'
import Depot from './pages/employee/Depot'
import Rayon from './pages/employee/Rayon'
import Etage from './pages/employee/Etage'
import Article from './pages/admin/Article'
import Cellule from './pages/employee/Cellule'
import GestionRayon from './pages/admin/GestionRayon'
import GestionEtage from './pages/admin/GestionEtage'
import GestionCellule from './pages/admin/GestionCellule'
import GestionArticleCellule from './pages/admin/GestionArticleCellule'
import HomeVisiteur from './pages/visiteur/HomeVisiteur'
import SidBarVisiteur from './components/SidBarVisiteur'
import NavBarVisiteur from './components/NavBarVisiteur'
import NavBarAdmin from './components/NavBarAdmin'
import Recherche from './pages/admin/Recherche'
import NavBarEmployee from './components/NavBarEmployee'




function App() {

  const { user } = useAuthContext()

  const [currentUrl , setCurrentUrl] = useState('/');
  const [prevUrl , setPrevUrl] = useState('/')
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    setPrevUrl(currentUrl)
    setCurrentUrl(currentPath);
  
}, [currentPath]);


function ChekAdmin ({children}){
  const utilisateur = JSON.parse(localStorage.getItem('user_magasin'));

  if(utilisateur){
    const role = utilisateur.role 

      if(role === 0 ){
        return <>{children}</>
      }else{
        
        return <Navigate to="/employee" />
      }

  }else{
    return  <Navigate to="/login" />
  }
  
}


function ChekEmployee ({children}){
  const utilisateur = JSON.parse(localStorage.getItem('user_magasin'));
 
  if(utilisateur){
    const role = utilisateur.role 

      if(role === 1 ){
        return <>{children}</>
      }else{
        return <Navigate to="/visiteur" />
      }

  }else{
    return  <Navigate to="/login" />
  }
  
}

function ChekVisiteur ({children}){
  const utilisateur = JSON.parse(localStorage.getItem('user_magasin'));
 
  if(utilisateur){
    const role = utilisateur.role 

      if(role === 2 ){
        return <>{children}</>
      }else{
        return <Navigate to="/" />
      }

  }else{
    return  <Navigate to="/login" />
  }
  
}



function CheckLogin ({children}){

    
  if(!user){
    
    return <>{children}</>
  }else{
      return  <Navigate to={"/"} />
    }

  
}

  

  return (
    <>
    {/* {!user &&  <NavBar/>} */}


      <Routes>



            <Route  path='/' element={user ? 
              <ChekAdmin>
                <SidBarAdmin/>
                <NavBarAdmin />
                <Home/>
              
              </ChekAdmin> :  <Navigate to="/login" />} 
            />   

            <Route  path='/depots' element={user ? 
              <ChekAdmin>
                <SidBarAdmin/>
                <NavBarAdmin />
                <GestionDepot/>
              
              </ChekAdmin> :  <Navigate to="/login" />} 
            />    

            <Route  path='/employees' element={user ? 
              <ChekAdmin>
                <SidBarAdmin/>
                <NavBarAdmin />
                <GestionEmployee />
              
              </ChekAdmin> :  <Navigate to="/login" />} 
            />  

             <Route  path='/articles' element={user ? 
              <ChekAdmin>
                <SidBarAdmin/>
                <NavBarAdmin />
                <Article />
              
              </ChekAdmin> :  <Navigate to="/login" />} 
            />
            
            <Route  path='/depots/:name/:titre' element={user ? 
              <ChekAdmin>
                <SidBarAdmin/>
                <NavBarAdmin />
                <GestionRayon/>
              
              </ChekAdmin> :  <Navigate to="/login" />} 
            />    

             <Route  path='/rayons/:name/:titre' element={user ? 
              <ChekAdmin>
                <SidBarAdmin/>
                <NavBarAdmin />
                <GestionEtage/>
              
              </ChekAdmin> :  <Navigate to="/login" />} 
            />  

            <Route  path='/etages/:name/:titre' element={user ? 
              <ChekAdmin>
                <SidBarAdmin/>
                <NavBarAdmin />
                <GestionCellule/>

              
              </ChekAdmin> :  <Navigate to="/login" />} 
            />    

            <Route  path='/cellules/:name/:titre' element={user ? 
              <ChekAdmin>
                <SidBarAdmin/>
                <NavBarAdmin />
                <GestionArticleCellule/>
              
              </ChekAdmin> :  <Navigate to="/login" />} 
            />    

            <Route  path='/recherche' element={user ? 
              <ChekAdmin>
                <SidBarAdmin/>
                <NavBarAdmin />
                <Recherche />
              
              </ChekAdmin> :  <Navigate to="/login" />} 
            /> 




            {/* routes employees */}

            <Route  path='/employee' element={user ? 
              <ChekEmployee>
                <SidBarEmployee/>
                <NavBarEmployee etat={user?.depot?.name || ''} />
                <HomeEmployee/>
                
              
              </ChekEmployee> :  <Navigate to="/login" />} 
            />  


            
            <Route  path='/employee/depot' element={user ? 
              <ChekEmployee>
                <SidBarEmployee/>
                <NavBarEmployee etat={user?.depot?.name || ''} />
                <Depot/>
                
              
              </ChekEmployee> :  <Navigate to="/login" />} 
            />  


            <Route  path='/employee/rayon/:name/:titre' element={user ? 
                <ChekEmployee>
                  <SidBarEmployee/>
                  <NavBarEmployee etat={user?.depot?.name || ''} />
                  <Rayon/>
                
              
              </ChekEmployee> :  <Navigate to="/login" />} 
            />  


            <Route  path='/employee/etage/:name/:titre' element={user ? 
                <ChekEmployee>
                  <SidBarEmployee/>
                  <NavBarEmployee etat={user?.depot?.name || ''} />
                  
                  <Etage/>
                
              
              </ChekEmployee> :  <Navigate to="/login" />} 
            />  

            <Route  path='/employee/cellule/:name/:titre' element={user ? 
                <ChekEmployee>
                  <SidBarEmployee/>
                  <NavBarEmployee etat={user?.depot?.name || ''} />
                  
                  <Cellule/>
                
              
              </ChekEmployee> :  <Navigate to="/login" />} 
            />  

          
            {/* end routes employees */}


            {/* routes visiteur  */}
              <Route  path='/visiteur' element={user ? 
                <ChekVisiteur>
                  <SidBarVisiteur/>
                  <NavBarVisiteur />
                  <HomeVisiteur/>
                  
                
                </ChekVisiteur> :  <Navigate to="/login" />} 
              />  

                <Route  path='/visiteur/depot' element={user ? 
                  <ChekVisiteur>
                    <SidBarVisiteur/>
                    <NavBarVisiteur />
                    <GestionDepot  flagAdmin = {false} />
                    
                  
                  </ChekVisiteur> :  <Navigate to="/login" />} 
                />  



                <Route  path='/visiteur/depots/:name/:titre' element={user ? 
                  <ChekVisiteur>
                    <SidBarVisiteur/>
                    <NavBarVisiteur />
                    <GestionRayon flagAdmin={false}/>
                  
                  </ChekVisiteur> :  <Navigate to="/login" />} 
                />    

             <Route  path='/visiteur/rayons/:name/:titre' element={user ? 
              <ChekVisiteur>
                <SidBarVisiteur/>
                <NavBarVisiteur />
                <GestionEtage flagAdmin={false}/>
              
              </ChekVisiteur> :  <Navigate to="/login" />} 
            />  

            <Route  path='/visiteur/etages/:name/:titre' element={user ? 
              <ChekVisiteur>
                <SidBarVisiteur/>
                <NavBarVisiteur />
                <GestionCellule flagAdmin={false} />

              
              </ChekVisiteur> :  <Navigate to="/login" />} 
            />    

            <Route  path='/visiteur/cellules/:name/:titre' element={user ? 
              <ChekVisiteur>
                <SidBarVisiteur/>
                <NavBarVisiteur />
                <GestionArticleCellule flagAdmin={false} />
              
              </ChekVisiteur> :  <Navigate to="/login" />} 
            />    

            <Route  path='/visiteur/articles' element={user ? 
              <ChekVisiteur>
                <SidBarVisiteur/>
                <NavBarVisiteur />
                <Article flagAdmin={false}/>
              
              </ChekVisiteur> :  <Navigate to="/login" />} 
            />

            <Route  path='/visiteur/recherche' element={user ? 
              <ChekVisiteur>
                <SidBarVisiteur/>
                 <NavBarVisiteur />
                <Recherche />
              
              </ChekVisiteur> :  <Navigate to="/login" />} 
            /> 

              
            {/* end routes visiteur  */}


          
          {/* connection routes */}

          <Route path="/login" element={<CheckLogin><Login /> </CheckLogin>} />
          <Route path="/register" element={!user ? <Register /> :  <Navigate to="/" /> } /> 

      </Routes>



    </>
  )
}

export default App

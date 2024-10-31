import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { DepotsContextProvider } from './context/DepotContext.jsx'
import { EmployeesContextProvider } from './context/EmployeeContext.jsx'
import { RayonsContextProvider } from './context/RayonContext.jsx'
import { EtagesContextProvider } from './context/EtageContext.jsx'
import { CellulesContextProvider } from './context/CelluleContext.jsx'
import { NotificationProvider } from './context/NotificationContext.jsx'
import Notification from './components/Notification.jsx'
import { ArticlesContextProvider } from './context/ArticleContext.jsx'
import { BreadCrumbsContextProvider } from './context/BreadCrumbContext.jsx'
import { RecherchesContextProvider } from './context/rechercheContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
    <AuthContextProvider>
      <DepotsContextProvider>
        <EmployeesContextProvider>
          <RayonsContextProvider>
            <EtagesContextProvider>
              <CellulesContextProvider>
                <NotificationProvider>
                  <ArticlesContextProvider>
                    <BreadCrumbsContextProvider>
                    <RecherchesContextProvider>
                      <App />
                    </RecherchesContextProvider>
                    </BreadCrumbsContextProvider>
                  </ArticlesContextProvider>
                  <Notification/>
                </NotificationProvider>
              </CellulesContextProvider>
            </EtagesContextProvider>
          </RayonsContextProvider>
        </EmployeesContextProvider>
      </DepotsContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
)
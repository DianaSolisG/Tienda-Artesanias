import React, {useEffect, useState} from 'react';
import AuthLayout from 'layouts/AuthLayout';
import PrivateLayout from 'layouts/PrivateLayout';
import PublicLayout from 'layouts/PublicLayout';
import Admin from 'pages/admin/Index';
import Artesanias from 'pages/admin/Artesanias';
import Clientes from 'pages/admin/Clientes';
import Index from 'pages/Index';
import Login from 'pages/Login';
import Registro from 'pages/Registro';
import Usuarios  from 'pages/admin/Usuarios';
import Ventas from 'pages/admin/Ventas';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'styles/styles.css';
import { Auth0Provider } from "@auth0/auth0-react";
import { UserContext } from 'context/userContext';
import { DarkModeContext } from 'context/darkMode';




function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    console.log('modo dark:', darkMode);
  }, [darkMode]);


  return (
    <Auth0Provider
    domain="misiontic-tiendaartesanias.us.auth0.com"
    clientId="cagw9udfStRxY6b6EcnIP4KlIaUe6LfK"
    redirectUri='http://localhost:3000/admin'
    audience='api-autenticacion-tienda-artesanias'
  >
    <div className='App'>
    <UserContext.Provider value={{ userData, setUserData }}>
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <Router>
        <Switch>
          <Route path={['/admin', '/admin/artesanias', '/admin/clientes', '/admin/ventas', '/admin/usuarios']}>
            <PrivateLayout>
              <Switch>
                <Route path='/admin/artesanias'>
                  <Artesanias/>
                </Route>
                <Route path='/admin/ventas'>
                  <Ventas/>
                </Route>
                <Route path='/admin/usuarios'>
                  <Usuarios/>
                </Route>
                <Route path='/'>
                  <Clientes/>
                </Route>
                <Route path='/admin'>
                  <Admin/>
                </Route>
              </Switch>
            </PrivateLayout>
          </Route>
          <Route path={['/login', '/registro']}>
            <AuthLayout>
              <Switch>
                <Route path='/login'>
                  <Login/>
                </Route>
                <Route path='/registro'>
                  <Registro/>
                </Route>
              </Switch>
            </AuthLayout>
          </Route>
          <Route path={['/']}>
            <PublicLayout>
              <Switch>
                <Route path='/index'>
                  <Index/>
                </Route>
              </Switch>
            </PublicLayout>
          </Route>
        </Switch>
      </Router>
      </DarkModeContext.Provider>
    </UserContext.Provider>
    </div>
    </Auth0Provider>
  );
}

export default App;

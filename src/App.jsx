import React from 'react';
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


function App() {

  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path={['/admin', '/admin/artesanias', '/admin/clientes', '/admin/usuarios', '/admin/ventas']}>
            <PrivateLayout>
              <Switch>
                <Route path='/admin/artesanias'>
                  <Artesanias/>
                </Route>
                <Route path='/'>
                  <Usuarios/>
                </Route>
                <Route path='/'>
                  <Ventas/>
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
    </div>
  );
}

export default App;

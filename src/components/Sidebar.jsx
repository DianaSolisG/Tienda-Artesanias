import React from 'react'
import { Link } from 'react-router-dom';
import ImagenLogo from './ImagenLogo';
import { useAuth0 } from "@auth0/auth0-react";

const Sidebar = () => {
    const { user, logout } = useAuth0();

    const cerrarSesion = () => {
        logout({returnTo: 'http://localhost:3000/admin'})
        localStorage.setItem('token', null)
    }
    return (
            <nav className="hindden md:flex md:w-72 border border-gray-300 h-full flex flex-col  bg-white p-4" >
                <Link to='/admin'>
                    <ImagenLogo/>
                </Link>
                <div className='my-4'>
                    <Ruta icono= "fas fa-users" ruta="/admin/perfil" nombre='Perfil' usuario= {user}/>
                    <Ruta icono= "fad fa-hat-cowboy" ruta="/admin/artesanias" nombre='Artesanias'/>
                    <Ruta icono= "fas fa-cash-register" ruta="/admin/vetas" nombre='Ventas'/>
                    <Ruta icono= "fas fa-users" ruta="/admin/usuarios" nombre='Usuarios'/>
                </div>
                <button onClick={() => cerrarSesion }>
                    Cerrar Sesión</button>
            </nav>
    );
};

const Ruta = ({icono, ruta, nombre, usuario}) =>{
    return (
        <Link to={ruta}>
            <button className='p-1 my-2 bg-gray-700 hover:bg-blue-900 flex w-full items-center text-white rounded-md'>
                {usuario ? (
                <>
                /<img src={usuario.picture} className='h-5 w-5 rounded-full' />
                {usuario.nombre}
                </>
                ):(
                <><i className= {`${icono} w-10`} />
                {nombre}
                </>
                )}
            </button>
        </Link>
    )
}


export default Sidebar;

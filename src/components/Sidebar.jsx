import React from 'react'
import { Link } from 'react-router-dom';
import ImagenLogo from './ImagenLogo';

const Sidebar = () => {
    return (
            <nav className="hindden md:flex md:w-72 border border-gray-300 h-full flex flex-col  bg-white p-4" >
                <Link to='/admin'>
                    <ImagenLogo/>
                </Link>
                <div className='my-4'>
                    <Ruta icono= "fas fa-users" ruta="/admin/perfil" nombre='Perfil'/>
                    <Ruta icono= "fad fa-hat-cowboy" ruta="/admin/artesanias" nombre='Artesanias'/>
                    <Ruta icono= "fas fa-cash-register" ruta="/admin/vetas" nombre='Ventas'/>
                    <Ruta icono= "fas fa-users" ruta="/admin/usuarios" nombre='Usuarios'/>
                </div>
                <button>Cerrar Sesión</button>
            </nav>
    );
};

const Ruta = ({icono, ruta, nombre}) =>{
    return (
        <Link to={ruta}>
            <button className='p-1 my-2 bg-gray-700 hover:bg-blue-900 flex w-full items-center text-white rounded-md'>
                <i className= {`${icono} w-10`} />
                {nombre}
            </button>
        </Link>
    )
}

export default Sidebar;

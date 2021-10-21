import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const SidebarREsponsive = () => {
    const [mostrarNavegacion,setMostrarNavegacion] = useState(false)
    return (
        <div 
        className='md:hidden' 
        onClick={()=>{
            setMostrarNavegacion(!mostrarNavegacion)}}
        >
           <i className={`mx-2 fas fa-${mostrarNavegacion?'times' : 'bars'} hover:text-yellow-600`}/>
           {mostrarNavegacion && <ul className= 'bg-gray-900'>
               <ResponsiveRouter nombre="Productos" ruta="/admin/productos"/>
               <ResponsiveRouter nombre="Ventas" ruta="/admin/ventas"/>
               <ResponsiveRouter nombre="Usuarios" ruta="/admin/usuarios"/>
               </ul>}
        </div>
    );
};

const ResponsiveRouter = ({ruta, nombre}) =>{
    return (
    <Link to={ruta}>
        <li className='text-gray-200 border border-gray-300 p-1'>{nombre}</li>
    </Link>
    );
};

export default SidebarREsponsive;

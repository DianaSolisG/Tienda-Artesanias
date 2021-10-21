import React from 'react'
import { Link } from 'react-router-dom';


const Navbar = () => {
    
    return <nav className='bg-blue-700'>
        <ul className='flex w-full justify-between my-3'>
            <li>Logo</li>
            <li>Usuarios</li>
            <li>Ventas</li>
            <li>Productos</li>
            <li className='px=3'>
                <Link to='/login'>
                <button className='pg-indigo-500 p-2 text-white rounded-lg shadow-md hover:bg-indigo-700'>
                    Iniciar Sesión
                </button>
                </Link>
            </li>
        </ul>
    </nav>;
};

export default Navbar;

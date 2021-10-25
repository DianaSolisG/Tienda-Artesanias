import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";


const Navbar = () => {
    const { loginWithRedirect } = useAuth0();
    return <nav className='bg-blue-700'>
        <ul className='flex w-full justify-between my-3'>
            <li>Logo</li>
            <li>Usuarios</li>
            <li>Ventas</li>
            <li>Productos</li>
            <li className='px=3'>
                <button
                onClick={() => loginWithRedirect()}
                className='pg-indigo-500 p-2 text-white rounded-lg shadow-md hover:bg-indigo-700'>
                    Iniciar Sesión
                </button>
            </li>
        </ul>
    </nav>;
};

export default Navbar;


import { obtenerUsuarios } from 'utils/api';
import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { editarUsuario } from 'utils/api';
import PrivateComponent from 'components/PrivateComponent';



const Usuarios = () => {
    const [usuarios, setUsuarios ] = useState([]);

    useEffect(()=>{
        const fetchUsuarios = async ()=>{
            await obtenerUsuarios(
                (respuesta)=>{
                    setUsuarios('usuarios', respuesta.data)
                },
                (err) => {
                    console.log(err)
                }
            )
        }
        fetchUsuarios()

    },[])

    return (
        <div> Administracion de usuarios </div>,
        <div>
            <PrivateComponent roleList={['admin']}>
                <button className='bg-red-400'>Usuaios</button>
            </PrivateComponent>
            <table className='tabla'>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Estado</th>
                        <th>Rol</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((user) => {
                        return(
                        <tr key={nanoid}>
                        <td>{user.nombre}</td>
                        <td>{user.email}</td>
                        <td>
                            <RolesUsuario user={user}/>
                        </td>
                        <td>
                            <EstadoUsuarios user={user}/>
                        </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>

    );
};

const RolesUsuario = ({user}) =>{
    const [rol, setRol] = useState(user.rol);
    useEffect(()=>{
        const editUsuario = async () => {
            await editarUsuario(
                user._id,
                {rol},
                (res)=>{
                    console.log(res)
                },
                (err)=>{
                    console.log(err)}
            );
        };
        if(user.rol !== rol){
            editUsuario();
        }
    },[rol, user])

    return(
    <select value={rol} onChange={(e) => setRol(e.target.value)}>
        <option value='' disabled>Seleccione un rol</option>
        <option value='admin'>Admin</option>
        <option value='vendedor'>Vendedor</option>
        <option value='sin rol'>Sin rol</option>
    </select>
    );
};

const EstadoUsuarios = ({user}) => {
    const [estado, setEstado] = useState(user.habilitado);
    useEffect(()=>{
        const editUsuario = async () => {
            await editarUsuario(
                user._id,
                {estado},
                (res)=>{
                    console.log(res)
                },
                (err)=>{
                    console.log(err)}
            )
        }
            if(user.estado !== estado){
                editUsuario();
            }
    },[estado, user]);

    return(
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value='' disabled>Seleccione un estado</option>
            <option value='atorizado' className= 'text-green-500'>Autorizado</option>
            <option value='pendinete' className= 'text-yellow-500'>Pendiente</option>
            <option value='rechazado' className= 'text-red-500'>Rechazado</option>
        </select>
    )
}

export default Usuarios;

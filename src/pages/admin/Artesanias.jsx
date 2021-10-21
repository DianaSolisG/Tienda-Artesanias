import React, { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';

const productosBackend = [
    {
        codigo: '0001',
        nombre: 'Mochila', 
        cantidad: '2',
        precio: 86000
    },
    {
        codigo: '0002',
        nombre: 'Manilla', 
        cantidad: '1',
        precio: 8600
    },
    {
        codigo: '0003',
        nombre: 'Sombrero', 
        cantidad: '3',
        precio: 106000
    },
    {
        codigo: '0004',
        nombre: 'Mochila', 
        cantidad: '2',
        precio: 86000
    },
]


const Artesanias = () => {
    const[mostrarTabla, setMostrarTabla] = useState(false);
    const[productos, setProductos] = useState([]);
    const[textoBoton, setTextoBoton] = useState('Crear nuevo producto');

    useEffect(()=>{
        //obtener lista de vehiculos desde el frontend
        setProductos(productosBackend);
    },[]);

    useEffect(()=>{
        if(mostrarTabla){
            setTextoBoton('Crear nuevo producto');
        } else{
            setTextoBoton('Mostrar todos los producto');
        }
    },[mostrarTabla])

    return (
        <div className='flex h-full w-full flex-col items-center justify-start p-8'>
            <div className='flex flex-col w-full'>
                <h2 className='text-3xl font-extrabold text-gray-900'>Página de administración de productos</h2>
                <button
                    onClick={() => {
                        setMostrarTabla(!mostrarTabla)
                    }}
                    className='text-white bg-blue-600 p-5 rounded-full m-6 w-28 self-end'>
                    {textoBoton}
                </button>
            </div>
            {mostrarTabla ? (
                <TablaProductos listaProductos={productos} /> ): ( <FormularioCreacionProductos
                    setMostrarTabla={setMostrarTabla}
                    setProductos={setProductos}
                    listaProductos={productos}
                />
            )}
            <ToastContainer position="bottom-center" autoClose={5000} />
        </div>
    );
};
const TablaProductos = ({listaProductos}) =>{


    const form = useRef(null)
    useEffect(()=>{
        console.log("este es el listado de productos en el componente de la tabla", listaProductos)
    },[listaProductos])

    return(
        <div className='flex flex-col items-center justify-center w-full'>
            <h2 className='text-2xl font-extrabold text-gray-800'>Todo los productos</h2>
            <table className='tabla'>
                <thead>
                    <tr>
                        <th>Código del producto</th>
                        <th>Nombre del Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {listaProductos.map((producto)=>{
                        return(
                            <FilaProducto  key={nanoid()} producto={producto}/>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
};


const FilaProducto = ({producto}) =>{
    const[edit, setEdit] = useState(false);
    const[infoNuevoProducto, setInfoNuevoProducto] = useState({
        codigo:producto.codigo, 
        nombre:producto.nombre,
        cantidad:producto.cantidad,
        precio:producto.precio
    });

    const actualizarProducto = () => {
        console.log();
    }

    const eliminarProducto = () =>{

    }
    return(
        <tr>
            {edit?
                <>
                    <td>
                        <input bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 type="text"
                        value= {infoNuevoProducto.codigo}
                        onChange={e=>setInfoNuevoProducto({...infoNuevoProducto,codigo:e.target.value})}
                        /></td>
                    <td>
                        <input bg-gray-50 border border-gray-600 p-2 rounded-lg m-2type="text"
                        value= {infoNuevoProducto.nombre}
                        onChange={e=>setInfoNuevoProducto({...infoNuevoProducto,nombre:e.target.value})}
                        /></td>
                    <td>
                        <input bg-gray-50 border border-gray-600 p-2 rounded-lg m-2type="text"
                        value= {infoNuevoProducto.cantidad}
                        onChange={e=>setInfoNuevoProducto({...infoNuevoProducto,cantidad:e.target.value})}
                        /></td>
                    <td>
                        <input bg-gray-50 border border-gray-600 p-2 rounded-lg m-2type="text" 
                        value= {infoNuevoProducto.precio}
                        onChange={e=>setInfoNuevoProducto({...infoNuevoProducto,precio:e.target.value})}
                        /></td>
                </>
            :
            <>
                <td>{producto.codigo}</td>
                <td>{producto.nombre}</td>
                <td>{producto.cantidad}</td>
                <td>{producto.precio}</td>
            </>
            }
                <td>
                    <div className='flex w-full justify-around '>
                        {edit ? (

                                <i
                                    onClick={()=>actualizarProducto}
                                    className='fas fa-check text-green-700 hover:text-green-500'
                                />
                        ) : (
                                <i
                                    onClick={()=>setEdit(!edit)}
                                    className='fas fa-pencil-alt text-yellow-700 hover:text-yellow-500'
                                />
                        ) }
                        <i onClick= {()=>eliminarProducto()}className='fas fa-trash text-red-700 hover:text-red-500'/>
                    </div>
                </td>
        </tr>
    );
};

const FormularioCreacionProductos = ({
    setMostrarTabla,
    listaProductos,
    setProductos}) =>{
    const form = useRef(null);



    const submitForm = (e)=>{
        e.preventDefault();
        const fd = new FormData(form.current);

        const nuevoProducto = {};
        fd.forEach((value, key) => {
            nuevoProducto[key]= value;
        });
        setMostrarTabla(true);
        
        toast.success("Producto agregado con éxito");
        //toast.success("Error creando un Producto");
    };


    return (
        <div className='flex flex-col items-center justify-center'>
            <h2 className='text-2xl font-extrabold text-gray-800'>Crear nuevo producto</h2>
            <form ref={form} onSubmit={submitForm} className='flex flex-col'>
                <label className='flex flex-col' htmlFor='codigo'>
                    Código del producto
                    <input
                    name='codigo'
                    className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2' type="text"
                    placeholder='0001'
                    required
                    />
                </label>
                <label className='flex flex-col' htmlFor='nombre'>
                    Nombre del producto
                    <input
                    name='nombre'
                    className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2' type="text"
                    placeholder='Mochila'
                    required
                    />
                </label>
                <label className='flex flex-col' htmlFor='cantidad'>
                    Cantidad del producto
                    <input
                    name='cantidad'
                    className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2' type="number"
                    min={1}
                    max={50}
                    placeholder='1'
                    required
                    />
                </label>
                <label className='flex flex-col' htmlFor='cantidad'>
                    Precio del producto
                    <input
                    name='precio'
                    className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2' type="number"
                    placeholder='50000'
                    required
                    />
                </label>
                <button 
                    type='submit'
                    className='col-span-2 bg-blue-600 p-2 rounded-full shadow-md hover:bg-blue-800 text-white'>
                    Guardar producto
                </button>
            </form>
        </div>
    );
};

export default Artesanias;

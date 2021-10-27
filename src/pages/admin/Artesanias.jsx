import React, { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';
import { Dialog, Tooltip } from '@material-ui/core';
import ReactLoading from 'react-loading';
import PrivateComponent from 'components/PrivateComponent';
import { obtenerArtesanias, crearArtesania, editarArtesania, eliminarArtesania } from 'utils/api';



const Artesanias = () => {
    const[mostrarTabla, setMostrarTabla] = useState(false);
    const[artesania, setArtesanias] = useState([]);
    const[textoBoton, setTextoBoton] = useState('Crear nuevo artesania');
    const[ejecutarConsulta, setEjecutarConsulta] = useState(true);
    const[loading, setLoading] = useState(false);

    useEffect(()=>{
        const fetchArtesanias = async () =>{
            setLoading(true);
            await obtenerArtesanias(
                (response) =>{
                    console.log('la respuesta que se recibio fue', response);
                    setArtesanias(response.data);
                    setEjecutarConsulta(false);
                    setLoading(false);
                },
                (error) => {
                    console.error('Salio un error:', error);
                    setLoading(false)
                }
            );
        };
        console.log('consulta', ejecutarConsulta);
        if (ejecutarConsulta){
            fetchArtesanias()
        };
    },[ejecutarConsulta]);

    useEffect(()=>{
        if (mostrarTabla){
            setEjecutarConsulta(true);
        }
        },[mostrarTabla]);

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
                <TablaArtesanias 
                loading= {loading} 
                listaProductos={artesania} /> 
            ) : ( 
                <FormularioCreacionArtesanias
                    setMostrarTabla={setMostrarTabla}
                    setArtesanias={setArtesanias}
                    listaArtesanias={artesania}
                />
            )}
            <ToastContainer position="bottom-center" autoClose={5050} />
        </div>
    );
};

const TablaArtesanias = ({loading, listaArtesanias, setEjecutarConsulta}) => {
    const [busqueda, setBusqueda] = useState('');
    const [artesaniasFiltrados, setArtesaniasFiltrados] = useState(listaArtesanias);

    useEffect(()=>{
        setArtesaniasFiltrados(
            listaArtesanias.filter((elemento)=>{
                return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
            })
        )
    },[busqueda, listaArtesanias]);

    return(
        <div className='flex flex-col items-center justify-center w-full'>
            <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder='Buscar'
            className='border-2 border-gray-700 px-3 py-1 self-start rounded-md focus:outline-none focus:border-blue-500'/>
            <h2 className='text-2xl font-extrabold text-gray-800'>Todo las artesanias</h2>
            <div className='hidden md:flex w-full'>
            {loading ? (
          <ReactLoading type='cylon' color='#abc123' height={667} width={375} />
        ) : (
            <table className='tabla'>
                <thead>
                    <tr>
                        <th>Código del producto</th>
                        <th>Nombre del Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <PrivateComponent roleList={['admin']}>
                        <th>Acciones</th>
                        </PrivateComponent>
                    </tr>
                </thead>
                <tbody>
                    {listaArtesanias.map((artesania)=>{
                        return(
                            <FilaArtesania  
                            key={nanoid()} 
                            artesania={artesania}
                            setEjecutarConsulta={setEjecutarConsulta}
                            />
                        );
                    })}
                </tbody>
            </table>
        )};
    </div>
        <div className='flex flex-col w-full m-2 md:hidden'>
            {artesaniasFiltrados.map((el) => {
                return (
                    <div className='bg-gray-400 m-2 shadow-xl flex flex-col p-2 rounded-xl'>
                        <span>{el.codigo}</span>
                      <span>{el.nombre}</span>
                      <span>{el.cantidad}</span>
                      <span>{el.precio}</span>
                    </div>
               );
            })}
          </div>
        </div>
      );
    };

const FilaArtesania = async({artesania, setEjecutarConsulta}) => {
    const[edit, setEdit] = useState(false);
    const[openDialog, setOpenDialog]= useState(false);
    const[infoNuevoArtesania, setInfoNuevoArtesania] = useState({
        _id: artesania._id,
        codigo:artesania.codigo,
        nombre:artesania.nombre,
        cantidad:artesania.cantidad,
        precio:artesania.precio
    });

    const actualizarArtesania = async () => {
        await editarArtesania(
            artesania._id,
            {
                codigo:infoNuevoArtesania.codigo,
                nombre:infoNuevoArtesania.nombre,
                cantidad:infoNuevoArtesania.cantidad,
                precio:infoNuevoArtesania.precio
            },
            (response)=>{
                console.log(response.data);
                toast.success('Artesania modificada con exito');
                setEdit(false);
                setEjecutarConsulta(true);
            },
            (error) => {
                toast.error('Error modificando la artesania');
                console.error(error);
            },
        );
    };

    const deleteArtesania = async () =>{
        await eliminarArtesania(
            artesania._id,
            (response) => {
            console.log(response.data);
            toast.success('artesania eliminada con éxito');
            setEjecutarConsulta(true);
            },
            (error) => {
            console.error(error);
            toast.error('Error eliminando la artesania');
            }
          );
          setOpenDialog(false);

    };

    return(
        <tr>
            {edit?(
                <>
                <td>{infoNuevoArtesania._id}</td>
                    <td>
                        <input bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 type="text"
                        value= {infoNuevoArtesania.codigo}
                        onChange={e=>setInfoNuevoArtesania({...infoNuevoArtesania,codigo:e.target.value})}
                        /></td>
                    <td>
                        <input bg-gray-50 border border-gray-600 p-2 rounded-lg m-2type="text"
                        value= {infoNuevoArtesania.nombre}
                        onChange={e=>setInfoNuevoArtesania({...infoNuevoArtesania,nombre:e.target.value})}
                        /></td>
                    <td>
                        <input bg-gray-50 border border-gray-600 p-2 rounded-lg m-2type="text"
                        value= {infoNuevoArtesania.cantidad}
                        onChange={e=>setInfoNuevoArtesania({...infoNuevoArtesania,cantidad:e.target.value})}
                        /></td>
                    <td>
                        <input bg-gray-50 border border-gray-600 p-2 rounded-lg m-2type="text" 
                        value= {infoNuevoArtesania.precio}
                        onChange={e=>setInfoNuevoArtesania({...infoNuevoArtesania,precio:e.target.value})}
                        />
                    </td>
                </>
            ):(
            <>
                <td>{artesania._id.slice(20)}</td>
                <td>{artesania.codigo}</td>
                <td>{artesania.nombre}</td>
                <td>{artesania.cantidad}</td>
                <td>{artesania.precio}</td>
            </>
            )}
            
        <td>
        <PrivateComponent roleList={['admin']}>
          <div className='flex w-full justify-around'>
            {edit ? (
              <>
                <Tooltip title='Confirmar Edición' arrow>
                  <i
                    onClick={() => actualizarArtesania()}
                    className='fas fa-check text-green-700 hover:text-green-500'
                  />
                </Tooltip>
                <Tooltip title='Cancelar edición' arrow>
                  <i
                    onClick={() => setEdit(!edit)}
                    className='fas fa-ban text-yellow-700 hover:text-yellow-500'
                  />
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title='Editar Artesania' arrow>
                  <i
                    onClick={() => setEdit(!edit)}
                    className='fas fa-pencil-alt text-yellow-700 hover:text-yellow-500'
                  />
                </Tooltip>
                <Tooltip title='Eliminar Artesania' arrow>
                  <i
                    onClick={() => setOpenDialog(true)}
                    className='fas fa-trash text-red-700 hover:text-red-500'
                  />
                </Tooltip>
              </>
            )}
          </div>

          <Dialog open={openDialog}>
            <div className='p-8 flex flex-col'>
              <h1 className='text-gray-900 text-2xl font-bold'>
                ¿Está seguro de querer eliminar la artesania?
              </h1>
              <div className='flex w-full items-center justify-center my-4'>
                <button
                  onClick={() => deleteArtesania()}
                  className='mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md'
                >
                  Sí
                </button>
                <button
                  onClick={() => setOpenDialog(false)}
                  className='mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md'
                >
                  No
                </button>
              </div>
            </div>
          </Dialog>
          </PrivateComponent>
        </td>
        </tr>
    );
};

const FormularioCreacionArtesanias = ({ setMostrarTabla, listaArtesanias, setArtesanias}) =>{
    const form = useRef(null);

    const submitForm = async (e)=>{
        e.preventDefault();
        const fd = new FormData(form.current);

        const nuevoArtesania = {};
        fd.forEach((value, key) => {
            nuevoArtesania[key]= value;
        });

         await crearArtesania(
            {
            codigo: nuevoArtesania.codigo,
            nombre: nuevoArtesania.nombre, 
            cantidad: nuevoArtesania.cantidad, 
            precio: nuevoArtesania.precio,
        },(response)=>{
            console.log(response.data);
            toast.success('Artesania agregada con exito');
        },
        (error) => {
            console.error(error);
            toast.error('Error agregando artesania');
        }
        );

        setMostrarTabla(true);
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <h2 className='text-2xl font-extrabold text-gray-800'>Crear nueva artesania</h2>
            <form ref={form} onSubmit={submitForm} className='flex flex-col'>
                <label className='flex flex-col' htmlFor='codigo'>
                    Código de la artesania
                    <input
                    name='codigo'
                    className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2' type="number"
                    placeholder='0001'
                    required
                    />
                </label>
                <label className='flex flex-col' htmlFor='nombre'>
                    Nombre de la artesania
                    <input
                    name='nombre'
                    className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2' type="text"
                    placeholder='Mochila'
                    required
                    />
                </label>
                <label className='flex flex-col' htmlFor='cantidad'>
                    Cantidad del artesania
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
                    Precio de la artesania
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
                    Guardar artesania
                </button>
            </form>
        </div>
    );
};

export default Artesanias;

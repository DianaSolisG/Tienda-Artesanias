import { nanoid } from 'nanoid';
import React, {useState, useEffect, useRef} from 'react'
import { crearVenta } from 'utils/api';
import { obtenerArtesanias } from 'utils/api';
import { obtenerUsuarios } from 'utils/api';

const Ventas = () => {
    const form = useRef(null);
    const [vendedores, setVendedores] = useState([]);
    const [artesanias, setArtesanias] = useState([]);
    const [artesaniasTabla, setArtesaniasTabla] = useState([]);

    useEffect(()=>{
        const fetchVendedores = async () => {
            await obtenerUsuarios(
                (reponse) => {
                    setVendedores(reponse.data);
                },
                (error) => {
                    console.error(error);
                }
            );
        };
        const fetchArtesanias = async ()=>{
            await obtenerArtesanias(
                (response)=>{
                    setArtesanias(response.data);
            },(error)=>{console.error(error)})
        }
        fetchVendedores();
        fetchArtesanias();
    }, []);

    const submitForm = async (e)=>{
        e.preventDefault();
        const fd = new FormData(form.current);

        const formData = {};
        fd.forEach((value, key) => {
            formData[key]= value;
        });

        console.log('form data', formData);

        const listaArtesanias = Object.keys(formData)
        .map((k) => {
            if (k.includes('artesania')){
            return artesaniasTabla.filter((v) => v._id === formData[k])[0];
            }
            return null;
        }).filter((v) => v);

        const datosVenta = {
            vendedores: vendedores.filter(v=>v._id===formData.vendedores)[0],
            cantidad: formData.valor,
            artesanias: listaArtesanias,
        }

        await crearVenta(datosVenta,
            (response)=>{
               console.log(response)
            },
            (error)=>{
               console.error(error)
            }
        );
};


    return (
        <div className='flex h-full w-full overflow-y-scroll items-center justify-center'>
            <form ref={form} onSubmit={submitForm} className='flex flex-col'>
            <h1 className='text-3xl font-extrabol text-gray-900 my-2'>Crear una nueva Venta</h1>
                <label className='flex flex-col'>
                    <span className='text-2xl font-gray-900'>Vendedor</span>
                    <select name='vendedor' className='p-2' required defaultValue=''>
                        <option disasable value=''>Selecione un vendedor</option>
                        {vendedores.map((el)=>{
                            return <option key={nanoid()} value={el._id}>{`${el.name}` `${el.lastname}`}</option>;
                        })}
                    </select>
                </label>
                <TablaArtesanias 
                artesanias={artesanias} 
                setArtesanias={setArtesanias} 
                setArtesaniasTabla={setArtesaniasTabla}
                />
                <label className='flex flex-col'>
                    <span className='text-2xl font-gray-900'>
                        Valor total venta</span>
                    <input className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2' type="number" name='Valor' />
                </label> 
                <button className= 'col-span-2 bg-blue-400 p-2 rounded-full shadow-md hover:bg-blue-600 text-white'>
                    Crear venta
                </button>
            </form>
        </div>
    )
}

const TablaArtesanias = ({artesanias, setArtesanias, setArtesaniasTabla}) =>{
    const [artesaniaAgregar, setArtesaniaAgregar] = useState({});
    const [filasTabla, setFilasTabla] = useState([]);

    const agregarNuevaArtesania = ()=>{
        setFilasTabla([...filasTabla, artesaniaAgregar]);
        setArtesanias(artesanias.filter(v=> v._id !== artesaniaAgregar._id));
        setArtesaniaAgregar({});
    }

    useEffect(()=>{
        console.log(artesaniaAgregar);
    }, [artesaniaAgregar]);

    useEffect(()=>{
        console.log('filasTabla', filasTabla);
        setArtesaniasTabla(filasTabla);
    }, [filasTabla, setArtesaniasTabla])

    const  eliminarArtesania = (artesaniaAEliminar) =>{
        setFilasTabla(filasTabla.filter(v=>v._id!==artesaniaAEliminar._id));
        setArtesanias([...artesanias, artesaniaAEliminar]);
    };

    const modificarArtesania = (artesanias, cantidad) => {
        setFilasTabla(
            filasTabla.map((ft) => {
                if(ft._id === artesanias.id){
                    ft.cantidad = cantidad;
                    ft.total = artesanias.valor * cantidad;
                }
                return ft;
            })
        )

    }

    return(
        <div>
            <div className='flex '>
                    <label className='flex flex-col'>
                            <select  className='p-2'
                            value={artesaniaAgregar._id ?? "" }
                            onChange={e=>setArtesaniaAgregar(artesanias
                            .filter(v=>v._id===e.target.value)[0])}>
                            <option disasable value={""}>
                                Selecione una artesania</option>
                            {artesanias.map((el)=>{
                            return <option
                            key={nanoid()}
                            value={el._id}>{`${el.codigo}` `${el.nombre}` `${el.precio}`}</option>;
                            })}
                            </select>
                    </label>
                    <button onClick={() => agregarNuevaArtesania}
                    className= 'col-span-2 bg-blue-400 p-2 rounded-full shadow-md hover:bg-blue-600 text-white'>
                        Agregar Artesania
                    </button>
            </div>
                    <table className='tabla'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Codigo</th>
                                <th>Nombre</th>
                                <th>Cantidad</th>
                                <th>Valor Unitario</th>
                                <th>Total</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                    <tbody>
                        {filasTabla.map((el, index)=>{
                            return(
                                <FilaArtesania
                                key={el._id}
                                veh={el}
                                index={index}
                                eliminarArtesania={eliminarArtesania}
                                modificarArtesania={modificarArtesania}
                                />
                            )
                        }
                    )}
                    </tbody>
                    </table>
        </div>
    )
};

const FilaArtesania = ({veh, index, eliminarArtesania, modificarArtesania}) => {
    const [artesania, setArtesania] = useState(veh);
    useEffect(()=>{
        console.log('veh', artesania);
    },[artesania]);
    return (
        <tr>
            <td>{artesania._id}</td>
            <td>{artesania.codigo}</td>
            <td>{artesania.nombre}</td>
            <td>{artesania.cantidad}</td>
            <td>{artesania.precio}</td>
            <td>
            <label htmlFor={`valor_${index}`}>
          <input
            type='number'
            name={`cantidad_${index}`}
            value={artesania.cantidad}
            onChange={(e) => {
                modificarArtesania(artesania, e.target.value === '' ? '0' : e.target.value);
                setArtesania({
                ...artesania,
                cantidad: e.target.value === '' ? '0' : e.target.value,
                total:
                    parseFloat(artesania.valor) *
                    parseFloat(e.target.value === '' ? '0' : e.target.value),
                });
            }}
          />
        </label>
            </td>
            <td>{artesania.valor}</td>
            <td>{parseFloat(artesania.total ?? 0)}</td>
            <td>
                <i
                onClick={() => eliminarArtesania(artesania)}
                className='fas fa-minus text-red-500 cursor-pointer'
                />
            </td>
            <td className='hidden'>
            <input hidden defaultValue={artesania._id} name={`artesania_${index}`} />
      </td>
        </tr>
    )
}

export default Ventas;

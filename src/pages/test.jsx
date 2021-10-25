import { nanoid } from 'nanoid';
import React, { useEffect, useState, useRef } from 'react'
import { obtenerUsuaio } from 'utils/api';
import { obtenerArtesanias } from 'utils/api';
import axios from 'axios';

const Test = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [artesanias, setArtesanias] = useState([]);
    const form = useRef(null);

    useEffect(() => {
        obtenerArtesanias(setArtesanias);
        obtenerUsuaio(setUsuarios);
    }, []);

    useEffect(()=>{
        console.log(artesanias);
    },[artesanias]);

    useEffect(()=>{
        console.log(usuarios);
    },[usuarios]);

    const submitForm = async (e)=>{
        e.preventDefault();
        const fd = new FormData(form.current);

        const nuevoVenta = {};
        fd.forEach((value, key) => {
            nuevoVenta[key]= value;
        });
        console.log(nuevoVenta);

        const informacionConsolidada = {
            valor:nuevoVenta.cantidadVenta
            //artesanias:artesanias.filter((el)=>el._id === nuevoVenta.artesanias)[0],
            //vendedor:usuarios.filter((el)=>el._id === nuevoVenta.vendedor)[0]
        };
        console.log(informacionConsolidada);

        const options = {
            method: 'POST',
            url: 'http://localhost:5050/ventas/',
            headers: {'Content-Type': 'application/json'},
            data: {codigo: nuevoVenta.codigo, nombre: nuevoVenta.nombre, cantidad: nuevoVenta.cantidad, precio: nuevoVenta.precio}
          };

        await axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
            //toast.success("Producto agregado con éxito");
          }).catch(function (error) {
            console.error(error);
            //toast.success("Error creando un Producto");
          });

       //setMostrarTabla(true);

    };

    return (
        <div>
            Crear nueva venta
            <form ref={form} onSubmit={submitForm} className='flex flex-col'>
                <label>
                    Seleccionar Vendedor
                <select name="vendedor" >
                    {usuarios.map((u)=> {
                        return <option key={nanoid()} value={u._id}>{u.email}</option>;
                    })}
                    </select>
                </label>
                <label>
                    Seleccionar Artesania
                    <select name="artesania" >
                    {artesanias.map((v)=> {
                        return <option value={v._id} key={nanoid()}>{v.nombre}</option>;
                    })}
                    </select>
                </label>
                <input type="number" name="cantidadVenta"/>
                <button type='submit'>Enviar Venta</button>
            </form>
        </div>
    )
}

export default Test;

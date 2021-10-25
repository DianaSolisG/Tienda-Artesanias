import axios from 'axios';

const getToken = () =>{
    return `Bearer ${localStorage.getItem('token')}`;
}

export const obtenerArtesanias = async (successCallback, errorCallback) => {
    const options = {
        method: 'GET', 
        url: 'http://localhost:5050/artesanias/',
        headers:{
            Authorization: getToken(),
        },
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const crearArtesania = async (data, successCallback, errorCallback) => {
    const options = {method: 'POST',
    url: 'http://localhost:5050/artesanias',
    headers: {'Content-Type': 'application/json', Authorization: getToken()},
    data,
  };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarArtesania = async(id, data, successCallback, errorCallback) =>{
    const options = {
        method: 'PATCH',
        url: `http://localhost:5050/artesnias/${id}/`,
        headers: {'Content-Type': 'application/json', Authorization: getToken()},
        data,
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const eliminarArtesania = async(id, successCallback, errorCallback)=>{
    const options = {
        method: 'DELETE',
        url: `http://localhost:5050/artesnias/${id}/`,
        headers: {'Content-Type': 'application/json' , Authorization: getToken()}

    }
    await axios.request(options).then(successCallback).catch(errorCallback);
}

export const obtenerUsuarios = async(successCallback, errorCallback)=>{
    const options = {method: 'GET', 
    url: 'http://localhost:5050/usuarios', 
    headers: {Authorization: getToken()}
};
    await axios.request(options).then(successCallback).catch(errorCallback);
}

export const crearVenta = async(data, successCallback, errorCallback)=>{
    const options = {
        method: 'POST',
        url: 'http://localhost:5050/ventas',
        headers: {'Content-Type': 'application/json', Authorization: getToken()},
        data,
    }
    await axios.request(options).then(successCallback).catch(errorCallback);
}


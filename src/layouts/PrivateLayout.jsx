import Sidebar from 'components/Sidebar';
import React, {useEffect, useState} from 'react'
import SidebarResponsive from 'components/SidebarResponsive';
import { useAuth0 } from '@auth0/auth0-react';
import ReactLoading from 'react-loading';
import { obtenerDatosUsuarios } from '../utils/api.js';
import { useUser } from '../context/userContext';



const PrivateLayout = ({children}) => {

    const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently, logout } =
    useAuth0();
    const [loadingUserInformation, setLoadingUserInformation] = useState(false);
    const { setUserData } = useUser();

    useEffect(() => {
        const fetchAuth0Token = async () => {
            setLoadingUserInformation(true);
            const accessToken = await getAccessTokenSilently({
                audience: `api-autenticacion-tienda-artesanias`,
      });
        localStorage.setItem('token', accessToken);
        console.log(accessToken);

        await obtenerDatosUsuarios(
            (response) => {
                console.log('response con datos del usuario', response);
                setUserData(response.data);
                setLoadingUserInformation(false);
            },
            (err) => {
                console.log('err', err);
                setLoadingUserInformation(false);
                logout({ returnTo: 'http://localhost:3000/admin' });
            }
      );
    };
    if (isAuthenticated) {
        fetchAuth0Token();
    }
    }, [isAuthenticated, getAccessTokenSilently, logout, setUserData]);

    if (isLoading || loadingUserInformation)
        return <ReactLoading type='cylon' color='#abc123' height={667} width={375} />;

    if (!isAuthenticated) {
        return loginWithRedirect();
    }

    return (
        <div className="flex w-screen h-screen">
            <div className='flex flex-col md:flex-row h-full w-full'>
                <Sidebar/>
                <SidebarResponsive />
                <main className='flex w-full overflow-y-scroll items-center justify-center'>
                {children}
                </main>
            </div>
        </div>
    );
};

export default PrivateLayout;

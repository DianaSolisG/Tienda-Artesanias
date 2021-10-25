import React, {useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import ReactLoading from 'layouts/PrivateLayout';

const PrivateRoute = ({children}) => {
    const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently  } = useAuth0();
    useEffect(() => {
        const fetchAuth0Token = async()=>{
            const accessToken = await getAccessTokenSilently({
                audience: `api-autenticacion-tienda-artesanias`,
            });
            localStorage.setItem('token', accessToken)
        }
        if(isAuthenticated)
        fetchAuth0Token()

    },[isAuthenticated, getAccessTokenSilently])

    if (isLoading) 
    return <ReactLoading type='cylin' color='#abc123' height={667} width={375}/>;
    if(!isAuthenticated){
        return loginWithRedirect();
    }
    return <>{children}</>



    //return isAuthenticated ? (
    //<>{children}</>
   // ):(
      // <div>
       // <div className='text-9xl text-red-400'>No estas autorizado para ver este sitio</div>
       // <Link to='/'>
          //  <span className='text-blue-500 font-bold'>
        //    Llévame al home
        //    </span>
            
        //</Link>
   // </div>
    //);
}

export default PrivateRoute;

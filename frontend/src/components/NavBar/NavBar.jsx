import React, { useContext } from "react";
import './NavBar.css'
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import AxiosInstance from '../../utils/AxiosConfig'




const NavBar = () => {
    const { authToken } = useContext(AuthContext);
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate()


    const onSubmit = (e) => {
        logout();
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        navigate('/')
        e.window.location.reload(true)
    }



    return (
        <>
            <header className="header">
                <nav className="nav-header">
                    <Link to={'/'}>Controller</Link>

                    {
                        authToken
                            ?
                            <Link onClick={onSubmit} className="btn-logout">Logout</Link>
                            :
                            null
                    }
                </nav>
            </header>
        </>
    )
}


export default NavBar;
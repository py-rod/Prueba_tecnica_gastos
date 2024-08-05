import React, { useState, useEffect, useContext } from "react";
import './assets/css/LoginPage.css'
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/AxiosConfig";
import AuthContext from "../../context/AuthContext";

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('account/signin', {
                email: email,
                password: password
            })

            if (response.status == 200) {
                alert('Logueado con exito')
                const { access, refresh } = response.data
                login(access, refresh)
                navigate('/dashboard')
            }
        } catch (error) {
            console.log(error)
            setError(error.response.data.detail)
        }
    }

    return (
        <>
            <section className="section-1-signin">
                <form onSubmit={e => handleSubmit(e)}>
                    <input type="email" name="email" id="id_email" placeholder="Email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" name="password" id="id_password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className="btn-signin">Log In</button>
                    {error && <p>{error}</p>}
                </form>
                <p className="redirect-signup">Dont have any account? <Link to={'signup'}>SIGN UP</Link></p>
            </section>
        </>
    )
}


export default LoginPage
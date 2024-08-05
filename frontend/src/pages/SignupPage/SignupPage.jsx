import React, { useState } from "react"
import './static/css/Signup.css'
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/AxiosConfig";



const Signup = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('account/signup', {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password
            })

            if (response.status == 201) {
                alert('Se registro con exito')
                setFirstName('')
                setLastName('')
                setEmail('')
                setPassword('')
                setError('')
            }
        } catch (error) {
            setError(error.response.data.email[0])
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
        }
    }

    return (
        <>
            <section className="section-1">
                <form onSubmit={e => handleSubmit(e)}>
                    <input type="text" name="first_name" id="id_first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" autoFocus />
                    <input type="text" name="last_name" id="id_last_name" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" />
                    <input type="email" name="email" id="id_email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <input type="password" name="password" id="id_password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <button type="submit" className="btn-register">Register</button>
                    {error && <p>{error}</p>}
                </form>
                <p className="redirect-signin">You have account? <Link to={'/'}>SIGN IN</Link></p>
            </section>
        </>
    )
}


export default Signup
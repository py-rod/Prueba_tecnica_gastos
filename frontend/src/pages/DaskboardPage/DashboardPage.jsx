import React from "react";
import './static/css/dashboard.css'
import { Link } from "react-router-dom";



const Dashboard = () => {
    return (
        <>
            <main className="main-dashboard">
                <section className="section-1-dashboard">
                    <ul className="options-list">
                        <li>
                            <Link to={'create_type_saving'}>Crear tipo de ahorro</Link>
                        </li>
                        <li >
                            <Link to={'create_type_expense'}>Crear tipo de gasto</Link>
                        </li>
                        <li>
                            <Link to={'create_saving_target'}>Objetivos de ahorro</Link>
                        </li>
                        <li>
                            <Link to={'create_income'}>Ingresos</Link>
                        </li>
                        <li>
                            <Link to={'create_expense'}>Gastos</Link>
                        </li>
                        <li>
                            <Link>Actualizar perfil</Link>
                        </li>
                    </ul>
                </section>
            </main>

        </>
    )
}


export default Dashboard
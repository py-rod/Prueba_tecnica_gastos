import './static/css/typeexpense.css';
import React, { useState, useEffect } from "react";
import AxiosAccessConfig from '../../utils/AxiosAccessConfig';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const CreateTypeExpense = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);

    useEffect(() => {
        getExpenses();
    }, []);

    const getExpenses = async () => {
        try {
            const response = await AxiosAccessConfig.get('type_expenses/get_all_expenses_by_user');
            setExpenses(response.data);
        } catch (error) {
            console.log('Error al obtener los tipos de gastos', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await AxiosAccessConfig.post('type_expenses/create_type_expense', { name: name });
            setSuccess('Tipo de gasto creado exitosamente');
            setError(null);
            setName('');
            getExpenses();
        } catch (error) {
            setError('Error al crear el tipo de gasto.');
            setSuccess(null);
            setName('');
        }
    };

    const handleDelete = async (id) => {
        try {
            await AxiosAccessConfig.delete(`type_expenses/delete_type_expense/${id}`);
            getExpenses();
        } catch (error) {
            console.log('Error', error);
        }
    };

    const handleUpdate = async (id) => {
        try {
            await AxiosAccessConfig.put(`type_expenses/upgrade_type_expense/${id}`, { name: name });
            setIsOpen(false);
            setSelectedExpense(null);
            setName('');
            getExpenses();
        } catch (error) {
            console.log('No se pudo actualizar', error);
        }
    };

    const openModal = (expense) => {
        setSelectedExpense(expense);
        setName(expense.name);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedExpense(null);
        setName('');
    };

    return (
        <>
            <main className="main-create-type-expense">
                <section className="section-1-expense">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            id="id_name"
                            placeholder="Tipo de gasto"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn-create-expense">Crear</button>
                        {error && <p>{error}</p>}
                        {success && <p>{success}</p>}
                    </form>
                </section>

                <section className="section-2-get-type-expense">
                    <ul>
                        {expenses.map(expense => (
                            <li key={expense.id}>
                                {expense.name}
                                <div className="content-icons-expenses">
                                    <div>
                                        <button onClick={() => openModal(expense)}>
                                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                            </svg>
                                        </button>
                                        <Modal
                                            isOpen={modalIsOpen}
                                            onRequestClose={closeModal}
                                            style={customStyles}
                                            contentLabel="Actualizar tipo de gasto"
                                        >
                                            <button onClick={closeModal} className='btn-close-modal'>
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                </svg>
                                            </button>
                                            <form className='form-type-expense-update' onSubmit={(e) => { e.preventDefault(); handleUpdate(selectedExpense.id); }}>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="id_name"
                                                    placeholder='Ingresar nuevo nombre'
                                                    required
                                                    autoFocus
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                                <button type="submit" className='btn-type-expense-upgrade'>Guardar y actualizar</button>
                                            </form>
                                        </Modal>
                                    </div>
                                    <button onClick={() => handleDelete(expense.id)}>
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="red" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </>
    );
}

export default CreateTypeExpense;

import './static/css/expense.css'
import React, { useState, useEffect } from "react";
import AxiosAccessConfig from "../../utils/AxiosAccessConfig";
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

const CreateExpense = () => {
    const [quantity, setQuantity] = useState(0);
    const [description, setDescription] = useState('');
    const [selectTypeExpense, setSelectTypeExpense] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [expenses, setExpense] = useState([]);
    const [typesExpenses, setTypesExpenses] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);

    useEffect(() => {
        getExpense();
        getTypesExpenses();
    }, []);

    const getExpense = async () => {
        try {
            const response = await AxiosAccessConfig.get('expenses/get_expense_user');
            setExpense(response.data);
        } catch (error) {
            console.log('Error al obtener los gastos de usuario', error);
        }
    };

    const getTypesExpenses = async () => {
        try {
            const response = await AxiosAccessConfig.get('type_expenses/get_all_expenses_by_user');
            setTypesExpenses(response.data);
        } catch (error) {
            console.log('Error al obtener los tipos de gastos', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await AxiosAccessConfig.post('expenses/create_expenses', {
                quantity: quantity,
                description: description,
                type_expense: selectTypeExpense
            });
            setSuccess('Tipo de gasto de usuario creado');
            setError(null);
            setQuantity(0);
            setDescription('');
            setSelectTypeExpense('');
            getExpense();
        } catch (error) {
            setError('Error al crear el tipo de gasto de usuario. Revise que la cantidad solo lleve dos decimales');
            setSuccess(null);
            setQuantity(0);
            setDescription('');
            setSelectTypeExpense('');
        }
    };

    const handleDelete = async (id) => {
        try {
            await AxiosAccessConfig.delete(`expenses/delete_expense/${id}`);
            getExpense();
        } catch (error) {
            console.log('Error', error);
        }
    };

    const handleUpdate = async (id) => {
        try {
            await AxiosAccessConfig.put(`expenses/upgrade/${id}`, {
                quantity: quantity,
                description: description,
                type_expense: selectTypeExpense
            });
            setSuccess('Tipo de gasto de usuario se actualizo');
            setIsOpen(false);
            setSelectedExpense(null);
            setQuantity(0);
            setDescription('');
            setSelectTypeExpense('');
            getExpense();
        } catch (error) {
            console.log('No se pudo actualizar', error);
            setError('Error al actualizar el tipo de gasto de usuario. Revise que la cantidad solo lleve dos decimales');

        }
    };

    const openModal = (expense) => {
        setSelectedExpense(expense);
        setQuantity(expense.quantity);
        setDescription(expense.description);
        setSelectTypeExpense(expense.type_expense);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedExpense(null);
        setQuantity(0);
        setDescription('');
        setSelectTypeExpense('');
    };

    return (
        <>
            <main className="main-create-expense-user">
                <section className="section-1-expense-user">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="number"
                            name="quantity"
                            id="id_quantity"
                            placeholder="Ingresar cantidad de gasto"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                            autoFocus
                        />
                        <textarea
                            required
                            name="description"
                            id="id_description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Descripcion de gasto'
                        />
                        <select
                            name="type_expense"
                            id="id_type_expense"
                            value={selectTypeExpense}
                            onChange={(e) => setSelectTypeExpense(e.target.value)}
                            required
                        >
                            <option value="" disabled>Seleccionar tipo de gasto</option>
                            {typesExpenses.map((typeExpense) => (
                                <option key={typeExpense.id} value={typeExpense.id}>
                                    {typeExpense.name}
                                </option>
                            ))}
                        </select>
                        <button type="submit" className="btn-create-expense">Crear</button>
                        {error && <p>{error}</p>}
                        {success && <p>{success}</p>}
                    </form>
                </section>

                <section className="section-2-get-expense-user">
                    <ul>
                        {expenses.map(expense => (
                            <li key={expense.id}>
                                {expense.quantity}
                                <div className="content-icons-expense-user">
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
                                                    type="number"
                                                    name="quantity"
                                                    id="id_quantity"
                                                    placeholder='Ingresar cantidad de gasto'
                                                    required
                                                    autoFocus
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(e.target.value)}
                                                />
                                                <textarea
                                                    name="description"
                                                    id="id_description"
                                                    value={description}
                                                    required
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />

                                                <select
                                                    name="type_expense"
                                                    id="id_type_expense"
                                                    value={selectTypeExpense}
                                                    onChange={(e) => setSelectTypeExpense(e.target.value)}

                                                >
                                                    <option value="" disabled>Seleccionar tipo de gasto</option>
                                                    {typesExpenses.map((typeExpense) => (
                                                        <option key={typeExpense.id} value={typeExpense.id}>
                                                            {typeExpense.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <button type="submit" className='btn-type-expense-user-upgrade'>Guardar y actualizar</button>
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

export default CreateExpense;

import './static/css/income.css';
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

const CreateIncome = () => {
    const [quantity, setQuantity] = useState(0);
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [incomes, setIncomes] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedIncome, setSelectedIncome] = useState(null);

    useEffect(() => {
        getIncomes();
    }, []);

    const getIncomes = async () => {
        try {
            const response = await AxiosAccessConfig.get('income/get_all_income_by_user');
            setIncomes(response.data);
        } catch (error) {
            console.log('Error al obtener los tipos de ingresos por usuario', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await AxiosAccessConfig.post('income/create_income', {
                quantity: quantity,
                description: description
            });
            setSuccess('Tipo de ingreso creado exitosamente');
            setError(null);
            setQuantity(0);
            setDescription('');
            getIncomes();
        } catch (error) {
            setError('Error al crear el tipo de ingreso.');
            setSuccess(null);
            setQuantity(0);
            setDescription('');
        }
    };

    const handleDelete = async (id) => {
        try {
            await AxiosAccessConfig.delete(`income/delete_income/${id}`);
            getIncomes();
        } catch (error) {
            console.log('Error', error);
        }
    };

    const handleUpdate = async (id) => {
        try {
            await AxiosAccessConfig.put(`income/upgrade_income/${id}`, { quantity: quantity, description: description });
            setIsOpen(false);
            setSelectedIncome(null);
            setQuantity(0);
            setDescription('')
            getIncomes();
        } catch (error) {
            console.log('No se pudo actualizar', error);
        }
    };

    const openModal = (income) => {
        setSelectedIncome(income);
        setQuantity(income.quantity);
        setDescription(income.description);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedIncome(null);
        setQuantity(0);
        setDescription('');
    };

    return (
        <>
            <main className="main-create-type-income">
                <section className="section-1-income">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="number"
                            name="quantity"
                            id="id_quantity"
                            placeholder="Ingresar cantidad de ingreso"
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
                            placeholder='Descripcion de ingreso'
                        />
                        <button type="submit" className="btn-create-income">Crear</button>
                        {error && <p>{error}</p>}
                        {success && <p>{success}</p>}
                    </form>
                </section>

                <section className="section-2-get-incomes">
                    <ul>
                        {incomes.map(income => (
                            <li key={income.id}>
                                {income.quantity}
                                <div className="content-icons-incomes">
                                    <div>
                                        <button onClick={() => openModal(income)}>
                                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                            </svg>
                                        </button>
                                        <Modal
                                            isOpen={modalIsOpen}
                                            onRequestClose={closeModal}
                                            style={customStyles}
                                            contentLabel="Actualizar tipo de ingreso"
                                        >
                                            <button onClick={closeModal} className='btn-close-modal'>
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                </svg>
                                            </button>
                                            <form className='form-type-income-update' onSubmit={(e) => { e.preventDefault(); handleUpdate(selectedIncome.id); }}>
                                                <input
                                                    type="number"
                                                    name="quantity"
                                                    id="id_quantity"
                                                    placeholder='Ingresar cantidad de ingreso'
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
                                                <button type="submit" className='btn-type-income-upgrade'>Guardar y actualizar</button>
                                            </form>
                                        </Modal>
                                    </div>
                                    <button onClick={() => handleDelete(income.id)}>
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

export default CreateIncome;

import './static/css/targetsavings.css'
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

const CreateSavingsTargets = () => {
    const [quantity, setQuantity] = useState(0);
    const [description, setDescription] = useState('');
    const [selectTypeSaving, setSelectTypeSaving] = useState('');
    const [initDate, setInitDate] = useState('')
    const [lastDate, setLastDate] = useState('')
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [savingsTarget, setSavingsTarget] = useState([]);
    const [typesSaving, setTypesSavings] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectSaving, setSelectSaving] = useState(null);

    useEffect(() => {
        getSavingsTarget();
        getTypesSavings();
    }, []);

    const getSavingsTarget = async () => {
        try {
            const response = await AxiosAccessConfig.get('savings_targets/get_all_savings_targets_by_user');
            setSavingsTarget(response.data);
        } catch (error) {
            console.log('Error al obtener los ahorros de usuario', error);
        }
    };

    const getTypesSavings = async () => {
        try {
            const response = await AxiosAccessConfig.get('savings/get_all_savings_by_user');
            setTypesSavings(response.data);
        } catch (error) {
            console.log('Error al obtener los tipos de ahorro', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await AxiosAccessConfig.post('savings_targets/create_savings_targets', {
                quantity: quantity,
                description: description,
                type_saving: selectTypeSaving,
                init_date: initDate,
                last_date: lastDate
            });
            setSuccess('Tipo de ahorro de usuario creado');
            setError(null);
            setQuantity(0);
            setDescription('');
            setSelectTypeSaving('');
            getSavingsTarget();
        } catch (error) {
            setError('Error al crear el tipo de ahorro de usuario. Revise que la cantidad solo lleve dos decimales');
            setSuccess(null);
            setQuantity(0);
            setDescription('');
            setSelectTypeSaving('');
        }
    };

    const handleDelete = async (id) => {
        try {
            await AxiosAccessConfig.delete(`savings_targets/delete_saving_target/${id}`);
            getSavingsTarget();
        } catch (error) {
            console.log('Error', error);
        }
    };

    const handleUpdate = async (id) => {
        try {
            await AxiosAccessConfig.put(`savings_targets/upgrade_savings_target/${id}`, {
                quantity: quantity,
                description: description,
                type_saving: selectTypeSaving,
                init_date: initDate,
                last_date: lastDate
            });
            setSuccess('Tipo de ahorro de usuario se actualizo');
            setIsOpen(false);
            setSelectSaving(null);
            setQuantity(0);
            setDescription('');
            setSelectTypeSaving('');
            getSavingsTarget();
        } catch (error) {
            console.log('No se pudo actualizar', error);
            setError('Error al actualizar el tipo de ahorro de usuario. Revise que la cantidad solo lleve dos decimales');

        }
    };

    const openModal = (saving) => {
        setSelectSaving(saving);
        setQuantity(saving.quantity);
        setDescription(saving.description);
        setSelectTypeSaving(saving.type_saving);
        setInitDate(saving.init_date);
        setLastDate(saving.last_date);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectSaving(null);
        setQuantity(0);
        setDescription('');
        setSelectTypeSaving('');
    };

    return (
        <>
            <main className="main-create-saving-target-user">
                <section className="section-1-saving-target-user">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="number"
                            name="quantity"
                            id="id_quantity"
                            placeholder="Ingresar cantidad de ahorro"
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
                            placeholder='Descripcion de ahorro'
                        />
                        <select
                            name="type_saving"
                            id="id_type_saving"
                            value={selectTypeSaving}
                            onChange={(e) => setSelectTypeSaving(e.target.value)}
                            required
                        >
                            <option value="" disabled>Seleccionar tipo de gasto</option>
                            {typesSaving.map((typeSaving) => (
                                <option key={typeSaving.id} value={typeSaving.id}>
                                    {typeSaving.name}
                                </option>
                            ))}
                        </select>
                        <div>
                            <label htmlFor="init_date">Fecha de inicio</label>
                            <input type="date" name="init_date" id="id_init_date" onChange={(e) => setInitDate(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="last_date">Fecha de finalizacion</label>
                            <input type="date" name="last_date" id="id_last_date" onChange={(e) => setLastDate(e.target.value)} />
                        </div>
                        <button type="submit" className="btn-create-saving-target">Crear</button>
                        {error && <p>{error}</p>}
                        {success && <p>{success}</p>}
                    </form>
                </section>

                <section className="section-2-get-saving-target-user">
                    <ul>
                        {savingsTarget.map(saving => (
                            <li key={saving.id}>
                                {saving.quantity}
                                <div className="content-icons-saving-target-user">
                                    <div>
                                        <button onClick={() => openModal(saving)}>
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
                                            <form className='form-type-saving-target-update' onSubmit={(e) => { e.preventDefault(); handleUpdate(selectSaving.id); }}>
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
                                                    name="type_saving"
                                                    id="id_type_saving"
                                                    value={selectTypeSaving}
                                                    onChange={(e) => setSelectTypeSaving(e.target.value)}

                                                >
                                                    <option value="" disabled>Seleccionar tipo de gasto</option>
                                                    {typesSaving.map((typeSaving) => (
                                                        <option key={typeSaving.id} value={typeSaving.id}>
                                                            {typeSaving.name}
                                                        </option>
                                                    ))}
                                                </select>

                                                <div>
                                                    <label htmlFor="init_date">Fecha de inicio</label>
                                                    <input type="date" name="init_date" id="id_init_date" value={initDate} onChange={(e) => setInitDate(e.target.value)} />
                                                </div>
                                                <div>
                                                    <label htmlFor="last_date">Fecha de finalizacion</label>
                                                    <input type="date" name="last_date" id="id_last_date" value={lastDate} onChange={(e) => setLastDate(e.target.value)} />
                                                </div>
                                                <button type="submit" className='btn-type-saving-target-user-upgrade'>Guardar y actualizar</button>
                                            </form>
                                        </Modal>
                                    </div>
                                    <button onClick={() => handleDelete(saving.id)}>
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

export default CreateSavingsTargets;

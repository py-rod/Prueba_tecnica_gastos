import './static/css/typesavings.css';
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

const CreateTypeSaving = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [savings, setSavings] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedSaving, setSelectedSaving] = useState(null);

    useEffect(() => {
        getSavings();
    }, []);

    const getSavings = async () => {
        try {
            const response = await AxiosAccessConfig.get('savings/get_all_savings_by_user');
            setSavings(response.data);
        } catch (error) {
            console.log('Error al obtener los tipos de ahorro por usuario', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await AxiosAccessConfig.post('savings/create_savings', { name: name });
            setSuccess('Tipo de ahorro creado exitosamente');
            setError(null);
            setName('');
            getSavings();
        } catch (error) {
            setError('Error al crear el tipo de ahorro.');
            setSuccess(null);
            setName('');
        }
    };

    const handleDelete = async (id) => {
        try {
            await AxiosAccessConfig.delete(`savings/delete_saving/${id}`);
            getSavings();
        } catch (error) {
            console.log('Error', error);
        }
    };

    const handleUpdate = async (id) => {
        try {
            await AxiosAccessConfig.put(`savings/upgrade_saving/${id}`, { name: name });
            setIsOpen(false);
            setSelectedSaving(null);
            setName('')
            getSavings();
        } catch (error) {
            console.log('No se pudo actualizar', error);
        }
    };

    const openModal = (saving) => {
        setSelectedSaving(saving);
        setName(saving.name);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedSaving(null);
        setName('');
    };

    return (
        <>
            <main className="main-create-type-savings">
                <section className="section-1-savings">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            id="id_name"
                            placeholder="Tipo de ahorro"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn-create-savings">Crear</button>
                        {error && <p>{error}</p>}
                        {success && <p>{success}</p>}
                    </form>
                </section>

                <section className="section-2-get-type-savings">
                    <ul>
                        {savings.map(saving => (
                            <li key={saving.id}>
                                {saving.name}
                                <div className="content-icons-savings">
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
                                            contentLabel="Actualizar tipo de ahorro"
                                        >
                                            <button onClick={closeModal} className='btn-close-modal'>
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                </svg>
                                            </button>
                                            <form className='form-type-saving-update' onSubmit={(e) => { e.preventDefault(); handleUpdate(selectedSaving.id); }}>
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
                                                <button type="submit" className='btn-type-saving-upgrade'>Guardar y actualizar</button>
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

export default CreateTypeSaving;

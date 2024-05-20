import styles from './DeleteConfirmationModal.module.css';

interface DeleteConfirmationModalProps {
    onConfirmDelete: () => void;
    onClose: () => void;
}

const DeleteConfirmationModal = ({ onConfirmDelete, onClose }: DeleteConfirmationModalProps) => {
    const handleConfirmDelete = () => {
        onConfirmDelete();
        onClose();
    };

    return (
        <div className={styles['modal-overlay']}>
            <div className={styles['modal-container']}>
                <p className="text-lg font-semibold mb-2">¿Estás seguro que deseas eliminar?</p>
                <div className={styles['modal-buttons']}>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        onClick={handleConfirmDelete}
                    >
                        Sí, eliminar
                    </button>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
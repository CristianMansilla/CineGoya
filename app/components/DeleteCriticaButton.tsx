import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import DeleteConfirmationModal from "./DeleteModal/DeleteConfirmationModal";

interface DeleteCriticaButtonProps {
    onDelete: () => void;
}

const DeleteCriticaButton = ({ onDelete }: DeleteCriticaButtonProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                className="text-gray-300 hover:text-red-500"
                onClick={() => setIsModalOpen(true)}
            >
                <TrashIcon className="h-9 w-9" />
            </button>
            {isModalOpen && (
                <DeleteConfirmationModal onConfirmDelete={onDelete} onClose={() => setIsModalOpen(false)} />
            )}
        </>
    );
}

export default DeleteCriticaButton;

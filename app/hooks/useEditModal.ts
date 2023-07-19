import { useState } from "react";

interface EditModalOptions {
    onClose: () => void;
}

const useEditModal = ({ onClose }: EditModalOptions) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        onClose(); // Call the onClose function provided as a prop when closing the modal
    };

    return {
        isOpen,
        openModal,
        closeModal,
    };
};

export default useEditModal;

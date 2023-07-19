import { useState } from "react";

interface EditModalOptions {
    onClose: () => void;
}

const useEditModal = ({ onClose }: EditModalOptions) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
        console.log("Modal is open")
    };

    const closeModal = () => {
        setIsOpen(false);
        onClose();
    };

    return {
        isOpen,
        openModal,
        closeModal,
    };
};

export default useEditModal;

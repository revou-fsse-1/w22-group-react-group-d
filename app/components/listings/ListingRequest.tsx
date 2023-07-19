import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface RequestProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  // Existing props...
  typeOfRequest: string;
  onTypeOfRequestChange: (value: string) => void;
  description: string;
  onDescriptionChange: (value: string) => void;
  className?: string; // Add the className prop
}

const Request: React.FC<RequestProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel,
  // Existing props...
  typeOfRequest,
  onTypeOfRequestChange,
  description,
  onDescriptionChange,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleTypeOfRequestChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      onTypeOfRequestChange(value);
    },
    [onTypeOfRequestChange]
  );

  const handleDescriptionChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      const value = event.target.value;
      onDescriptionChange(value);
    },
    [onDescriptionChange]
  );

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div
        className="
          fixed 
          inset-0 
          z-50 
          flex 
          items-center 
          justify-center 
          bg-gray-900 bg-opacity-80
        "
      >
        <div
          className="
          bg-white 
          rounded-lg 
          overflow-hidden 
          w-full 
          max-w-lg 
          px-6 
          py-4 
          mx-4 
          md:mx-0
        "
        >
          <div className="flex items-center justify-between pb-4">
            <h2 className="text-xl font-semibold">Additional Request</h2>
            <button onClick={onClose}>
              <IoMdClose size={24} className="text-gray-600" />
            </button>
          </div>
          <div className="mb-4">
            <label
              htmlFor="typeOfRequest"
              className="block font-medium text-gray-700"
            >
              Type of Request:
            </label>
            <select
              id="typeOfRequest"
              value={typeOfRequest}
              onChange={handleTypeOfRequestChange}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="interior">Interior</option>
              <option value="events">Events</option>
              <option value="food_beverages">Food & Beverages</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block font-medium text-gray-700"
            >
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              rows={4}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border rounded-md resize-none focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end mt-6 bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500">
            <Button label="Submit" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Request;

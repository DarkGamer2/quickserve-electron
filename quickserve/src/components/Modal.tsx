import React, { useState, useEffect } from "react";

interface ModalProps {
  message: string;
  show: boolean;
  onClose: () => void;
  color: string; // Add color prop
}

const Modal: React.FC<ModalProps> = ({ message, show, onClose, color }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
    if (show) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 3000); // Auto close after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div
      className={`fixed top-0 left-0 w-full flex justify-center items-center transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className={`p-4 rounded shadow-md ${color}`}>
        <button
          className="absolute top-0 right-0 mt-2 mr-2 text-white"
          onClick={onClose}
        >
          &times;
        </button>
        <p className="text-white font-outfit">{message}</p>
      </div>
    </div>
  );
};

export default Modal;
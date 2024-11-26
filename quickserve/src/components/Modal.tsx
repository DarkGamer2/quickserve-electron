// FILE: src/components/Modal.tsx
import React, { useEffect } from 'react';

interface ModalProps {
  color: string;
  message: React.ReactNode;
  onClose: () => void;
  show: boolean;
  type: 'message' | 'admin';
  children?: React.ReactNode; // Add children prop to allow additional content
}

const Modal: React.FC<ModalProps> = ({ color, message, onClose, show, type, children }) => {
  useEffect(() => {
    if (type === 'message' && show) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose, type]);

  if (!show) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${type === 'message' ? 'top-0' : ''}`}>
      {type === 'message' ? (
        <div className={`fixed top-0 left-0 right-0 p-4 ${color} text-white text-center fade-out`}>
          {message}
        </div>
      ) : (
        <>
          <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
          <div className={`relative p-4 w-full max-w-md mx-auto ${color} rounded-md shadow-lg`}>
            <button className="absolute top-2 right-2 text-white" onClick={onClose}>
              &times;
            </button>
            <div>{message}</div>
            <div className="mt-4">{children}</div> {/* Render additional content */}
          </div>
        </>
      )}
    </div>
  );
};

export default Modal;
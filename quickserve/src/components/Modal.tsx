// FILE: src/components/Modal.tsx
import React, { useEffect, useState } from 'react';

interface ModalProps {
  color: string;
  message: React.ReactNode;
  onClose: () => void;
  show: boolean;
  type: 'message' | 'admin' | 'status';
  children?: React.ReactNode; // Add children prop to allow additional content
  onSubmit?: (newStatus: string) => void; // Add onSubmit prop for form submission
  variant?: 'success' | 'error'; // Add variant prop for success and error messages
}

const Modal: React.FC<ModalProps> = ({ color, message, onClose, show, type, children, onSubmit, variant }) => {
  const [newStatus, setNewStatus] = useState<string>('');

  useEffect(() => {
    if (type === 'message' && show) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose, type]);

  if (!show) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(newStatus);
    }
    onClose();
  };

  const getVariantColor = () => {
    if (variant === 'success') return 'bg-green-500';
    if (variant === 'error') return 'bg-red-500';
    return color;
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${type === 'message' ? 'top-0' : ''}`}>
      {type === 'message' ? (
        <div className={`fixed top-0 left-0 right-0 p-4 ${getVariantColor()} text-white text-center fade-out`}>
          {message}
        </div>
      ) : (
        <>
          <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
          <div className={`relative p-4 w-full max-w-md mx-auto ${color} rounded-md shadow-lg`}>
            <button className="absolute top-2 right-2 text-red-600" onClick={onClose}>
              &times;
            </button>
            <div className='text-center font-bebasneue dark:text-white'>{message}</div>
            {type === 'status' ? (
              <form onSubmit={handleSubmit} className="mt-4">
                <label className="block mb-2 text-white font-inter">Change Job Status:</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full p-2 mb-4 rounded-md"
                >
                  <option value="">Select Status</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Pending">Pending</option>
                </select>
                <button type="submit" className="bg-orange-500 text-white rounded-md px-3 py-2">
                  Submit
                </button>
              </form>
            ) : (
              <div className="mt-4">{children}</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Modal;
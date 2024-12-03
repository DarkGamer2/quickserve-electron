import React, { useState } from 'react';
import jsPDF from 'jspdf';
import Modal from '../../components/Modal';

interface ExportPDFProps {
  isModalVisible: boolean;
  handleCancel: () => void;
}

const ExportPDF: React.FC<ExportPDFProps> = ({ isModalVisible, handleCancel }) => {
  const [exporting, setExporting] = useState(false);
  const [location, setLocation] = useState('');

  const handleOk = () => {
    setExporting(true);
    exportPDF();
    setExporting(false);
    handleCancel();
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('This is your report', 10, 10);
    doc.save('report.pdf');
  };

  const browseLocation = () => {
    // Logic to open file explorer and select location
    // This is a placeholder as opening file explorer is not directly supported in browsers
    alert('Browse location clicked');
    setLocation('Selected location path'); // Update the location state
  };

  return (
    <Modal
      color="bg-blue-500"
      message="Do you want to export the PDF?"
      onClose={handleCancel}
      show={isModalVisible}
      type="admin"
    >
      <div className="flex flex-col items-center">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
          onClick={handleOk}
          disabled={exporting}
        >
          {exporting ? 'Exporting...' : 'Export'}
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={browseLocation}>
          Browse Location
        </button>
        {location && <p className="mt-2 text-white">Location: {location}</p>}
      </div>
    </Modal>
  );
};

export default ExportPDF;
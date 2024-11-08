// FILE: src/components/Report.tsx
import React from "react";

interface ReportProps {
  reportTitle: string;
  reportDescription: string;
  reportDate: string;
  reportThumbnail: string;
}

const Report: React.FC<ReportProps> = ({ reportTitle, reportDescription, reportDate, reportThumbnail }) => {
  return (
    <div className="bg-gray-100 rounded-md p-4 shadow-md mb-4 dark:bg-gray-800">
      <div className="flex items-center mb-4">
        <img src={reportThumbnail} alt="Report Thumbnail" className="h-16 w-16 mr-4" />
        <div>
          <h2 className="font-bold text-lg dark:text-white">{reportTitle}</h2>
          <p className="text-sm dark:text-gray-300">{reportDate}</p>
        </div>
      </div>
      <p className="dark:text-white">{reportDescription}</p>
    </div>
  );
};

export default Report;
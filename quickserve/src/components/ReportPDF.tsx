import SideNav from "./SideNav";
import { useTheme } from "../context/theme/Theme";
import ExportPDF from "../utils/pdf/Export";
import { useState } from "react";

interface PDFProps {
  name: string;
  jobType: string;
}
const ReportPDF = (props: PDFProps) => {
  const { theme } = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div
      className={`flex flex-col md:flex-row min-h-screen ${
        theme === "dark" ? "dark" : "light"
      }`}
    >
      <SideNav userId="userId"/>
      <div className="flex-1 p-4 dark:bg-black bg-gray-100">
        <h1 className="font-bebasneue text-4xl text-center dark:text-white mb-8">
          Report PDF
        </h1>
        <section
          id="general-details"
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4"
        >
          <div className="flex justify-between items-center">
            <div id="title" className="font-bold text-xl dark:text-white">
              Test Report
            </div>
            <div id="date" className="dark:text-white font-outfit">
              21/11/2024
            </div>
          </div>
        </section>
        <section
          id="report-details"
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4"
        >
          <table className="w-full">
            <tbody>
              <tr>
                <td className="font-bold dark:text-white">Name:</td>
                <td className="dark:text-white">{props.name}</td>
              </tr>
              <tr>
                <td className="font-bold dark:text-white">Job Type:</td>
                <td className="dark:text-white">Networking</td>
              </tr>
              <tr>
                <td className="font-bold dark:text-white">Job Status:</td>
                <td className="dark:text-white">Completed</td>
              </tr>
              <tr>
                <td className="font-bold dark:text-white">Hours:</td>
                <td className="dark:text-white">64</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section id="buttons" className="flex justify-center space-x-4 mt-4">
          <button
            className="bg-red-600 font-inter px-3 py-2 rounded-md text-white"
            onClick={showModal}
          >
            Export To PDF
          </button>
          <button className="bg-blue-600 font-inter px-3 py-2 rounded-md text-white">
            Print Report
          </button>
        </section>
      </div>
      <ExportPDF isModalVisible={isModalVisible} handleCancel={handleCancel} />
    </div>
  );
};

export default ReportPDF;

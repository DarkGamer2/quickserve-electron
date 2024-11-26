import { useTheme } from "../context/theme/Theme";

interface ReportProps {
  reportTitle: string;
  reportType: string;
  reportDate: string;
  reportThumbnail: string;
}

const Report: React.FC<ReportProps> = ({ reportTitle, reportType, reportDate, reportThumbnail }) => {
  const { theme } = useTheme();

  return (
    <div className={`${theme === "dark" ? "dark" : "light"}`}>
      <div className="bg-white dark:bg-black rounded-lg shadow-md p-6 mb-4">
        <div className="flex items-center mb-4">
          <img src={reportThumbnail} alt="Report Thumbnail" className="h-16 w-16 rounded-md mr-4" />
          <div>
            <h2 className="font-bold text-xl dark:text-white">{reportTitle}</h2>
            <p className="text-sm text-gray-500 dark:text-white">{new Date(reportDate).toLocaleDateString()}</p>
          </div>
        </div>
        <p className="text-gray-700 dark:text-white mb-4">{reportType}</p>
      </div>
    </div>
  );
};

export default Report;

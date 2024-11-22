import SideNav from "../components/SideNav";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Report from "../components/Report";
import { useTheme } from "../context/theme/Theme";
import LoopIcon from '@mui/icons-material/Loop';
import ReportThumbnail from "../assets/images/PHOTO-2024-10-12-19-42-55.jpg";

const Reports = () => {
  interface ReportType {
    id: string;
    title: string;
    description: string;
    date: string;
    reportType: string;
    // Add other properties of the report object here
  }
  
  const [reports, setReports] = useState<ReportType[]>([]);
  const [loading, setLoading] = useState(true);

  const { theme } = useTheme();

  const getReports = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/reports/list");
      setReports(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getReports();
  }, []);

  return (
    <div className={`flex flex-col md:flex-row min-h-screen ${theme === "dark" ? "dark" : "light"}`}>
      <SideNav />
      <div className="flex-1 p-4 dark:bg-black bg-gray-100">
        <h1 className="font-bebasneue text-4xl text-center dark:text-white mb-8">Reports</h1>
        {loading ? (
          <div className="flex items-center justify-center text-orange-500 font-inter">
            <LoopIcon className="animate-spin mr-2" />
            <span>Loading...</span>
          </div>
        ) : reports.length === 0 ? (
          <div className="font-inter text-center dark:text-white text-2xl">No Reports To Display</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {reports.map((report: ReportType) => (
              <Link to={`/reportDetails/${report.id}`} key={report.id}>
                <Report
                  reportThumbnail={ReportThumbnail}
                  reportTitle={report.title}
                  reportType={report.reportType}
                  reportDate={report.date}
                />
              </Link>
            ))}
          </div>
        )}
        <div className="text-center mt-8">
          <Link to="/generateReport">
            <button className="rounded-md py-2 px-3 bg-green-600 text-white font-inter">
              Generate Report
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Reports;
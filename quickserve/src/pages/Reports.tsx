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
    // Add other properties of the report object here
  }
  
  const [reports, setReports] = useState<ReportType[]>([]);
  const [loading, setLoading] = useState(true);

  const { theme } = useTheme();

  const getReports = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/reports/list");
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
    <div className={`min-h-screen flex ${theme === "dark" ? "dark" : "light"}`}>
      <div className="dark:bg-black">
        <SideNav />
      </div>
      <div className="flex-1 p-4 dark:bg-black">
        <h1 className="text-center font-bebasneue text-4xl mb-8 dark:text-white">Reports</h1>
        {loading ? (
          <div className="flex items-center justify-center text-orange-500 font-inter">
            <LoopIcon className="animate-spin mr-2" />
            <span>Loading...</span>
          </div>
        ) : reports.length === 0 ? (
          <p className="font-inter text-center dark:text-white">No Reports To Display</p>
        ) : (
          reports.map((report) => (
            <Report
              key={report.id}
              reportThumbnail={ReportThumbnail}
              reportTitle={report.title}
              reportDescription={report.description}
              reportDate={report.date}
            />
          ))
        )}
        <div className="text-center mt-4">
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
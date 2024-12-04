import SideNav from "../components/SideNav";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Report from "../components/Report";
import { useTheme } from "../context/theme/Theme";
import LoopIcon from '@mui/icons-material/Loop';
import ReportThumbnail from "../assets/images/PHOTO-2024-10-12-19-42-55.jpg"; // Placeholder image
import { useParams } from "react-router-dom";
import PlaceholderProfilePic from "../assets/images/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";
const Reports = () => {
  interface ReportType {
    _id: string; // Use _id for consistency with MongoDB ObjectId
    reportType: string;
    reportName: string;
    generationDate: string;
    status: string;
    requestedInformation: {
      filters: {
        category: string;
      };
      dateRange: {
        start: string;
        end: string;
      };
      fields: string[];
    };
    generatedData: any[]; // You can adjust this type as per your report data structure
  }

  const [reports, setReports] = useState<ReportType[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { theme } = useTheme();
  const { id } = useParams<{ id: string }>(); // Assuming you get the userId from the URL or context

  // Get reports from the backend
  const getReports = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/reports/list");
      setReports(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reports", error);
      setLoading(false);
    }
  };

  // Call getReports when the component mounts
  useEffect(() => {
    getReports();
  }, []);

  return (
    <div className={`flex min-h-screen ${theme === "dark" ? "dark" : "light"}`}>
    {/* Sidebar with fixed width */}
    <SideNav userId={`${id}`} profilePic={PlaceholderProfilePic} />
    
    {/* Main content with margin to avoid overlap */}
    <div className="flex-1 p-6 ml-16 dark:bg-black bg-gray-100">
      <h1 className="font-bebasneue text-4xl text-center dark:text-white mb-8">Reports</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoopIcon className="animate-spin text-orange-500 text-4xl" />
        </div>
      ) : reports.length === 0 ? (
        <div className="font-inter text-center dark:text-white text-2xl mt-8">
          No Reports To Display
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report: ReportType) => (
            <Link to={`/reportDetails/${report._id}`} key={report._id}>
              <Report
                reportThumbnail={ReportThumbnail}
                reportTitle={report.reportName}
                reportType={report.reportType}
                reportDate={new Date(report.generationDate).toLocaleDateString()}
              />
            </Link>
          ))}
        </div>
      )}

      <div className="text-center mt-8">
        <Link to="/generateReport">
          <button className="rounded-md py-2 px-6 bg-green-600 hover:bg-green-700 transition duration-300 text-white font-semibold">
            Generate Report
          </button>
        </Link>
      </div>
    </div>
  </div>
  );
};

export default Reports;

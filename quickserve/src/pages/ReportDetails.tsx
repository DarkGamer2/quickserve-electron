import SideNav from "../components/SideNav";
import { useTheme } from "../context/theme/Theme";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const ReportDetails = () => {
  const { theme } = useTheme();
  const { reportId } = useParams<{ reportId: string }>();
  const [reportDetails, setReportDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const fetchReportDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/reports/${reportId}`);
      setReportDetails(response.data);
      setLoading(false);
    } catch (error: any) {
      setError("Failed to fetch report details");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportDetails();
  }, [reportId]);

  return (
    <div className={`flex flex-col md:flex-row min-h-screen ${theme === "dark" ? "dark" : "light"}`}>
      <SideNav />
      <div className="flex-1 p-4 dark:bg-black bg-gray-100">
        <h1 className="text-center font-bebasneue text-4xl dark:text-white mb-8">Report Details</h1>
        {loading ? (
          <div className="flex items-center justify-center text-orange-500 font-inter">
            <span>Loading...</span>
          </div>
        ) : error ? (
          <div className="font-inter text-center dark:text-red-500">{error}</div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
            <h2 className="font-bold text-xl dark:text-white mb-4">{reportDetails.title}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{reportDetails.description}</p>
            <pre className="text-sm text-gray-600 dark:text-gray-300">{JSON.stringify(reportDetails, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportDetails;
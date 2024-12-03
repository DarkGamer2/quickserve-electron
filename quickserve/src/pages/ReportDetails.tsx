import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SideNav from "../components/SideNav";
import { useTheme } from "../context/theme/Theme";
import PlaceholderProfilePic from "../assets/images/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";
interface Report {
  _id: string;
  reportType: string;
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
  generatedData: any[];
}

const ReportDetails: React.FC = () => {
  const { theme } = useTheme();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { reportId } = useParams<{ reportId: string }>();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/reports/${reportId}`);
        if (response.data) {
          setReport(response.data);
        } else {
          setError("Report not found.");
        }
      } catch (err) {
        setError("Failed to fetch the report.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (reportId) {
      fetchReport();
    }
  }, [reportId]);

  if (loading) return <div>Loading report...</div>;
  if (error) return <div>{error}</div>;
  if (!report) return <div>Report not found</div>;

  return (
    <div className={`flex flex-col md:flex-row min-h-screen ${theme === "dark" ? "dark" : "light"}`}>
      <SideNav userId="userId" profilePic={PlaceholderProfilePic}/>
      <div className="flex-1 p-4 dark:bg-black bg-gray-100">
        <h1 className="font-bebasneue text-4xl text-center dark:text-white mb-8">
          {report.reportType} Report Details
        </h1>
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <div className="font-bold text-xl dark:text-white">Report Information</div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <p><strong>Status:</strong> {report.status}</p>
            <p>
              <strong>Date Range:</strong> {new Date(report.requestedInformation.dateRange.start).toLocaleDateString()} -{" "}
              {new Date(report.requestedInformation.dateRange.end).toLocaleDateString()}
            </p>
            <p><strong>Fields:</strong> {report.requestedInformation.fields.join(", ")}</p>
          </div>
        </section>
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
          <h3 className="font-bold text-xl dark:text-white mb-4">Generated Data</h3>
          <pre className="text-sm text-gray-600 dark:text-gray-300">{JSON.stringify(report.generatedData, null, 2)}</pre>
        </section>
      </div>
    </div>
  );
};

export default ReportDetails;
// FILE: Dashboard.tsx
import { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import Job from "../components/Job";
import LoopIcon from '@mui/icons-material/Loop';
import PCRepairImage from "../assets/images/pcrepairs.jpg";
import Coding from "../assets/images/coding.jpg";
import Networking from "../assets/images/networking.jpg";
import { useTheme } from "../context/theme/Theme";
import axios from "axios";
import { useParams } from "react-router-dom";

declare global {
  interface Window {
    electron: {
      sendJobExpiryWarning: (jobName: string, daysDiff: number) => void;
    };
  }
}

const statusColors: { [key: string]: string } = {
  "In Progress": "bg-inProgress",
  "Completed": "bg-completed",
  "On Hold": "bg-onHold",
  "Pending": "bg-pending",
};

const jobTypeImages: { [key: string]: string } = {
  "PC Repairs": PCRepairImage,
  "Web Development": Coding,
  "Networking": Networking,
};

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState<any>(null);
  const { theme } = useTheme();
  const { id } = useParams<{ id: string }>();

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/jobs/jobs", {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
      const jobsWithImages = response.data.map((job: any) => ({
        ...job,
        icon: jobTypeImages[job.jobType] || "",
      }));
      setJobs(jobsWithImages);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkJobExpiry = () => {
    const now = new Date();
    jobs.forEach((job: any) => {
      const expiryDate = new Date(job.creationDate);
      expiryDate.setDate(expiryDate.getDate() + 3); // Set expiry date to 3 days after creation date
      const timeDiff = expiryDate.getTime() - now.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if (daysDiff <= 3 && daysDiff >= 0) {
        window.electron.sendJobExpiryWarning(job.jobName, daysDiff);
      }
    });
  };

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id]);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (jobs.length > 0) {
      checkJobExpiry();
    }
  }, [jobs]);

  return (
    <div className={`flex flex-col md:flex-row min-h-screen ${theme === "dark" ? "dark" : "light"}`}>
      <SideNav userId={id || "someUserId"} />
      <div className="flex-1 p-4 dark:bg-black bg-gray-100">
        <h1 className="font-bebasneue text-3xl text-center dark:text-white">QuickServe</h1>
        <h3 className="font-inter text-center text-xl dark:text-white">
          Welcome <span className="text-orange-500">{user?.fullName}</span>!
        </h3>
        <h4 className="text-center font-outfit text-2xl my-2">Your Jobs</h4>

        <div>
          {loading ? (
            <div className="flex items-center justify-center text-orange-500 font-inter">
              <LoopIcon className="animate-spin mr-2" />
              <span>Loading...</span>
            </div>
          ) : jobs.length === 0 ? (
            <div className="font-inter text-center dark:text-white text-2xl">No Jobs To Display</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {jobs.map((job: any) => (
                <Job
                  key={job._id}
                  jobIcon={job.icon}
                  jobTitle={job.jobName}
                  jobDescription={job.jobDescription}
                  jobStatus={job.jobStatus}
                  statusColor={statusColors[job.jobStatus]}
                  jobId={job._id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
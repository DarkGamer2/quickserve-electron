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

//TODO:make sure all required data is being fetched from the API and rendered in the app.
const statusColors: { [key: string]: string } = {
  "In Progress": "bg-inProgress",
  "Completed": "bg-completed",
  "On Hold": "bg-onHold",
};

const jobTypeImages: { [key: string]: string } = {
  "PC Repairs": PCRepairImage,
  "Web Development": Coding,
  "Networking": Networking,
};

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const { theme } = useTheme();

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/jobs/jobs");
      const jobsWithImages = response.data.map((job: any) => ({
        ...job,
        icon: jobTypeImages[job.jobType] || "",
      }));
      setJobs(jobsWithImages);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className={`flex flex-col md:flex-row min-h-screen ${theme === "dark" ? "dark" : "light"}`}>
      <SideNav />
      <div className="flex-1 p-4 dark:bg-black bg-gray-100">
        <h1 className="font-bebasneue text-3xl text-center dark:text-white">QuickServe</h1>
        <h3 className="font-inter text-center text-xl dark:text-white">
          Welcome <span className="text-orange-500">User</span>!
        </h3>
        <h4 className="text-center font-outfit text-2xl my-2">Your Jobs</h4>

        <div>
          {loading ? (
            <div className="flex items-center justify-center text-orange-500 font-inter">
              <LoopIcon className="animate-spin mr-2" />
              <span>Loading...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {jobs.map((job: any) => (
                <Job
                  key={job._id}
                  jobIcon={job.icon}
                  jobTitle={job.jobName}
                  jobDescription={job.jobDescription}
                  jobStatus={job.status}
                  statusColor={statusColors[job.status]}
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
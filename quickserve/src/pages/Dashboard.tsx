import { useState, useEffect } from "react";
import PlaceholderProfilePic from "../assets/images/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
// Extend the Window interface to include the electron property
declare global {
  interface Window {
    electron: {
      sendJobExpiryWarning: (jobName: string, daysDiff: number) => void;
    };
  }
}
import { useParams } from "react-router-dom";
import axios from "axios";

import SideNav from "../components/SideNav";
import Job from "../components/Job";
import LoopIcon from '@mui/icons-material/Loop';

import PCRepairImage from "../assets/images/pcrepairs.jpg";
import Coding from "../assets/images/coding.jpg";
import Networking from "../assets/images/networking.jpg";
import { useTheme } from "../context/theme/Theme";
//TODO fetch user's profile picture & name
// Define the structure for Job objects
interface Job {
  _id: string;
  jobName: string;
  jobDescription: string;
  jobStatus: string;
  creationDate: string;
  icon: string;
  jobType: string;
}

// Color mapping for job statuses
const statusColors: { [key: string]: string } = {
  "In Progress": "bg-inProgress",
  "Completed": "bg-completed",
  "On Hold": "bg-onHold",
  "Pending": "bg-pending",
};

// Image mapping for job types
const jobTypeImages: { [key: string]: string } = {
  "PC Repairs": PCRepairImage,
  "Web Development": Coding,
  "Networking": Networking,
};

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [profilePic, setProfilePic] = useState<string>("");
  const { theme } = useTheme();
  const { id } = useParams<{ id: string }>(); // Retrieve the `id` from URL parameters

  // Fetch jobs data from the backend
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/jobs/jobs`);
      const jobsWithImages = response.data.map((job: Job) => ({
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

  // Fetch the user's profile picture using the `id`
  const fetchProfilePic = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users/${id}`);
      setProfilePic(response.data.profilePic);
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    }
  };

  // Check if any job is near its expiration date and send a warning
  const checkJobExpiry = () => {
    const now = new Date();
    jobs.forEach((job: Job) => {
      const expiryDate = new Date(job.creationDate);
      expiryDate.setDate(expiryDate.getDate() + 3); // Set expiry date to 3 days after creation date
      const timeDiff = expiryDate.getTime() - now.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if (daysDiff <= 3 && daysDiff >= 0) {
        window.electron.sendJobExpiryWarning(job.jobName, daysDiff);
      }
    });
  };

  // useEffect hooks to fetch data and set up checks
  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (id) {
      fetchProfilePic();
    }
  }, [id]);

  useEffect(() => {
    if (jobs.length > 0) {
      checkJobExpiry();
    }
  }, [jobs]);

  return (
    <div className={`flex flex-col md:flex-row min-h-screen ${theme === "dark" ? "dark" : "light"}`}>
      {/* Pass profilePic and userId to SideNav */}
      <SideNav userId={`${id}`} profilePic={profilePic || PlaceholderProfilePic} />
      <div className="flex-1 p-4 ml-20 dark:bg-black bg-gray-100">
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
          ) : jobs.length === 0 ? (
            <div className="font-inter text-center dark:text-white text-2xl">No Jobs To Display</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {jobs.map((job: Job) => (
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

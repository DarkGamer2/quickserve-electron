// FILE: Details.tsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import SideNav from "../components/SideNav";
import PCRepairImage from "../assets/images/pcrepairs.jpg";
import Coding from "../assets/images/coding.jpg";
import Networking from "../assets/images/networking.jpg";
import LoopIcon from '@mui/icons-material/Loop';
import { useTheme } from "../context/theme/Theme";
const jobTypeImages: { [key: string]: string } = {
  "PC Repairs": PCRepairImage,
  "Web Development": Coding,
  "Networking": Networking,
};

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const {theme}=useTheme();
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/jobs/${id}`);
        const jobDetails = response.data;
        jobDetails.icon = jobTypeImages[jobDetails.jobType] || "";
        setJob(jobDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) {
    return(
     <div className="flex">
      <SideNav/>
      <div className="flex items-center justify-center text-orange-500 font-inter">
      <LoopIcon className="animate-spin mr-2" />
      <span>Loading...</span>
    </div>
     </div>
    );
  }

  if (!job) {
    return(
      <div className="flex">
        <SideNav/>
        <p>Job Not Found</p>
      </div>
    )
  }

  return (
    <div className={`flex flex-col md:flex-row ${theme==="dark"?"dark":"light"}`}>
      <SideNav />
      <div className="flex-1 p-4 dark:bg-black">
        <h1 className="font-bebasneue text-center text-4xl dark:text-white">Job Details</h1>
        <div className="flex flex-col md:flex-row mt-4 space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-col space-y-4 flex-1">
            <div className="bg-gray-200 p-4 rounded-md dark:bg-slate-700">
              <h1 className="font-inter text-2xl text-center dark:text-white">Description</h1>
              <p className="font-inter text-center dark:text-white">{job.jobDescription}</p>
            </div>
            <div className="flex flex-col space-y-4 flex-1">
              <div id="date" className="bg-gray-200 p-4 rounded-md dark:bg-slate-700">
                <h1 className="font-inter text-2xl text-center dark:text-white">Date</h1>
                <p className="font-inter text-center dark:text-white">{job.jobRequestDate}</p>
              </div>
              <div id="assigned-by" className="bg-gray-200 p-4 rounded-md dark:bg-slate-700">
                <h1 className="font-inter text-2xl text-center dark:text-white">Assigned By</h1>
                <p className="font-inter text-center dark:text-white">{job.assignedBy}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-4 flex-1">
            <div className="bg-gray-200 p-4 rounded-md dark:bg-slate-700">
              <h1 className="font-inter text-2xl text-center dark:text-white">Requested By</h1>
              <p className="font-inter text-center dark:text-white">{job.jobRequester}</p>
            </div>
            <div
              id="status"
              className={`p-4 rounded-md flex flex-col justify-between h-full bg-gray-200 dark:bg-slate-700`} // Apply background color
            >
              <div>
                <h1 className="font-inter text-2xl text-center dark:text-white">Status</h1>
                <div className="text-center">
                  <button
                    className={`rounded-md px-3 py-1 text-center font-inter mt-4 ${job.statusColor} text-white`} // Apply background color to button
                  >
                    {job.status}
                  </button>
                </div>
              </div>
              <button className="bg-orange-500 text-white rounded-md px-3 py-1 text-center font-inter mt-4">
                Change Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
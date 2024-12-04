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
import Modal from "../components/Modal";
import PlaceholderProfilePic from "../assets/images/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";
//TODO - add API endpoint to change job status
const jobTypeImages: { [key: string]: string } = {
  "PC Repairs": PCRepairImage,
  "Web Development": Coding,
  "Networking": Networking,
};

const statusColors: { [key: string]: string } = {
  "In Progress": "bg-inProgress",
  "Completed": "bg-completed",
  "On Hold": "bg-onHold",
  "Pending": "bg-pending",
};

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const { theme } = useTheme();

  const handleOpenModal = (jobId: string) => {
    setSelectedJobId(jobId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJobId('');
  };

  const handleChangeJobStatus = async (newStatus: string) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/jobs/${selectedJobId}`, {
        jobStatus: newStatus,
      });
      console.log(response.data);
      setJob((prevJob: any) => ({
        ...prevJob,
        jobStatus: newStatus,
        statusColor: statusColors[newStatus] || "",
      }));
    } catch (error) {
      console.error("Error changing job status:", error);
    }
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/jobs/${id}`);
        const jobDetails = response.data;
        jobDetails.icon = jobTypeImages[jobDetails.jobType] || "";
        jobDetails.statusColor = statusColors[jobDetails.jobStatus] || "";
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
    return (
      <div className="flex flex-col md:flex-row min-h-screen">
        <SideNav userId="randomId" profilePic={PlaceholderProfilePic}/>
        <div className="flex-1 flex items-center justify-center text-orange-500 font-inter">
          <LoopIcon className="animate-spin mr-2" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex flex-col md:flex-row min-h-screen">
        <SideNav userId="randomId" profilePic={PlaceholderProfilePic}/>
        <div className="flex-1 flex items-center justify-center text-red-500 font-inter">
          <span>Job Not Found</span>
        </div>
      </div>
    );
  }

  const modalColor = theme === 'dark' ? 'bg-gray-800' : 'bg-white';

  return (
    <div className={`flex min-h-screen ${theme === "dark" ? "dark" : "light"}`}>
      <SideNav userId="randomId" profilePic={PlaceholderProfilePic} />
      {/* Main content with margin to respect sidebar width */}
      <div className="flex-1 p-6 ml-16 dark:bg-black bg-gray-100">
        <h1 className="font-bebasneue text-3xl text-center dark:text-white mb-6">Job Details</h1>
        
        <div className="flex flex-col md:flex-row mt-4 space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-col space-y-4 flex-1">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
              <h1 className="font-inter text-2xl text-center dark:text-white">Description</h1>
              <p className="font-inter text-center dark:text-white">{job.jobDescription}</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
              <h1 className="font-inter text-2xl text-center dark:text-white">Date</h1>
              <p className="font-inter text-center dark:text-white">{job.jobRequestDate}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
              <h1 className="font-inter text-2xl text-center dark:text-white">Assigned By</h1>
              <p className="font-inter text-center dark:text-white">{job.assignedBy}</p>
            </div>
          </div>

          <div className="flex flex-col space-y-4 flex-1">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
              <h1 className="font-inter text-2xl text-center dark:text-white">Requested By</h1>
              <p className="font-inter text-center dark:text-white">{job.jobRequester}</p>
            </div>

            <div className={`p-4 rounded-md flex flex-col justify-between bg-white dark:bg-gray-800 shadow-md`}>
              <h1 className="font-inter text-2xl text-center dark:text-white">Status</h1>
              <button className={`rounded-md px-4 py-2 mt-4 ${job.statusColor} text-white font-inter`}>
                {job.jobStatus}
              </button>
              <button
                className="bg-orange-500 text-white rounded-md px-4 py-2 mt-4 font-inter hover:bg-orange-600 transition duration-300"
                onClick={() => handleOpenModal(job._id)}
              >
                Change Status
              </button>
              <Modal
                color={modalColor}
                message="STATUS CHANGE"
                onClose={handleCloseModal}
                show={showModal}
                type="status"
                onSubmit={handleChangeJobStatus}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
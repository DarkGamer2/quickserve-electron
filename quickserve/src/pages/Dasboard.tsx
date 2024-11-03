// FILE: Dashboard.tsx
import { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import Job from "../components/Job";
import LoopIcon from '@mui/icons-material/Loop';
import PCRepairImage from "../assets/images/1d51ac9c-d8c0-403d-a9af-de98c8e8dff7.JPG";
import Coding from "../assets/images/coding.jpg";
import Networking from "../assets/images/networking.jpg";

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

const jobs = [
  {
    id: 1,
    jobName: "PC RAM Upgrade",
    icon: jobTypeImages["PC Repairs"],
    status: "In Progress",
    jobType: "PC Repairs",
    jobDescription: "Upgrade RAM to 16GB"
  },
  {
    id: 2,
    jobName: "Edit Footer On Website",
    icon: jobTypeImages["Web Development"],
    status: "Completed",
    jobType: "Web Development",
    jobDescription: "Add Links to Footer"
  },
  {
    id: 3,
    jobName: "Check Network Switch",
    icon: jobTypeImages["Networking"],
    status: "On Hold",
    jobType: "Networking",
    jobDescription: "Switch Malfunctioning"
  }
];

const Dashboard = () => {
  const [loading, setLoading] = useState(false);

  // const fetchJobs = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await invoke("fetch_jobs");
  //     setJobs(response);
  //     setLoading(false);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  useEffect(() => {
    // fetchJobs();
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      <SideNav />
      <div className="flex-1 p-4">
        <h1 className="font-bebasneue text-3xl text-center">QuickServe</h1>
        <h3 className="font-inter text-center text-xl">
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
                  key={job.id}
                  jobIcon={job.icon}
                  jobTitle={job.jobName}
                  jobDescription={job.jobDescription}
                  jobStatus={job.status}
                  statusColor={statusColors[job.status]}
                  jobId={job.id}
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
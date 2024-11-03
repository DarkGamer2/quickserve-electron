// FILE: Details.tsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PCRepairImage from "../assets/images/1d51ac9c-d8c0-403d-a9af-de98c8e8dff7.JPG";
import Coding from "../assets/images/coding.jpg";
import Networking from "../assets/images/networking.jpg";
import SideNav from "../components/SideNav";

const jobs = [
  {
    id: 1,
    jobName: "PC RAM Upgrade",
    icon: PCRepairImage,
    status: "In Progress",
    jobType: "PC Repairs",
    jobDescription: "Upgrade RAM from 8GB to 16GB",
    requestedBy: "Ronald Gobin",
    date: "2022-10-10",
    assignedBy: "Charlene Ramlochansingh",
    statusColor: "bg-inProgress",
  },
  {
    id: 2,
    jobName: "Edit Footer On Website",
    icon: Coding,
    status: "Completed",
    jobType: "Web Development",
    jobDescription: "Add Links to Footer",
    requestedBy: "John Doe",
    date: "2022-10-10",
    assignedBy: "Charlene Ramlochansingh",
    statusColor: "bg-completed",
  },
  {
    id: 3,
    jobName: "Check Network Switch",
    icon: Networking,
    status: "On Hold",
    jobType: "Networking",
    jobDescription: "Switch Malfunctioning",
    requestedBy: "Jane Doe",
    date: "2022-10-10",
    assignedBy: "Charlene Ramlochansingh",
    statusColor: "bg-onHold",
  },
];

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    const jobDetails = jobs.find((job) => job.id === parseInt(id || "0"));
    setJob(jobDetails);
  }, [id]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row">
      <SideNav />
      <div className="flex-1 p-4">
        <h1 className="font-bebasneue text-center text-4xl">Job Details</h1>
        <div className="flex flex-col md:flex-row mt-4 space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-col space-y-4 flex-1">
            <div className="bg-gray-200 p-4 rounded-md">
              <h1 className="font-inter text-2xl text-center">Description</h1>
              <p className="font-inter text-center">{job.jobDescription}</p>
            </div>
            <div className="flex flex-col space-y-4 flex-1">
              <div id="date" className="bg-gray-200 p-4 rounded-md">
                <h1 className="font-inter text-2xl text-center">Date</h1>
                <p className="font-inter text-center">{job.date}</p>
              </div>
              <div id="assigned-by" className="bg-gray-200 p-4 rounded-md">
                <h1 className="font-inter text-2xl text-center">Assigned By</h1>
                <p className="font-inter text-center">{job.assignedBy}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-4 flex-1">
            <div className="bg-gray-200 p-4 rounded-md">
              <h1 className="font-inter text-2xl text-center">Requested By</h1>
              <p className="font-inter text-center">{job.requestedBy}</p>
            </div>
            <div
              id="status"
              className={`p-4 rounded-md flex flex-col justify-between h-full bg-gray-200`} // Apply background color
            >
              <div>
                <h1 className="font-inter text-2xl text-center">Status</h1>
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
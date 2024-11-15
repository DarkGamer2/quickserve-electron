// FILE: src/components/Job.tsx
import { Link } from "react-router-dom";
import { useTheme } from "../context/theme/Theme";

interface JobProps {
  jobIcon: string;
  jobTitle: string;
  jobDescription: string;
  jobStatus: string;
  statusColor: string;
  jobId: string;
}

const Job: React.FC<JobProps> = ({ jobIcon, jobTitle, jobStatus, statusColor, jobId }) => {
  const { theme } = useTheme();
  return (
    <div className={`${theme === "dark" ? "dark" : "light"}`}>
      <div className="bg-gray-100 rounded-md inline-block p-4 shadow-md mx-2 dark:bg-black">
        <div className="flex flex-col items-center mb-4">
          <img src={jobIcon} alt="job icon" className="h-16 w-16 mt-2" />
        </div>
        <h1 className="text-center dark:text-white">{jobTitle}</h1>
        {/* <p className="text-center dark:text-white">{jobDescription}</p> */}
        <div className="flex justify-center mt-4">
          <button className={`${statusColor} py-2 px-3 text-center text-white rounded-md`}>
            {jobStatus}
          </button>
        </div>
        <div className="flex justify-center mt-2">
          <Link to={`/${jobId}`}>
            <button className="text-orange-500 font-inter">More Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Job;
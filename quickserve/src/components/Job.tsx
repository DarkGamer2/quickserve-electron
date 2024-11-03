// FILE: Job.tsx
import { Link } from "react-router-dom";
interface JobProps {
    jobIcon: string;
    jobTitle: string;
    jobDescription: string;
    jobStatus: string;
    statusColor: string;
    jobId:number
  };
  
  const Job = (props: JobProps) => {
    return (
      <div className="bg-gray-100 rounded-md inline-block p-4 shadow-md mx-2">
        <div className="flex flex-col items-center mb-4">
          <img src={props.jobIcon} alt="job icon" className="h-16 w-16 mt-2" />
        </div>
        <h1 className="text-center">{props.jobTitle}</h1>
        <p className="text-center">{props.jobDescription}</p>
        <div className="flex justify-center mt-4">
          <button className={`${props.statusColor} py-2 px-3 text-center text-white rounded-md`}>
            {props.jobStatus}
          </button>
        </div>
        <div className="flex justify-center mt-2">
         <Link to={`/${[props.jobId]}`}>
         <button className="text-orange-500 font-inter">More Details</button>
         </Link>
        </div>
      </div>
    );
  };
  
  export default Job;
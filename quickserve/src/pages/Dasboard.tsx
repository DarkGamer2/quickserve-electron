import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import SideNav from "../components/SideNav";
import Job from "../components/Job";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await invoke("fetch_jobs");
      setJobs(response);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <SideNav />
      <div>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          jobs.map((job: any) => <Job jobIcon={job.icon} key={job.id} />)
        )}
      </div>
    </div>
  );
};

export default Dashboard;
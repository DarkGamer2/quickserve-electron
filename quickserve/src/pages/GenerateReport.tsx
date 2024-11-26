import SideNav from "../components/SideNav";
import { useTheme } from "../context/theme/Theme";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";

//TODO - Finish the GenerateReport component
//TODO - Add the ability to generate reports manually or automatically
//TODO - Add the ability to select the data to generate
//TODO - Add Notifications for when report is generated successfully or not.
//TODO - Add OS Level Notfications for successful automatic report generation
interface Employee{
  _id:string;
  name:string;
  email:string;
}
const GenerateReport = () => {
  const { theme } = useTheme();
const [reportName, setReportName] = useState("");
const [dataType, setDataType] = useState("");
const [category, setCategory] = useState("");
const [reportType,setReportType]=useState("Manual");
const [frequency,setFrequency]=useState("");
const [startDate,setStartDate]=useState<string>("");
const [endDate,setEndDate]=useState<string>("");
const [employees,setEmployees]=useState([]);
const [informationRequired,setInformationRequired]=useState("");
const [showModal,setShowModal]=useState(false);
const [modalMessage,setModalMessage]=useState("");
const [modalColor,setModalColor]=useState("");
const submitReport = async (e:React.FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/api/reports/generate-report", {
        reportName,
        dataType,
        category,
        reportType,
        frequency,
        startDate,
        endDate,
        informationRequired
    },{
        headers: {
            "Content-Type": "application/json"
        }
    }
    ).then(()=>{
      setModalColor("bg-green-500")
      setModalMessage("Report Generated Successfully")
    }).catch(()=>{
      setModalColor("bg-red-600")
      setModalMessage("Error Generating Report")
    }).finally(() => {
      setShowModal(true);
    });
};

const handleCloseModal=()=>{
  setShowModal(false);
}

const handleReportTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setReportType(e.target.value);
};

const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setFrequency(e.target.value);
};
const fetchEmployees = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/users/users");
    setEmployees(response.data);
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
};

useEffect(() => {
  fetchEmployees();
}, []);

  return (
    <div className={`flex flex-col md:flex-row min-h-screen ${theme === "dark" ? "dark" : "light"}`}>
      <SideNav />
      <div className="flex-1 p-4 dark:bg-black bg-gray-100">
        <h1 className="font-bebasneue text-3xl text-center dark:text-white">Generate Report</h1>
        <div className="flex flex-col items-center justify-center mt-8">
          {/* Add your form or content here */}
          <form>
           <div>
           <label className="text-center dark:text-white">Report Name</label>
           <input type="text" value={reportName} onChange={(e) => setReportName(e.target.value)} className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-500 w-full dark:text-white"/>
           </div>
           <div id="data-type">
            <label className="text-center dark:text-white">Data Type</label>
           <select value={dataType} onChange={(e)=>setDataType(e.target.value)} className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-500 w-full dark:text-white">
            <option>Text</option>
            <option>CSV</option>
            <option>JSON</option>
           </select>
           </div>
           <div id="category">
            <label className="text-center dark:text-white">Category</label>
            <select value={category} onChange={(e)=>setCategory(e.target.value)} className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-500 w-full dark:text-white">
                <option>Networking</option>
                <option>PC Repairs</option>
                <option>Web Development</option>
            </select>
           </div>
           <div>
        <label htmlFor="reportType" className="text-center dark:text-white">Report Type:</label>
        <select id="reportType" value={reportType} onChange={handleReportTypeChange} className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-500 w-full dark:text-white">
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
        </select>
      </div>

      {reportType === "Automatic" && (
        <div>
          <label htmlFor="frequency">Frequency:</label>
          <select id="frequency" value={frequency} onChange={handleFrequencyChange}>
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Yearly</option>
          </select>
        </div>
      )}
      <div id="data">
        <h4 className="dark:text-white">Choose The Data To Generate</h4>
        <div id="employee-name">
          <label className="dark:text-white text-center">Employee</label>
          <select className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-500 w-full dark:text-white">
           {employees.map((employee:Employee)=>(
             <option key={employee._id}>{employee.email}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="dark:text-white text-center">Date Range</label>
          <div className="flex space-x-2">
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-500 w-full dark:text-white" />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-500 w-full dark:text-white" />
          </div>
        </div>
        <div>
          <label className="dark:text-white text-center">Information Required</label>
          <input type="text" value={informationRequired} onChange={(e) => setInformationRequired(e.target.value)} className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-500 w-full dark:text-white" />
        </div>
      </div>
           <div className="text-center">
            <button className="rounded-md py-2 px-3 bg-green-600 text-white font-inter mt-2" onClick={submitReport}>Generate Report</button>
           </div>
          </form>
          {showModal &&(
            <Modal color={modalColor} message={modalMessage} onClose={handleCloseModal} show={showModal} type="message"/>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateReport;
import SideNav from "../components/SideNav";
import { useTheme } from "../context/theme/Theme";
import { useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";
const GenerateReport = () => {
  const { theme } = useTheme();
const [reportName, setReportName] = useState("");
const [dataType, setDataType] = useState("");
const [category, setCategory] = useState("");
const [showModal,setShowModal]=useState(false);
const [modalMessage,setModalMessage]=useState("");
const [modalColor,setModalColor]=useState("");

const submitReport = async (e:React.FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/reports/generate", {
        reportName,
        dataType,
        category
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
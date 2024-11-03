import SideNav from "../components/SideNav";

const Reports=()=>{
    return(
        <div className="flex">
          <div>
            <SideNav/>
          </div>
          <div>
          <h1 className="text-center font-bebasneue">Reports</h1>
          <p className="font-inter text-center">No Reports To Display</p>
          <button className="rounded-md py-2 px-3 bg-green-600 text-white font-inter">Generate Report</button>
          </div>
        </div>
    )
}

export default Reports;
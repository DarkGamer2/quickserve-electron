import AddJobForm from "../components/AddJobForm"
import SideNav from "../components/SideNav"

const AddJob = () => {
  return (
    <div className="flex">
        <div>
            <SideNav/>
        </div>
        <div>
            <h1 className="text-center font-bebasneue">Add Job</h1>
            <AddJobForm/>
        </div>
    </div>
  )
}

export default AddJob
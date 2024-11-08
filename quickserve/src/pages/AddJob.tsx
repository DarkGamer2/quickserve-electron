import AddJobForm from "../components/AddJobForm";
import SideNav from "../components/SideNav";
import { useTheme } from "../context/theme/Theme";

const AddJob = () => {
  const { theme } = useTheme();
  return (
    <div className={`flex ${theme === "dark" ? "dark" : "light"}`}>
      <div>
        <SideNav />
      </div>
      <div className="flex-1 p-4 dark:bg-black">
        <h1 className="text-center font-bebasneue text-4xl mb-8 dark:text-white">Add Job</h1>
        <AddJobForm />
      </div>
    </div>
  );
};

export default AddJob;
import AddJobForm from "../components/AddJobForm";
import SideNav from "../components/SideNav";
import { useTheme } from "../context/theme/Theme";
import PlaceholderProfilePic from "../assets/images/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";
import { useParams } from "react-router-dom";
const AddJob = () => {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();

  return (
    <div className={`flex ${theme === "dark" ? "dark" : "light"}`}>
      <div>
      <SideNav userId={`${id}`} profilePic={ PlaceholderProfilePic} />
      </div>
      <div className="flex-1 p-4 dark:bg-black">
        <h1 className="text-center font-bebasneue text-4xl mb-8 dark:text-white">Add Job</h1>
        <AddJobForm />
      </div>
    </div>
  );
};

export default AddJob;
import SideNav from "../components/SideNav";
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <SideNav />
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <h1 className="text-center font-bebasneue text-4xl mb-8">Settings</h1>
        <div className="flex items-center mb-4">
          <p className="mr-2">Dark Mode</p>
          <ToggleOffIcon />
        </div>
        <div className="flex items-center mb-4">
          <p>Font Size</p>
        </div>
        <div className="text-center mb-4">
          <Link to="/profile">
            <button className="rounded-md py-2 px-3 text-white bg-orange-500">View Profile</button>
          </Link>
        </div>
        <div className="text-center">
          <button className="bg-red-600 font-inter py-3 px-2 text-center text-white rounded-md">Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
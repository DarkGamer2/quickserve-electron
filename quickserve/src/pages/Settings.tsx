import SideNav from "../components/SideNav";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import { Link } from "react-router-dom";
import { useTheme } from "../context/theme/Theme";
import { useFontSize } from "../context/font/Font";
const Settings = () => {
  const { theme, toggleTheme } = useTheme();
const {fontSize,setFontSize}=useFontSize();
  const handleFontSizeChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
    const newSize = e.target.value + 'px';
    setFontSize(newSize);
    document.documentElement.style.setProperty('--font-size', newSize);
  };
  return (
    <div className={`flex flex-col md:flex-row min-h-screen ${theme === "dark" ? "dark" : "light"}`}>
      <SideNav />
      <div className="flex-1 flex flex-col items-center justify-center p-4 dark:bg-black">
        <h1 className="text-center font-bebasneue text-4xl mb-8 dark:text-white">Settings</h1>
        <div className="flex items-center mb-4">
          <p className="mr-2 dark:text-white">Dark Mode</p>
          <button onClick={toggleTheme}>
            {theme === "dark" ? (
              <ToggleOnIcon className="text-green-500" />
            ) : (
              <ToggleOffIcon className="text-black" />
            )}
          </button>
        </div>
        <div className="flex items-center mb-4">
          <p className="mx-1 dark:text-white">Font Size</p>
          <select value={parseInt(fontSize)} onChange={handleFontSizeChange} className="rounded-md bg-slate-300 font-outfit py-2 my-1">
            <option>10</option>
            <option>12</option>
            <option>14</option>
            <option>16</option>
            <option>20</option>
          </select>
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
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/theme/Theme";

interface SideNavProps {
  profilePic: string; // Profile picture URL
  userId: string;     // User ID passed as a prop
}

const SideNav: React.FC<SideNavProps> = ({ profilePic }) => {
  const { theme } = useTheme();  // Custom theme context

  return (
    <div className={`${theme === "dark" ? "dark" : "light"}`}>
    <nav className="fixed top-0 left-0 h-screen w-20 dark:bg-black bg-gray-100 flex flex-col items-center">
      <NavLink to="/dashboard" className="py-6">
        <HomeIcon className="text-green-500" fontSize="large" />
      </NavLink>
      <NavLink to="/reports" className="py-6">
        <AssessmentIcon className="text-purple-600" fontSize="large" />
      </NavLink>
      <NavLink to="/addjob" className="py-6">
        <AssignmentIcon className="text-red-500" fontSize="large" />
      </NavLink>
      <NavLink to={`/settings`} className="py-6">
        <SettingsIcon className="text-orange-800" fontSize="large" />
      </NavLink>
      <div className="mt-auto mb-4">
        <img 
          src={profilePic} 
          alt="Profile" 
          className="w-12 h-12 rounded-full" 
        />
      </div>
    </nav>
  </div>
  );
};

export default SideNav;
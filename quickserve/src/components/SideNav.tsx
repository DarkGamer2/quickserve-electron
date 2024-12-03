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

const SideNav: React.FC<SideNavProps> = ({ profilePic, userId }) => {
  const { theme } = useTheme();  // Custom theme context

  return (
    <div className={`${theme === "dark" ? "dark" : "light"}`}>
      <div>
        <nav className="fixed top-0 left-0 h-screen w-10 list-none dark:bg-black">
          <NavLink to="/dashboard">
            <li className="text-green-500 py-6">
              <HomeIcon fontSize="large" />
            </li>
          </NavLink>
          <NavLink to="/reports">
            <li className="text-purple-600 py-6">
              <AssessmentIcon fontSize="large" />
            </li>
          </NavLink>
          <NavLink to="/addjob">
            <li className="text-red-500 py-6">
              <AssignmentIcon fontSize="large" />
            </li>
          </NavLink>
          {/* Updated Settings link with dynamic userId */}
          <NavLink to={`/settings`}>
            <li className="text-orange-800 py-6">
              <SettingsIcon fontSize="large" />
            </li>
          </NavLink>
          <li>
            <img 
              src={profilePic} 
              alt="Profile" 
              className="w-10 h-10 rounded-full mx-2 my-4" 
            />
          </li>
        </nav>
      </div>
    </div>
  );
};

export default SideNav;

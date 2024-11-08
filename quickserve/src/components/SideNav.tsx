import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/theme/Theme";
const SideNav: React.FC = () => {
  const { theme } = useTheme();
  return (
    <div className={`${theme==="dark"?"dark":"light"}`}>
      <div>
        <nav className={`h-screen w-20 list-none dark:bg-black`}>
          <NavLink to="/">
            <li className="text-green-500 py-6">
              <HomeIcon fontSize="large" />
            </li>
          </NavLink>
          <NavLink to="/reports">
            {" "}
            <li className="text-purple-600 py-6">
              <AssessmentIcon fontSize="large" />
            </li>
          </NavLink>
          <NavLink to="/addjob">
            <li className="text-red-500 py-6">
              <AssignmentIcon fontSize="large" />
            </li>
          </NavLink>
          <NavLink to="/settings">
            <li className="text-orange-800 py-6">
              <SettingsIcon fontSize="large" />
            </li>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default SideNav;

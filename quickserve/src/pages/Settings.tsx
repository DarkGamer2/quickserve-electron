import SideNav from "../components/SideNav";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "../context/theme/Theme";
import { useFontSize } from "../context/font/Font";
import Modal from "../components/Modal";
import Profile from "../pages/Profile"; // Import the Profile component
import { useState, useEffect } from "react";
import axios from "axios";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { fontSize, setFontSize } = useFontSize();
  const [showModal, setShowModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [modalType, setModalType] = useState<'message' | 'admin'>('message');
  const [modalMessage, setModalMessage] = useState('');
  const [modalColor, setModalColor] = useState('');
  const { id } = useParams<{ id: string }>();
  const [profileData, setProfileData] = useState<{ fullName: string; email: string; skillset?: string[] } | null>(null);
  const [profilePic, setProfilePic] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const API_URL = "http://localhost:3000";

  const fetchData = async () => {
    if (!id) {
      setError("User ID or email query parameter is required");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(`${API_URL}/api/users/profile/${id}`);
      if (data.profilePic) {
        setProfilePic(data.profilePic);
      }
      setProfileData(data);
      setLoading(false);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to fetch profile data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const showMessageModal = (message: string, color: string) => {
    setModalType('message');
    setModalMessage(message);
    setModalColor(color);
    setShowModal(true);
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = e.target.value + 'px';
    setFontSize(newSize);
    document.documentElement.style.setProperty('--font-size', newSize);
    showMessageModal('Font size updated successfully', 'bg-green-500');
  };

  const handleDeleteAccount = () => {
    setModalType('admin');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = () => {
    // Handle the admin password verification and account deletion logic here
    console.log("Admin Password:", adminPassword);
    setShowModal(false);
  };

  return (
    <div className={`flex flex-col md:flex-row min-h-screen ${theme === "dark" ? "dark" : "light"}`}>
      <SideNav/>
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
          <select
            value={parseInt(fontSize)}
            onChange={handleFontSizeChange}
            className="rounded-md bg-slate-300 font-outfit py-2 my-1 text-center"
          >
            <option value="10">10</option>
            <option value="12">12</option>
            <option value="14">14</option>
            <option value="16">16</option>
            <option value="20">20</option>
          </select>
        </div>
        <div className="text-center mb-4">
          <Link to={`/profile/${id}`}>
            <button className="rounded-md py-2 px-3 text-white bg-orange-500">View Profile</button>
          </Link>
        </div>
        <div className="text-center">
          <button
            className="bg-red-600 font-inter py-3 px-2 text-center text-white rounded-md"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
        </div>
      </div>
      {showModal && modalType === 'admin' && (
        <Modal
          color={theme === 'dark' ? 'bg-black' : 'bg-white'}
          message={
            <div>
              <p className="text-black mb-4 dark:text-white">Enter admin password to delete account:</p>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-500 w-full dark:text-white"
              />
              <div className="flex justify-end mt-4">
                <button
                  className="bg-green-500 text-white rounded-md px-3 py-2 mr-2"
                  onClick={handleConfirmDelete}
                >
                  Confirm
                </button>
                <button
                  className="bg-gray-500 text-white rounded-md px-3 py-2"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          }
          onClose={handleCloseModal}
          show={showModal}
          type="admin"
        />
      )}
      {showModal && modalType === 'message' && (
        <Modal
          color={modalColor}
          message={modalMessage}
          onClose={handleCloseModal}
          show={showModal}
          type="message"
        />
      )}
      {/* Render the Profile component and pass the profile data as props */}
      {profileData && (
        <Profile profileData={profileData} profilePic={profilePic} />
      )}
    </div>
  );
};

export default Settings;
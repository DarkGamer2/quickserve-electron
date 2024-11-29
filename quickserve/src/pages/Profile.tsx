import { useAuth } from "../context/auth/Auth";
import PlaceholderProfilePic from "../assets/images/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";
import SideNav from "../components/SideNav";
import { useTheme } from "../context/theme/Theme";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();  // Access user and logout from context
  const { theme } = useTheme();  // Access theme from context
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profileData, setProfileData] = useState<any>(null);
  const [profilePic, setProfilePic] = useState('');
  const { id } = useParams<{ id: string }>();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/users/${id}`);
      setProfileData(response.data);
      setProfilePic(response.data.profilePic);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  if (!user) {
    return (
      <div className={`flex flex-col md:flex-row min-h-screen ${theme === "dark" ? "dark" : "light"}`}>
        <SideNav userId="userid" />
        <div className="flex-1 flex items-center justify-center dark:bg-black bg-gray-100">
          <div className="text-center">
            <h1 className="font-bebasneue text-3xl dark:text-white">Profile</h1>
            <p className="font-inter text-center dark:text-white">Please Login</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col md:flex-row min-h-screen ${theme === 'dark' ? 'dark' : 'light'}`}>
      <SideNav userId={user._id} />
      <div className="flex-1 p-4 dark:bg-black bg-gray-100">
        <h1 className="font-bebasneue text-3xl text-center dark:text-white">Profile</h1>
        <div className="flex flex-col items-center justify-center mt-8">
          {loading ? (
            <div className="flex items-center justify-center text-orange-500 font-inter">
              <span>Loading...</span>
            </div>
          ) : error ? (
            <p className="font-inter text-center dark:text-red-500">{error}</p>
          ) : profileData ? (
            <>
              <img src={profilePic ? profilePic : PlaceholderProfilePic} alt="Profile Picture" className="rounded-full h-32 w-32 mb-4" />
              <h1 className='font-inter text-center dark:text-white'>Name: {profileData.fullName}</h1>
              <p className="font-inter text-center dark:text-white">Email: {profileData.email}</p>
              <p className="font-inter text-center dark:text-white">Skillset: {profileData.skillset ? profileData.skillset.join(', ') : 'No skillset available'}</p>
              <div className="text-center mt-4">
                <Link to={`/profile/${user._id}/edit`}>
                  <button className="bg-orange-500 text-white font-inter rounded-md text-center px-3 py-1">
                    Edit Profile
                  </button>
                </Link>
              </div>
              <div>
                <button onClick={logout} className="bg-red-500 text-white font-inter rounded-md text-center px-3 py-1 mt-4">
                  Logout
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;
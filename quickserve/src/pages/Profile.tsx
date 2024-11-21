import { useTheme } from "../context/theme/Theme";
import SideNav from "../components/SideNav";
import { useState, useEffect } from "react";
import PlaceholderProfilePic from "../assets/images/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";
import { Link } from "react-router-dom";
interface ProfileProps {
  profileData: {
    fullName: string;
    email: string;
    skillSet?: string[];
  } | null;
  profilePic: string;
}

const Profile = ({ profileData, profilePic }: ProfileProps) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (profileData) {
      setLoading(false);
    } else {
      setError("Failed to load profile data");
      setLoading(false);
    }
  }, [profileData]);

  return (
    <div className={`flex flex-col md:flex-row min-h-screen ${theme === 'dark' ? 'dark' : 'light'}`}>
      <SideNav />
      <div className="flex-1 p-4 dark:bg-black bg-gray-100">
        <h1 className="font-bebasneue text-3xl text-center dark:text-white">Profile</h1>
        <div className="flex flex-col items-center justify-center mt-8">
          {loading ? (
            <p className="font-inter text-center dark:text-white">Loading...</p>
          ) : error ? (
            <p className="font-inter text-center dark:text-red-500">{error}</p>
          ) : (
            <>
              <img src={profilePic ? profilePic : PlaceholderProfilePic} alt="Profile Picture" className="rounded-full h-32 w-32 mb-4" />
              <h1 className='font-inter text-center dark:text-white'>Name: {profileData?.fullName}</h1>
              <p className="font-inter text-center dark:text-white">Email: {profileData?.email}</p>
              <p className="font-inter text-center dark:text-white">Skillset: {profileData?.skillSet?.join(', ')}</p>
              <div className="text-center mt-4">
              <Link to="/profile/edit">  <button className="bg-red-500 text-white font-inter rounded-md text-center px-3 py-1">
                  Edit Profile
                </button></Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
// FILE: src/pages/Profile.tsx
import { Link, useParams } from "react-router-dom";
import { useTheme } from "../context/theme/Theme";
import { useState, useEffect } from "react";
import axios from "axios";
import SideNav from "../components/SideNav";
import PlaceholderProfilePic from "../assets/images/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";
import { useAuth } from "../context/auth/Auth";

const Profile = () => {
  const { theme } = useTheme();
  const { userId } = useParams<{ userId: string }>();
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<{ fullName: string; email: string; skillset?: string[] } | null>(null);
  const [profilePic, setProfilePic] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const API_URL = "http://localhost:3000";
  const fetchProfileData = async () => {
    const id = userId || user?._id;
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
    fetchProfileData();
  }, [userId, user?._id]);

  return (
    <div className={`flex flex-col md:flex-row min-h-screen ${theme === "dark" ? "dark" : "light"}`}>
      <SideNav userId={userId || user?._id || ""} />
      <div className="flex-1 p-4 dark:bg-black bg-gray-100">
        <h1 className="font-bebasneue text-3xl text-center dark:text-white">Profile</h1>
        <div className="flex flex-col items-center justify-center mt-8">
          {loading ? (
            <p className="font-inter text-center dark:text-white">Loading...</p>
          ) : error ? (
            <p className="font-inter text-center dark:text-red-500">{error}</p>
          ) : profileData ? (
            <>
              <h1 className="font-inter text-center dark:text-white">Name: {profileData.fullName}</h1>
              <p className="font-inter text-center dark:text-white">Email: {profileData.email}</p>
              <p className="font-inter text-center dark:text-white">
                Skillset: {profileData.skillset ? profileData.skillset.join(", ") : "No skillset available"}
              </p>
              <div>
                <img src={profilePic ? profilePic : PlaceholderProfilePic} alt="Profile Picture" className="rounded-full h-32 w-32 mb-4" />
              </div>
              <div className="text-center mt-4">
                <Link to="/profile/edit">
                  <button className="bg-red-500 text-white font-inter rounded-md text-center px-3 py-1">Edit Profile</button>
                </Link>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;
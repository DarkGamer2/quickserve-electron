import PlaceholderProfilePic from "../assets/images/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";
import SideNav from "../components/SideNav";
import { useTheme } from "../context/theme/Theme";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { theme } = useTheme();  // Access theme from context
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [profileData, setProfileData] = useState<any>({
    fullName: "John Doe",
    email: "test@gmail.com",
    skillset: "PC Repairs,Networking,Web Development",
  });
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


  return (
    <div className={`flex flex-col md:flex-row min-h-screen ${theme === 'dark' ? 'dark' : 'light'}`}>
      <SideNav userId={`${id}`} profilePic={profilePic || PlaceholderProfilePic} />
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
              <p className="font-inter text-center dark:text-white">Skillset: {profileData.skillset ? profileData.skillset: 'No skillset available'}</p>
              <div className="text-center mt-4">
                <Link to={`/profile/${id}/edit`}>
                  <button className="bg-orange-500 text-white font-inter rounded-md text-center px-3 py-1">
                    Edit Profile
                  </button>
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
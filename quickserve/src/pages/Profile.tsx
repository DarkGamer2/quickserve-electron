// FILE: src/components/Profile.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SideNav from '../components/SideNav';
import { useTheme } from '../context/theme/Theme';
import { useParams } from 'react-router-dom';
import { RootState, AppDispatch } from '../store';
import { fetchProfile } from '../store/profileSlice';
import PlaceholderProfilePic from "../assets/images/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";
const Profile = () => {
  const { theme } = useTheme();
  const { userId } = useParams<{ userId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const profileData = useSelector((state: RootState) => state.profile);
  const { email, skillset, loading, error,profilePic,fullName } = profileData;

  useEffect(() => {
    if (userId) {
      dispatch(fetchProfile(userId));
    }
  }, [dispatch, userId]);

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
              <h1 className='font-inter text-center dark:text-white'>Name: {fullName}</h1>
              <p className="font-inter text-center dark:text-white">Email: {email}</p>
              <p className="font-inter text-center dark:text-white">Skillset: {skillset}</p>
              <div className="text-center mt-4">
                <button className="bg-red-500 text-white font-inter rounded-md text-center px-3 py-1">
                  Edit Profile
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
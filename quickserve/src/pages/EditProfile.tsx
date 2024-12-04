import SideNav from '../components/SideNav';
import { useTheme } from '../context/theme/Theme';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import PlaceholderProfilePic from '../assets/images/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';

const EditProfile = () => {
  const { theme } = useTheme();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [skillset, setSkillset] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);  // State for file
  const [fileName, setFileName] = useState('');  // State for displaying file name
  const navigate = useNavigate();

  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("skillset", skillset);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);  // Append file to formData
    }

    try {
      await axios.post("http://localhost:3000/api/users/profile/edit", formData, {
        headers: { "Content-Type": "multipart/form-data" }  // Ensure correct headers for file upload
      });
      // Handle success (e.g., navigate or show a message)
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const handleCancel = () => {
    navigate(-1);  // Navigate back
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);  // Set the file state
      setFileName(e.target.files[0].name);   // Set the file name for display
    }
  };

  return (
    <div className={`flex flex-col md:flex-row min-h-screen ${theme === "dark" ? "dark" : "light"}`}>
      <SideNav userId='userId' profilePic={PlaceholderProfilePic} />
      <div className="flex-1 p-4 dark:bg-black bg-gray-100">
        <h1 className="font-bebasneue text-3xl text-center dark:text-white">Edit Profile</h1>
        <div className="flex flex-col items-center justify-center mt-8">
          <div className="w-full max-w-md">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-200 dark:bg-gray-700 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            />
          </div>
          <div className="w-full max-w-md mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-200 dark:bg-gray-700 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            />
          </div>
          <div className="w-full max-w-md mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Skillset</label>
            <input
              type="text"
              value={skillset}
              onChange={(e) => setSkillset(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-200 dark:bg-gray-700 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            />
          </div>
          <div className='w-full max-w-md mt-4'>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Profile Picture</label>
            <label className="cursor-pointer flex items-center justify-center mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-inter">
              <span>Choose File</span>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"  // Restrict to images
              />
            </label>
            {fileName && <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">{fileName}</p>}  {/* Display selected file name */}
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={handleSaveChanges}
              className="py-2 px-4 text-center text-white rounded-md bg-blue-500 hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
          <div className="flex justify-center mt-2">
            <button
              onClick={handleCancel}
              className="font-inter bg-red-500 py-2 px-4 text-center text-white rounded-md hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

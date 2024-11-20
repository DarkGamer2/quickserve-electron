import SideNav from '../components/SideNav';
import { useTheme } from '../context/theme/Theme';
import { useState } from 'react';

const EditProfile = () => {
  const { theme } = useTheme();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [skillset, setSkillset] = useState('');

  const handleSaveChanges = () => {
    // Handle save changes logic here
    console.log('Save changes:', { fullName, email, skillset });
  };

  const handleCancel = () => {
    // Handle cancel logic here
    console.log('Cancel');
  };

  return (
    <div className={`flex flex-col md:flex-row min-h-screen ${theme === "dark" ? "dark" : "light"}`}>
      <SideNav />
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
          <div className="flex justify-center mt-8">
            <button
              onClick={handleSaveChanges}
              className="py-2 px-3 text-center text-white rounded-md bg-blue-500"
            >
              Save Changes
            </button>
          </div>
          <div className="flex justify-center mt-2">
            <button
              onClick={handleCancel}
              className="font-inter bg-red-500 py-2 px-3 text-center text-white rounded-md"
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
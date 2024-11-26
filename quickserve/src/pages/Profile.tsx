import { useAuth } from "../context/auth/Auth";
import PlaceholderProfilePic from "../assets/images/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";
import SideNav from "../components/SideNav";

const Profile = () => {
  const { user, logout } = useAuth();  // Access user and logout from context

  if (!user) {
    return <p>Please log in to view your profile.</p>; // If no user data, ask user to log in
  }

  return (
    <div>
      <SideNav userId={user._id} />  {/* Pass userId to SideNav */}
      <img src={user.profilePic || PlaceholderProfilePic} alt="Profile Picture" />
      <h1 className="dark:text-white">{user.fullName}</h1>
      <p className="dark:text-white">{user.email}</p>
      <button onClick={logout}>Logout</button> {/* Logout button */}
    </div>
  );
};

export default Profile;

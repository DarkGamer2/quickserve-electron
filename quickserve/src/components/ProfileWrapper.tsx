import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Profile from "../pages/Profile";
import PlaceholderProfilePic from "../assets/images/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";

const ProfileWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const [profileData, setProfileData] = useState<{ fullName: string; email: string; skillset?: string[] } | null>(null);
  const [profilePic, setProfilePic] = useState<string>(PlaceholderProfilePic);
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return <Profile profileData={profileData} profilePic={profilePic} />;
};

export default ProfileWrapper;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTheme } from "../context/theme/Theme";

const RegisterForm = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [skillSet, setSkillSet] = useState<string[]>([]);
  const [role, setRole] = useState<string>("");
  const [profilePic, setProfilePic] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalVariant, setModalVariant] = useState<'success' | 'error'>('success');
  const [fileName, setFileName] = useState<string>('');  // State for displaying file name
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/register", {
        fullName,
        email,
        password,
        confirmPassword,
        skillSet,
        role,
        profilePic,
      });

      if (response.status === 201) {
        setModalMessage("Registration successful! Please log in.");
        setModalVisible(true);
        setModalVariant("success");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setModalMessage("Registration failed. Please try again.");
      setModalVisible(true);
      setModalVariant("error");
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className={`${theme === "dark" ? "dark" : "light"}`}>
      <h1 className="font-bebasneue text-center text-2xl dark:text-white">Register</h1>
      <div id="register-form" className="flex justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md p-8">
          <div>
            <label className="block text-center dark:text-white">Full Name</label>
            <input
              className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-600 dark:text-white w-full"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-center dark:text-white">Email</label>
            <input
              className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-600 dark:text-white w-full"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-center dark:text-white">Password</label>
            <input
              className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-600 dark:text-white w-full"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-center dark:text-white">Confirm Password</label>
            <input
              className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-600 dark:text-white w-full"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-center dark:text-white">Skillset</label>
            <input
              className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-600 dark:text-white w-full"
              type="text"
              value={skillSet.join(",")}
              onChange={(e) => setSkillSet(e.target.value.split(","))}
            />
          </div>
          <div>
            <label className="block text-center dark:text-white">Role</label>
            <input
              className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-600 dark:text-white w-full"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
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
          <div className="text-center">
            <button
              type="submit"
              className="rounded-md bg-orange-400 text-white uppercase py-3 px-2 my-2 w-full"
            >
              Register
            </button>
          </div>
          <div className="text-center">
            <Link to="/">
              <button
                type="button"
                className="rounded-md bg-red-500 text-white uppercase py-3 px-2 my-2 w-full"
              >
                Go Back
              </button>
            </Link>
          </div>
        </form>
      </div>

      <Modal show={modalVisible} onClose={closeModal} message={modalMessage} color="bg-green-500" type="message" variant={modalVariant}/>
    </div>
  );
};

export default RegisterForm;
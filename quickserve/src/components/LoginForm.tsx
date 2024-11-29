import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth/Auth";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import { useTheme } from "../context/theme/Theme";
const LoginForm = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [accountEmail, setAccountEmail] = useState<string>("");
  const [accountPassword, setAccountPassword] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { login } = authContext;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email and password
    if (!accountEmail || !accountPassword) {
      setModalMessage("Please enter both email and password.");
      setModalVisible(true);
      return;
    }

    try {
      await login(accountEmail, accountPassword);
      setModalMessage("Login successful!");
      setModalVisible(true);

      // Navigate to another page on successful login
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error logging in:", error);
      let errorMessage = "An error occurred. Please try again later.";
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 500) {
          errorMessage = "Internal server error. Please try again later.";
        } else if (error.response.status === 401) {
          errorMessage = "Invalid email or password.";
        } else {
          errorMessage = error.response.data.message || errorMessage;
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "No response from server. Please check your network connection.";
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message;
      }
      setModalMessage(errorMessage);
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className={`${theme==="dark"?"dark":"light"}`}>
      <h1 className="font-bebasneue text-center text-2xl">Login</h1>
      <div id="login-form" className="flex justify-center">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-center dark:text-white">Email</label>
            <input
              className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-600 dark:text-white"
              type="text"
              value={accountEmail}
              onChange={(e) => setAccountEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-center dark:text-white">Password</label>
            <input
              className="rounded-md bg-slate-300 font-outfit py-2 my-1 dark:bg-slate-600 dark:text-white"
              type="password"
              value={accountPassword}
              onChange={(e) => setAccountPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="rounded-md bg-orange-400 text-white uppercase py-3 px-2 my-2 w-full"
            >
              Login
            </button>
          </div>
          <div className="text-center">
            <Link to="/register">
              <button
                type="button"
                className="rounded-md bg-green-400 text-white uppercase py-3 px-2 my-2 w-full"
              >
                Register
              </button>
            </Link>
          </div>
        </form>
      </div>
      <Modal show={modalVisible} onClose={closeModal} message={modalMessage} color="defaultColor" type="message"/>
    </div>
  );
};

export default LoginForm;
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import { useTheme } from "../context/theme/Theme";
import axios from "axios";
const LoginForm = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [accountEmail, setAccountEmail] = useState<string>("");
  const [accountPassword, setAccountPassword] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/api/auth/login", {
      email: accountEmail,
      password: accountPassword,
    }).then((response) => {
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", accountEmail);
        navigate("/dashboard");
      }
    }).catch((error) => {
      console.log(error);
      setModalMessage("Invalid email or password");
      setModalVisible(true);
    });
   
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
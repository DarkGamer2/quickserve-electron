import RegisterForm from "../components/RegistrationForm";
import { useTheme } from "../context/theme/Theme";

const Register = () => {
  const { theme } = useTheme();

  return (
    <div className={`flex flex-col md:flex-row min-h-screen ${theme === "dark" ? "dark" : "light"}`}>
      <div className="flex-1 p-4 dark:bg-black bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white dark:bg-black rounded-md shadow-md">
          <h1 className="font-bebasneue text-3xl text-center dark:text-white mb-6">QuickServe</h1>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
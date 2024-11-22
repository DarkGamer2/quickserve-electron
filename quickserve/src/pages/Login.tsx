import LoginForm from "../components/LoginForm";
import { useTheme } from "../context/theme/Theme";

const Login = () => {
  const { theme } = useTheme();

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${theme === "dark" ? "dark" : "light"}`}>
      <div className="flex-1 p-4 dark:bg-black bg-gray-100 w-full max-w-md mx-auto rounded-lg shadow-md">
        <h1 className="text-center font-bebasneue text-4xl mb-8 dark:text-white">QuickServe</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
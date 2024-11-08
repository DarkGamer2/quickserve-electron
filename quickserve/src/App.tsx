import "./App.css";
import Dashboard from "./pages/Dasboard";
import Login from "./pages/Login";
import { useTheme } from "./context/theme/Theme";
function App() {
  const { theme } = useTheme();
  return (
    <main className={` ${theme==="dark"?"dark":"light"}`}>
      <div className="dark:bg-black">

      <Dashboard/>
      </div>
      {/* <Login /> */}
    </main>
  );
}

export default App;

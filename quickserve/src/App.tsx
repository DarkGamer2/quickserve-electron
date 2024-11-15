import "./App.css";
import { useTheme } from "./context/theme/Theme";
import Login from "./pages/Login";
function App() {
  const { theme } = useTheme();
  return (
    <main className={` ${theme==="dark"?"dark":"light"}`}>
      <div className="dark:bg-black">

  <Login/>
      </div>
    
    </main>
  );
}

export default App;

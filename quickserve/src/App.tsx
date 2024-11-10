import "./App.css";
import Login from "./pages/Login";
import { useTheme } from "./context/theme/Theme";
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

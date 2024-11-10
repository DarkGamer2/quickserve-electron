import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Dashboard from "./pages/Dasboard";
import Details from "./pages/Details";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import AddJob from "./pages/AddJob";
import { Provider } from "react-redux";
import store from "./store/index";
import Profile from "./pages/Profile";
import { ThemeProvider } from "./context/theme/Theme";
import GenerateReport from "./pages/GenerateReport";
import { FontSizeProvider } from "./context/font/Font";
import AuthProvider from "./context/auth/Auth";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/:id",
    element: <Details />,
  },
  {
    path: "/reports",
    element: <Reports />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/addjob",
    element: <AddJob />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  { path: "/generateReport", element: <GenerateReport /> },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider>
    <AuthProvider>
    <FontSizeProvider>
  <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </FontSizeProvider>
    </AuthProvider>
  
  </ThemeProvider>
);

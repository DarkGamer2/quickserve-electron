import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";  // Settings page import
import AddJob from "./pages/AddJob";
import Profile from "./pages/Profile";
import GenerateReport from "./pages/GenerateReport";
import { Provider } from "react-redux";
import store from "./store/index";
import { ThemeProvider } from "./context/theme/Theme";
import { FontSizeProvider } from "./context/font/Font";
import { AuthProvider } from "./context/auth/Auth";
import PrivateRoute from "./components/PrivateRoute";
import Error from "./pages/Error";
import EditProfile from "./pages/EditProfile";
import ReportDetails from "./pages/ReportDetails";
import ReportPDF from "./components/ReportPDF";

// Create the router with correct paths
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <Error />,
    },
    {
      path: "/register",
      element: <Register />,
      errorElement: <Error />,
    },
    {
      path: "/dashboard",
      element:(
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      ),
      errorElement: <Error />,
    },
    {
      path: "/details/:id",
      element: <Details />,
      errorElement: <Error />,
    },
    {
      path: "/reports",
      element: <Reports />,
      errorElement: <Error />,
    },
    // Corrected path for Settings page
    {
      path: "/settings/:id",
      element: <Settings />,
      errorElement: <Error />,
    },
    {
      path: "/addjob",
      element: <AddJob />,
      errorElement: <Error />,
    },
    {
      path: "/profile/:id",    // Correct path for profile page
      element: (
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      ),
      errorElement: <Error />,
    },
    {
      path: "/profile/:id/edit",
      element: <EditProfile />,
      errorElement: <Error />,
    },
    {
      path: "/generateReport",
      element: <GenerateReport />,
      errorElement: <Error />,
    },
    {
      path: "/reportDetails/:reportId",
      element: <ReportDetails />,
      errorElement: <Error />,
    },
    // {
    //   path: "/reportDetails/:reportId/pdf",
    //   element: <ReportPDF />,
    //   errorElement: <Error />,
    // },
  ],
  {
    future: {
      v7_skipActionErrorRevalidation: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
    },
  }
);

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

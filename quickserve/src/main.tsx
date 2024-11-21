import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import AddJob from "./pages/AddJob";
import Profile from "./pages/Profile";
import GenerateReport from "./pages/GenerateReport";
import { Provider } from "react-redux";
import store from "./store/index";
import { ThemeProvider } from "./context/theme/Theme";
import { FontSizeProvider } from "./context/font/Font";
import { AuthProvider } from "./context/auth/Auth";
import Report from "./components/Report";
import Error from "./pages/Error";
import EditProfile from "./pages/EditProfile";
import PlaceholderProfilePic from "./assets/images/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <Error />
    },
    {
      path: "/register",
      element: <Register />,
      errorElement: <Error />
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      errorElement: <Error />
    },
    {
      path: "/details/:id",
      element: <Details />,
      errorElement: <Error />
    },
    {
      path: "/reports",
      element: <Reports />,
      errorElement: <Error />
    },
    {
      path: "/settings",
      element: <Settings />,
      errorElement: <Error />
    },
    {
      path: "/addjob",
      element: <AddJob />,
      errorElement: <Error />
    },
    {
      path: "/profile/:id",
      element: <Profile profileData={{ fullName: "John Doe", email: "john.doe@example.com", skillSet: ["Web Development", "PC Repairs", "Networking"] }} profilePic={PlaceholderProfilePic} />,
      errorElement: <Error />
    },
    {
      path: "/generateReport",
      element: <GenerateReport />,
      errorElement: <Error />
    },
    {
      path: "/report/:reportId",
      element: <Report reportTitle="Sample Title" reportDescription="Sample Description" reportDate={new Date().toISOString()} reportThumbnail="sample-thumbnail.png" />,
      errorElement: <Error />
    },
    {
      path: "/profile/edit",
      element: <EditProfile />
    }
  ],
  {
    future: {
      v7_skipActionErrorRevalidation: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true // Opt into React Router v7 revalidation behavior
    }
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
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import GetStartedPage from "./pages/GetStarted";
import VolunteerForm from "./pages/VolunteerForm";
import IndividualForm from "./pages/individual_form";
import NGOForm from "./pages/NGOform";
import Login from "./pages/Login";
import Navbar from "./components/navbar";
import DesktopNavbar from "./components/DesktopNavbar";
import UserProfilePage from "./pages/Profile";
import Notification from "./pages/Notification";
import Donate from "./pages/Donate";
import AddNeed from "./pages/AddNeed";
import Setting from "./components/Setting";
import "./App.css";

function App() {
  return (
    <Router>
      <DesktopNavbar />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/get-started" element={<GetStartedPageWithNavigation />} />
        <Route path="/volunteer-form" element={<VolunteerForm />} />
        <Route
          path="/individual-form"
          element={<IndividualFormWithNavigation />}
        />
        <Route path="/ngo-form" element={<NGOForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/add-need" element={<AddNeed />} />
      </Routes>
    </Router>
  );
}

function IndividualFormWithNavigation() {
  const navigate = useNavigate();

  return <IndividualForm onBack={() => navigate("/")} />;
}

function GetStartedPageWithNavigation() {
  const navigate = useNavigate();

  const handleNavigate = (page: string) => {
    // Map the page names to routes
    const routeMap: { [key: string]: string } = {
      "individual-form": "/individual-form",
      "ngo-form": "/ngo-form",
      "volunteer-form": "/volunteer-form",
    };
    const route = routeMap[page] || "/";
    navigate(route);
  };

  return (
    <GetStartedPage onNavigate={handleNavigate} onBack={() => navigate("/")} />
  );
}

export default App;

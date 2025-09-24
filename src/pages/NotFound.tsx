import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

function NotFound() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">The page you are looking for does not exist.</p>
      <Button onClick={handleRedirect} className="px-6 py-2">
        Go to Landing Page
      </Button>
    </div>
  );
}

export default NotFound;

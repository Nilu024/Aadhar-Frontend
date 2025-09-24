import { Link } from "react-router-dom";
import { Home, Bell, PlusCircle, HeartHandshake, User } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md md:hidden z-50">
      <ul className="flex justify-around items-center max-w-lg mx-auto py-2">
        <Link to={"/"}>
          <li className="flex flex-col items-center text-gray-600 hover:text-blue-600 cursor-pointer">
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </li>
        </Link>
        <Link to="/notifications">
          <li className="flex flex-col items-center text-gray-600 hover:text-blue-600 cursor-pointer">
            <Bell size={24} />
            <span className="text-xs mt-1">Notifications</span>
          </li>
        </Link>
        <Link to="/add-need">
          <li className="flex flex-col items-center text-gray-600 hover:text-blue-600 cursor-pointer">
            <PlusCircle size={28} />
            <span className="text-xs mt-1">Add</span>
          </li>
        </Link>
        <Link to="/donate">
          <li className="flex flex-col items-center text-gray-600 hover:text-blue-600 cursor-pointer">
            <HeartHandshake size={24} />
            <span className="text-xs mt-1">Donate</span>
          </li>
        </Link>
        <Link to="/profile">
          <li className="flex flex-col items-center text-gray-600 hover:text-blue-600 cursor-pointer">
            <User size={24} />
            <span className="text-xs mt-1">Account</span>
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;

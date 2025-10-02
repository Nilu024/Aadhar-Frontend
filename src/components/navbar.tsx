import { Link, useLocation } from "react-router-dom";
import { Home, Bell, PlusCircle, HeartHandshake, User } from "lucide-react";

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-lg md:hidden z-50">
      <ul className="flex justify-around items-center max-w-lg mx-auto py-3">
        <Link to="/">
          <li className={`flex flex-col items-center cursor-pointer transition-colors ${isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </li>
        </Link>
        <Link to="/notifications">
          <li className={`flex flex-col items-center cursor-pointer transition-colors ${isActive('/notifications') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
            <Bell size={24} />
            <span className="text-xs mt-1">Notifications</span>
          </li>
        </Link>
        <Link to="/add-need">
          <li className={`flex flex-col items-center cursor-pointer transition-colors ${isActive('/add-need') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
            <PlusCircle size={28} />
            <span className="text-xs mt-1">Add</span>
          </li>
        </Link>
        <Link to="/donate">
          <li className={`flex flex-col items-center cursor-pointer transition-colors ${isActive('/donate') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
            <HeartHandshake size={24} />
            <span className="text-xs mt-1">Donate</span>
          </li>
        </Link>
        <Link to="/profile">
          <li className={`flex flex-col items-center cursor-pointer transition-colors ${isActive('/profile') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
            <User size={24} />
            <span className="text-xs mt-1">Account</span>
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;

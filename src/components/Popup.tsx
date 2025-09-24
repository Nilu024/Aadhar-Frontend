import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface PopupProps {
  message: string;
  onClose: () => void;
  onLogin?: () => void;
  onRegister?: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, onClose, onLogin, onRegister }) => {
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      setTimeout(() => setShow(true), 10);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      setVisible(false);
      onClose();
    }, 300);
  };

  const handleAction = (action: () => void) => {
    setShow(false);
    setTimeout(() => {
      setVisible(false);
      action();
    }, 300);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-trans bg-opacity-10 z-50 backdrop-blur-md">
      <div className={`
        relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 
        rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700
        transform transition-all duration-300 ease-out
        ${show ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}
      `}>
        {/* Decorative elements */}
        <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-blue-500"></div>
        <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-purple-500"></div>
        
        <div className="relative z-10">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
            </div>
          </div>
          
          {/* Message */}
          <p className="mb-6 text-lg text-gray-800 dark:text-gray-200 font-medium text-center leading-relaxed">
            {message}
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              className="
                bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700
                text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg
                transform hover:-translate-y-0.5 transition-all duration-200
                border-0
              "
              onClick={() => onLogin && handleAction(onLogin)}
            >
              Login
            </Button>
            
            <Button
              variant="secondary"
              className="
                bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700
                text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg
                transform hover:-translate-y-0.5 transition-all duration-200
                border-0
              "
              onClick={() => onRegister && handleAction(onRegister)}
            >
              Register
            </Button>
            
            <Button
              variant="outline"
              className="
                bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800
                text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200
                font-medium py-3 rounded-xl border border-gray-300 dark:border-gray-600
                transition-colors duration-200
              "
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
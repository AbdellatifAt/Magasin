import React, { useEffect, useState } from 'react'


import { useNotificationContext } from '../hooks/useNotificationContext';

const Notification = () => {
   const { notification } = useNotificationContext();
   const [isVisible, setIsVisible] = useState(false);


   useEffect(() => {
      if (notification) {
          setIsVisible(true);
          // Cache la notification après 3 secondes
          const timer = setTimeout(() => {
              setIsVisible(false);
          }, 3000);

          return () => clearTimeout(timer);
      }
  }, [notification]);

   const notificationStyles = {
      info: 'bg-blue-500 text-white',
      success: 'bg-green-500 text-white',
      error: 'bg-red-500 text-white',
      warning: 'bg-yellow-500 text-black',
  };

   if (!notification) return null;

    return (
        <div
        className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg z-50 transition-all duration-500 ease-in-out transform ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
        } ${notificationStyles[notification.type]}`}
    >
        {notification.message}
    </div>
     );
}

export default Notification
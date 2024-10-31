import React, { createContext, useState } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);

    const showNotification = (message, type = 'info') => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification(null);
        }, 3000); // La notification disparaîtra après 3 secondes
    };

    return (
        <NotificationContext.Provider value={{ notification, showNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

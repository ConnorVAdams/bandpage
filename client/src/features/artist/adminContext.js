import { createContext, useContext } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
    return useContext(AdminContext);
};

export const AdminProvider = ({ children, value }) => {
    return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
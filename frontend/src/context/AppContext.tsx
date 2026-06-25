import { createContext, type ReactNode, type JSX } from 'react';
import { AuthProvider } from './AuthContext';

// Define any global app state shape here (extend later)
interface AppContextType { }

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <AppContext.Provider value={{}}>
      <AuthProvider>{children}</AuthProvider>
    </AppContext.Provider>
  );
};

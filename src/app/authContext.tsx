import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface AuthContextProps {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const urlToken = router.query.token as string;
    if (urlToken) {
      setToken(urlToken);
      localStorage.setItem('authToken', urlToken);
      router.replace('/home');
    } else {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, [router]);

  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
